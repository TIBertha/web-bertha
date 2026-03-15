<?php

namespace App\Http\Controllers;

use App\Models\Actividad;
use App\Models\DiaSemana;
use App\Models\Empleador;
use App\Models\FrecuenciaServicio;
use App\Models\Modalidad;
use App\Models\Nacionalidad;
use App\Models\RangoEdad;
use App\Models\Requerimiento;
use App\Models\RequerimientoLink;
use App\Models\TipoBeneficio;
use App\Models\TipoVivienda;
use App\Models\Usuario;
use App\Models\Views\DistritoView;
use App\Models\Views\EmpleadorView;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegistroRequerimientoController extends Controller
{
    public function viewRegistroRequerimiento($token = null){
        if ($_SERVER['HTTP_HOST'] == 'bertha.pe'){
            return redirect()->to('https://holabertha.com');
        }else{
            if(!$token){
                return redirect('/');
            }

            $r = RequerimientoLink::borrado(false)->where('token', $token)->first();

            if (!$r){
                return redirect('/');
            }

            $data['token'] = $token;

            return view('Web.formulario-requerimiento', $data);
        }
    }

    public function ajaxLoadDataRegistroRequerimiento(Request $request){

        $token = $request->input('token');
        $emp = null;
        $r = null;
        $procedencia = 'CRM';

        if($token){

            $r = RequerimientoLink::borrado(false)->where('token', $token)->first();

            $web = $r->web;
            $crm = $r->crm;

            if ($web == true and $crm == false){
                $procedencia = 'WEB';
            }elseif ($web == false and $crm == true){
                $procedencia = 'CRM';
            }else{
                $procedencia = 'WEB';

            }

            if($r){
                $emp = EmpleadorView::where('id', $r->empleador_id)->select(['id', 'nombres', 'apellidos', 'telefono'])->first();
            }

        }

        $nacionalidades = Nacionalidad::get();
        $edades = RangoEdad::get();
        $tiposViviendas = TipoVivienda::get();
        $dias = DiaSemana::borrado(false)->WhereIn('id',[1,2,3,4,5,6,7])->get();
        $frecuencias = FrecuenciaServicio::borrado(false)->orderBy('id', 'asc')->get();
        $diassemana = DiaSemana::borrado(false)->where('normal', true)->get();

        $inputActividad = null;
        $inputModalidad = null;

        if ($r->requerimiento_id){
            $requerimiento = Requerimiento::find($r->requerimiento_id);

            $inputActividad = $requerimiento->actividad_id;
            $inputModalidad = $requerimiento->modalidad_id;

            if ($inputActividad == 8){
                $modalidades = Modalidad::borrado(false)->whereIn('id', [2])->ordenar()->get();
            }else{
                $modalidades = Modalidad::borrado(false)->whereIn('id', [1,2,3])->ordenar()->get();
            }
        }else{
            $modalidades = Modalidad::borrado(false)->ordenar()->get();
        }

        $paispedido = $requerimiento->paispedido_id;

        $ubicaciones = DistritoView::Where('pais_id',$paispedido)->get();

        if ($paispedido == 54){
            $actividades = Actividad::WhereIn('id',[1,2,3,4,5,6,7,8,9,10])->borrado(false)->ordenar()->get();
            $tb = [2,3];
        }else if ($paispedido == 11){
            $actividades = Actividad::WhereIn('id',[1,3,6,10])->borrado(false)->ordenar()->get();
            $tb = [5,6];
        }

        if ($inputActividad AND $inputModalidad){
            $placeholder = getPlaceholderSueldo($inputActividad, $inputModalidad, $paispedido);
            $sueldoActividad = getSueldoMinimoActividad($inputActividad, $inputModalidad, $paispedido);
        }else{
            $placeholder = 'Ingresa Monto';
            $sueldoActividad = 0;
        }

        $tiposBeneficio = TipoBeneficio::get();
        $tiposBeneficioSM = TipoBeneficio::WhereIn('id',$tb)->get();

        return response()->json([
            'code'              =>      200,
            'requerimiento'     =>      $r->requerimiento_id ? formatDataRegistroRequerimiento($requerimiento, $placeholder, $sueldoActividad) : null,
            'nacionalidades'    =>      convertFormatSimpleSelect($nacionalidades),
            'edades'            =>      convertFormatSimpleSelect($edades, false),
            'ubicaciones'       =>      convertFormatDistritosSelect($ubicaciones),
            'tiposViviendas'    =>      convertFormatSimpleSelect($tiposViviendas),
            'diasI'             =>      convertFormatSimpleSelect($dias),
            'diasS'             =>      convertFormatSimpleSelect($dias),
            'dias'              =>      convertFormatSimpleSelect($dias),
            'frecuencias'       =>      convertFormatSimpleSelect($frecuencias),
            'diasSemana'        =>      $diassemana,
            'nombres'           =>      formatTextFirstCharacterToUpper(getFirstName($emp->nombres)),
            'apellidos'         =>      formatTextFirstCharacterToUpper(getFirstName($emp->apellidos)),
            'actividades'       =>      convertFormatSimpleSelectActividad($actividades, $paispedido),
            'modalidades'       =>      convertFormatSimpleSelectModalidad($modalidades, $paispedido),
            'tiposBeneficios'   =>      convertFormatSimpleSelect($tiposBeneficio),
            'tiposBeneficiosSM' =>      convertFormatSimpleSelect($tiposBeneficioSM),
            'horasLabor'        =>      gethorasList(7,19),
            'procedencia'       =>      $procedencia
        ]);

    }

    public function ajaxRefreshOptionsRegistroRequerimiento(Request $request){
        $inputActividad = $request->input('actividad');
        $inputModalidad = $request->input('modalidad');

        if ($inputActividad == 8){
            $modalidades = Modalidad::borrado(false)->whereIn('id', [2])->ordenar()->get();
        }else{
            $modalidades = Modalidad::borrado(false)->whereIn('id', [1,2,3])->ordenar()->get();
        }

        $actividades = Actividad::WhereIn('id',[1,2,3,4,5,6,7,8,9,10])->borrado(false)->ordenar()->get();

        if ($inputActividad AND $inputModalidad){
            $placeholder = getPlaceholderSueldo($inputActividad, $inputModalidad, 54);
            $sueldoActividad = getSueldoMinimoActividad($inputActividad, $inputModalidad, 54);
        }else{
            $placeholder = 'Ingresa Monto';
            $sueldoActividad = 0;
        }

        return response()->json([
            'code' => 200,
            'actividades' => convertFormatSimpleSelect($actividades),
            'modalidades' => convertFormatSimpleSelect($modalidades),
            'placeHolderSueldo' => $placeholder,
            'sueldoActividad' => $sueldoActividad
        ]);
    }

    public function ajaxSaveRegistroRequerimiento(Request $request)
    {
        // PASO 1 — Encapsular todo en un solo arreglo limpio
        $data = [
            'id'                    => $request->input('data.id'),
            'input_domicilio'       => $request->input('data.input_domicilio'),
            'tipoBeneficio_id'      => $request->input('data.tipoBeneficio_id'),
            'fechaInicioLabores'    => $request->input('data.fechaInicioLabores'),
            'nombres'               => $request->input('data.nombres'),
            'apellidos'             => $request->input('data.apellidos'),
            'numeroCelular'         => $request->input('data.numeroCelular'),
            'actividad_id'          => $request->input('data.actividad_id'),
            'modalidad_id'          => $request->input('data.modalidad_id'),
            'rangominimo'           => $request->input('data.rangominimo'),
            'rangomaximo'           => $request->input('data.rangomaximo'),
            'ubicacion_id'          => $request->input('data.ubicacion_id'),
            'sueldo'                => $request->input('data.sueldo'),
            'tipoVivienda_id'       => $request->input('data.tipoVivienda_id'),
            'numeroPisos'           => $request->input('data.numeroPisos'),
            'numeroBebes'           => $request->input('data.numeroBebes'),
            'edadBebes'             => $request->input('data.edadBebes'),
            'numeroNinos'           => $request->input('data.numeroNinos'),
            'edadNinos'             => $request->input('data.edadNinos'),
            'numeroAdultos'         => $request->input('data.numeroAdultos'),
            'edadAdultos'           => $request->input('data.edadAdultos'),
            'numeroMascotas'        => $request->input('data.numeroMascotas'),
            'diaIngreso'            => $request->input('data.diaIngreso'),
            'diaSalida'             => $request->input('data.diaSalida'),
            'diaDescanso'           => $request->input('data.diaDescanso'),
            'diaDescansoCamaDentro' => $request->input('data.diaDescansoCamaDentro'),
            'frecuencia'            => $request->input('data.frecuencia'),
            'diasFrecuencia'        => $request->input('data.diasFrecuencia'),
            'fechaEntrevista'       => $request->input('data.fechaEntrevista'),
            'tipoDescanso_id'       => $request->input('data.tipoDescanso_id'),
            'horarios'              => $request->input('data.horarios'),

            'hora_ingreso'          => $request->input('hi'),
            'hora_salida'           => $request->input('hs'),
            'hora_entrevista'       => $request->input('he'),

            'token'                 => $request->input('token'),
        ];

        DB::beginTransaction();

        try {

            // -----------------------------------------
            // 1. Obtener o crear empleador según token
            // -----------------------------------------
            if ($data['token']) {

                $reqLink = RequerimientoLink::where('token', $data['token'])->first();
                $idToken = $reqLink ? RequerimientoLink::find($reqLink->id) : null;
                $empID = $reqLink?->empleador_id;

            } else {

                $usuario = Usuario::create([
                    'nombres'           => formatText($data['nombres']),
                    'apellidos'         => formatText($data['apellidos']),
                    'telefono'          => formatText($data['numeroCelular']),
                    'telefono_whatsapp' => formatText($data['numeroCelular']),
                    'cuenta'            => 'BERTHA'
                ]);

                $empleador = Empleador::create([
                    'usuario_id'            => $usuario->id,
                    'estatusempleador_id'   => 1
                ]);

                $empID = $empleador->id;
            }

            // -----------------------------------------
            // 2. Ubicación
            // -----------------------------------------
            $distrito = $provincia = $departamento = null;

            if ($data['ubicacion_id'] && $data['ubicacion_id']['value']) {
                $ubicacion = DistritoView::find($data['ubicacion_id']['value']);
                $distrito = $ubicacion?->id;
                $provincia = $ubicacion?->provincia_id;
                $departamento = $ubicacion?->departamento_id;
            }

            // -----------------------------------------
            // 3. Rango de edad
            // -----------------------------------------
            $rangoEdad = ($data['rangominimo'] && $data['rangomaximo'])
                ? saveRangoBusqueda($data['rangominimo'], $data['rangomaximo'])
                : null;

            // -----------------------------------------
            // 4. Crear o actualizar requerimiento
            // -----------------------------------------
            $detallesReq = [
                'usuariointerno_id'       => 7,
                'tipocontrato_id'         => 1,
                'empleador_id'            => $empID,
                'estatusrequerimiento_id' => 4,
                'actividad_id'            => $data['actividad_id']['value'] ?? null,
                'modalidad_id'            => $data['modalidad_id']['value'] ?? null,
                'rangoedad_id'            => $rangoEdad,
                'input_domicilio'         => $data['input_domicilio'],
                'distrito_id'             => $distrito,
                'provincia_id'            => $provincia,
                'departamento_id'         => $departamento,
                'fecha_entrevista'        => $data['fechaEntrevista'] ? Carbon::parse($data['fechaEntrevista']) : null,
                'hora_entrevista'         => $data['hora_entrevista'] ? Carbon::parse($data['hora_entrevista']) : null,
                'trabajadores_id'         => saveTrabajadoresCartSeleccion(),
                'fecha_inicio_labores'    => $data['fechaInicioLabores'] ? Carbon::parse($data['fechaInicioLabores']) : null,
            ];

            if ($data['id']) {
                $req = Requerimiento::find($data['id']);
                $req->update($detallesReq);
            } else {
                $req = Requerimiento::create($detallesReq);
            }

            // -----------------------------------------
            // 5. Actividad (match limpio)
            // -----------------------------------------
            $detallesReqAct = resolverActividad($data);

            $req->update($detallesReqAct);

            // -----------------------------------------
            // 6. Modalidad (match limpio)
            // -----------------------------------------
            $detallesReqMod = resolverModalidad($data);

            $req->update($detallesReqMod);

            // -----------------------------------------
            // 7. Actualizar token si es nuevo requerimiento
            // -----------------------------------------
            if (!$data['id'] && isset($idToken)) {
                $idToken->update([
                    'requerimiento_id'    => $req->id,
                    'fecha_requerimiento' => Carbon::now(),
                    'borrado'             => 1
                ]);
            }

            deleteCartSeleccion();

            DB::commit();

            return response()->json([
                'code' => 200,
                'msj'  => 'Listo, ya está generado tu requerimiento. En breve, nos comunicaremos contigo.'
            ]);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al crear postulante. Consulte al administrador' ]);

        }

    }

    public function ajaxSendMailReq(Request $request){
        return response()->json(['code' => 200, 'msj' => 'Listo, ya está generado tu requerimiento. En breve, nos comunicaremos contigo.']);
    }
}
