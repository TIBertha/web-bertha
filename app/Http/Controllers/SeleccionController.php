<?php

namespace App\Http\Controllers;

use App\Mail\Registro;
use App\Models\Empleador;
use App\Models\Trabajador;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Views\TrabajadorView;
use App\Models\Pais;
use App\Models\Requerimiento;
use App\Models\RequerimientoPostulacion;
use App\Models\RequerimientoLink;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SeleccionController extends Controller
{
    public function index()
    {
        if ($_SERVER['HTTP_HOST'] == 'bertha.pe'){
            return redirect()->to('https://holabertha.com');
        }else{
            return redirect('/es-pe/seleccionar');
        }
    }

    public function viewIndex($country){

        $data['country'] = $country;
        session()->forget('country');
        session()->put('country', $country);

        if(\Auth::check()){
            $data['checksession'] = true;
        }else{
            $data['checksession'] = false;
        }

        return view('Web.seleccion', $data);
    }

    public function viewPeru(){
        countViewWeb('/es-pe/seleccionar');
        return $this->viewIndex('pe');
    }

    public function ajaxProcesarSeleccion(Request $request){

        $filtros = $request->input('filtros');
        $isDataUrl = $request->input('url');
        $isMobile = $request->input('isMobile');

        if($filtros){
            $result = processingSeleccion($filtros, $isDataUrl, $isMobile);
        }else{
            $result = processingSeleccion(null, null, $isMobile);
        }

        return response()->json([
            'code' => 200,
            'data' => $result,
            'country' => session()->get('country')
        ]);
    }

    public function ajaxSaveCartSeleccion(Request $request){
        $cart = $request->input('cart');

        session()->put('cart-seleccion', $cart);

        return response()->json(['code' => 200]);
    }

    public function ajaxFinalizarSeleccion(Request $request)
    {
        $cartActual     = $request->input('cart');
        $filtrosActual  = $request->input('filtros');
        $country        = $request->input('country');

        session()->put('country', $country);
        session()->put('cart-seleccion', $cartActual);
        session()->put('filtros-seleccion', $filtrosActual);

        return response()->json(['code' => 200]);
    }

    public function ajaxGetSeleccionCard(Request $request){

        $limit = $request->input('limit');
        $offset = 0;

        $query = TrabajadorView::where('estadoid', 1)->where('actividad_id', 'not like', '%[11]%')->orderBy('actualizado', 'desc');

        $total = $query->count();

        $items = $query->limit($limit)->offset($offset)->get();

        return [
            'total' => $total,
            'trabajadores' => formatDataTrabajadores($items)
        ];

    }

    public function ajaxRegistrarEmpleadorRequerimiento(Request $request){
        DB::beginTransaction();
        try{

            $data = [
                'nombres'       => formatText($request->input('nombres')),
                'apellidos'     => formatText($request->input('apellidos')),
                'telefono'      => formatText($request->input('celular')),
                'tipousuario'   => $request->input('tipousuario'),
                'codeoperacion' => $request->input('codeOperacion'),
            ];

            $token = generateTokenEmpleador(
                quitarTildes($data['nombres']),
                quitarTildes($data['apellidos'])
            );

            // -----------------------------------------
            // 1. Obtener o crear usuario según operación
            // -----------------------------------------

            if ($data['codeoperacion'] == 200) {
                // Usuario existente
                $usu = Usuario::where('telefono', $data['telefono'])->firstOrFail();

                $usu->update([
                    'nombres'  => $data['nombres'],
                    'apellidos'=> $data['apellidos'],
                    'password' => $data['password'] ?? null,
                ]);

            } else {

                // Nuevo usuario
                $usu = Usuario::create([
                    'telefono'          => $data['telefono'],
                    'cuenta'            => 'BERTHA',
                    'nombres'           => $data['nombres'],
                    'apellidos'         => $data['apellidos'],
                    'verificar_telefono'=> false,
                ]);
            }

            // -----------------------------------------
            // 2. Crear empleador (siempre igual)
            // -----------------------------------------
            $emp = Empleador::create([
                'nombres'             => $data['nombres'],
                'apellidos'           => $data['apellidos'],
                'estatusempleador_id' => 1,
                'usuario_id'          => $usu->id,
                'token'               => $token,
            ]);

            // -----------------------------------------
            // 3. Registrar token
            // -----------------------------------------
            almacenarToken($token, $usu->id, 'EMP');

            // ⭐ Guardar usuario_id en sesión
            session()->put('usuarioID', $usu->id);

            $msj = '¡Bienvenido(a) '.formatTextFirstCharacterToUpper($data['nombres']). '!';

            DB::commit();

            return response()->json([
                'code' => 200,
                'msj' => $msj,
                'tipousuario' => $data['tipousuario']
            ]);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json([
                'code' => 500,
                'msj' => 'Ocurrio un problema al crear cuenta. Consulte al administrador'
            ]);

        }
    }

    public function ajaxIniciarRegistroRequerimiento(Request $request){
        $telefono = $request->input('telefono');
        $user = Usuario::where('telefono', $telefono)->first();

        if ($user) {
            $checkTipoUsuario = checkTipoUsuario('cli', $user->id);
            if ($checkTipoUsuario === true){

                // ⭐ Guardar usuario_id en sesión
                $request->session()->put('usuarioID', $user->id);

                return response()->json([
                    'code' => 200,
                    'msj'  => 'Inicia sesión.'
                ]);
            }else{
                return response()->json([
                    'code' => 500,
                    'msj'  => 'Tu número figura como TRABAJADOR.'
                ]);
            }

        }else{
            return response()->json([
                'code' => 500,
                'msj'  => 'No estás registrado en nuestra base de datos.'
            ]);
        }

    }

    public function viewSeleccionConfirmar(){
        return view('Web.seleccion-confirmar');
    }

    public function ajaxGetCartSeleccion(Request $request){

        $cart = session('cart-seleccion');
        $country = session('country');
        $usuarioID = session('usuarioID');

        $nombreusuario = showName(Usuario::find($usuarioID));

        return response()->json([
            'code' => 200,
            'nombreusuario' => $nombreusuario,
            'cart' => $cart,
            'country' => $country
        ]);

    }

    public function ajaxDeleteCartSeleccion(){

        session()->forget(['cart-seleccion', 'filtros-seleccion']);
        $data = session('usuarioID');

        if($data){
            return response()->json(['code' => 200]);
        }else{
            return response()->json(['code' => 500]);

        }

    }

    public function ajaxContinuarCartSeleccion(Request $request)
    {
        DB::beginTransaction();

        try {

            $cart    = session('cart-seleccion');
            $filtros = session('filtros-seleccion');
            $usuarioID = session('usuarioID');

            $sc = Pais::where('country_code', strtoupper($request->input('country')))->first();

            $empleador_id = getEmpleadorID($usuarioID);

            $newCart      = procesarCartAndFiltros($cart, $filtros);
            $trabajadores = $newCart['trabajadores'];

            // IDs de trabajadores
            $traID = array_column($trabajadores, 'id');

            // Datos del requerimiento
            $data = [
                'empleador_id'            => $empleador_id,
                'actividad_id'            => $newCart['actividad_id'] ?? null,
                'modalidad_id'            => $newCart['modalidad_id'] ?? null,
                'trabajadores_id'         => json_encode($traID),
                'fecha'                   => Carbon::now(),
                'tipocontrato_id'         => 1,
                'paispedido_id'           => $sc->id,
                'estatusrequerimiento_id' => 4
            ];

            if ($empleador_id) {

                $req = Requerimiento::create($data);

                // Crear postulaciones
                foreach ($trabajadores as $tra) {
                    RequerimientoPostulacion::create([
                        'requerimiento_id'  => $req->id,
                        'trabajador_id'     => $tra['id'],
                        'fecha_postulacion' => Carbon::now(),
                        'creado'            => Carbon::now(),
                        'actualizado'       => Carbon::now(),
                        'select_emp'        => 1,
                    ]);
                }

                DB::commit();

                // Crear token
                $tok = RequerimientoLink::create([
                    'empleador_id'     => $empleador_id,
                    'token'            => generarTokenFormRequerimiento(),
                    'requerimiento_id' => $req->id,
                    'actividad_id'     => $newCart['actividad_id'] ?? null,
                    'modalidad_id'     => $newCart['modalidad_id'] ?? null,
                    'trabajadores_id'  => json_encode($traID),
                    'web'              => 1,
                    'crm'              => 0,
                    'creado'           => Carbon::now(),
                    'actualizado'      => Carbon::now(),
                ]);

                // Limpiar sesión
                session()->forget(['cart-seleccion', 'filtros-seleccion']);

                return response()->json([
                    'code' => 200,
                    'token' => $tok->token,
                    'msj' => '¡Felicitaciones! tu requerimiento fue generado exitosamente, nos estaremos comunicando en breve contigo.'
                ]);

            } else {

                return response()->json([
                    'code' => 500,
                    'msj'  => 'La cuenta que tienes es de trabajador. Consulte al Administrador'
                ]);
            }

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json([
                'code' => 500,
                'msj'  => 'Ocurrió un problema al procesar requerimiento. Consulte al administrador'
            ]);
        }
    }

}
