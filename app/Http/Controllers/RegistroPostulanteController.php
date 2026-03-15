<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidateRegistroPostulante;
use App\Models\Actividad;
use App\Models\Departamento;
use App\Models\EstadoCivil;
use App\Models\Genero;
use App\Models\HistorialToken;
use App\Models\Idioma;
use App\Models\Modalidad;
use App\Models\NivelEducativo;
use App\Models\Pais;
use App\Models\Parentesco;
use App\Models\TipoCertificado;
use App\Models\TipoDocumento;
use App\Models\Trabajador;
use App\Models\Usuario;
use App\Models\Views\DistritoView;
use App\Models\Views\TrabajadorView;
use Carbon\Carbon;
use Illuminate\Http\Request;

use DB;

class RegistroPostulanteController extends Controller
{
    public function viewRegistroPostulante($token = null){

        if(!$token){
            return redirect('/');
        }else{

            $existToken = HistorialToken::where('token',$token)->first();

            if ($existToken){
                $tra = TrabajadorView::where('usuario_id', $existToken->usuario_id)->first();

                if ($tra->estadoid == 7){
                    $data['token'] = $token;
                    $data['usuario'] = $tra->usuario_id;
                }else if ($tra->estadoid == 3 && $tra->nodisponible === true){
                    $data['token'] = $token;
                    $data['usuario'] = $tra->usuario_id;
                }else{
                    return redirect('/');
                }

                if(!$tra){
                    return redirect('/');
                }

            }else{
                return redirect('/');
            }

        }

        return view('Web.formulario-postulante', $data);

    }

    public function ajaxGetActividadesByGenero(Request $request){
        $inputGenero = $request->input('genero');

        $actividades = Actividad::borrado(false)->where('genero_id', $inputGenero)->ordenar()->get();

        return response()->json([
            'code'              => 200,
            'actividades' => convertFormatSimpleSelect($actividades),
        ]);
    }

    public function ajaxLoadDataRegistroPostulante(Request $request){

        $token = $request->input('token');
        $usuario = $request->input('usuario');
        $show = (bool)$request->input('show');

        $trabajador = TrabajadorView::where('usuario_id', $usuario)->first();

        if (!($trabajador->postulando_pais_id)){
            $sc = Pais::where('country_code', strtoupper(session()->get('country')))->first();

            $e = Trabajador::find($trabajador->id)->update(['postulando_pais_id' => $sc->id]);

            $trabajador = TrabajadorView::where('usuario_id', $usuario)->first();

        }else{
            $c = $trabajador->postulando_pais_id;
        }

        $genero = $trabajador->genero_id ? $trabajador->genero_id : 1;

        $generos = Genero::borrado(false)->orderBy('segundo_nombre', 'asc')->get();

        if ($trabajador->postulando_pais_id == 11){
            $td = [2,10,11];
        }else if ($trabajador->postulando_pais_id == 54){
            $td = [1,4,7,9];
        }else{
            $td = [1,2,4,5,6,7,8,9,10];
        }

        $tiposdocumentos = TipoDocumento::borrado(false)->whereIn('id', $td)->orderBy('nombre', 'asc')->get();
        $estadosciviles = EstadoCivil::borrado(false)->orderBy('nombre', 'asc')->get();
        $nivelesestudios = NivelEducativo::borrado(false)->whereIn('id', [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])->orderBy('orden', 'asc')->get();

        $r = [];
        $p = Departamento::borrado(false)->orderBy('pais_id', 'asc')->get();
        foreach ($p as $pa){
            array_push($r, $pa->pais_id);
        }
        $r = array_unique($r);
        $r = array_values($r);

        $paises = Pais::borrado(false)->orderBy('nombre', 'asc')->get();

        $distritos = DistritoView::where('pais_id', $trabajador->postulando_pais_id)->orderBy('distritostres', 'asc')->get();
        $actividades = Actividad::borrado(false)->where('genero_id', $genero)->ordenar()->get();
        $actividadesAll = Actividad::borrado(false)->ordenar()->get();
        $modalidades = Modalidad::orderBy('nombre', 'asc')->whereIn('id', [1, 2, 3])->get();
        $idiomas = Idioma::borrado(false)->whereIn('id', [2,4,5,6,11,12])->orderBy('nombre', 'asc')->get();
        $cantidades = createArrayCantidad(10, 0);
        $parentescos = Parentesco::borrado(false)->orderBy('nombre', 'asc')->get();
        $tiposcertificados = TipoCertificado::borrado(false)->whereIn('id', [1, 2, 3, 4, 5])->orderBy('nombre', 'asc')->get();

        return response()->json([
            'code'              => 200,
            'paisPostulando'    => $trabajador->postulando_pais_id,
            'trabajador'        => formatDataRegistroPostulante($trabajador),
            'generos'           => convertFormatSimpleSelectGeneros($generos, false, true),
            'tiposdocumentos'   => convertFormatSimpleSelect($tiposdocumentos, false, true),
            'estadosciviles'    => convertFormatSimpleSelect($estadosciviles, false, true),
            'niveleseducativos' => convertFormatSimpleSelect($nivelesestudios, false, true, $trabajador->postulando_pais_id),
            'paises'            => convertFormatSimpleSelect($paises, false, true),
            'distritos'         => convertFormatSimpleSelectDistritos($distritos, false, true),
            'actividades'       => convertFormatSimpleSelectActividad($actividades, $trabajador->postulando_pais_id, false, true),
            'actividadesAll'    => convertFormatSimpleSelectActividad($actividadesAll, $trabajador->postulando_pais_id, false, true),
            'modalidades'       => convertFormatSimpleSelectModalidad($modalidades, $trabajador->postulando_pais_id, false, true),
            'idiomas'           => convertFormatSimpleSelect($idiomas, false, true),
            'cantidades'        => convertFormatSimpleSelectCantidades($cantidades),
            'parentescos'       => convertFormatSimpleSelect($parentescos, false, true),
            'tiposcertificados' => convertFormatSimpleSelect($tiposcertificados, false, true),
            'enabledCountries'  => $r
        ]);

    }

    public function ajaxSaveRegistroPostulante(ValidateRegistroPostulante $request){

        DB::beginTransaction();

        try{

            $trabajador = $request->input('data');
            $chofer = $request->input('isChofer');
            $finalizado = $request->input('finalizado');

            $id = $trabajador['id'];
            $tra = Trabajador::find($id);


            $tipodocumento = getValueSelectSingle($trabajador['tipodocumento_id']);
            $genero = getValueSelectSingle($trabajador['genero_id']);
            $pais_nacimiento = getValueSelectSingle($trabajador['pais_id']);
            $postulando_pais_id = $tra->postulando_pais_id;

            if ($pais_nacimiento AND $postulando_pais_id){
                if ($pais_nacimiento == 54 AND $postulando_pais_id == 54){
                    $tipodocumento = 1;
                }else if ($pais_nacimiento == 11 AND $postulando_pais_id == 11){
                    $tipodocumento = 10;
                }
            }

            $pathLicenciaD = $trabajador['foto_licencia_delantera'] ?: null;
            $pathLicenciaT = $trabajador['foto_licencia_posterior'] ?: null;

            $dom = getDepartamentoProvinciaDistrito($trabajador['distrito_id']);
            $mod = getModalidadesMultiselect($trabajador['modalidad_id']);

            $verificacioneslaborales = $trabajador['verificaciones_laborales'];
            $adjuntoeducacion = $trabajador['adjunto_educacion'];

            $paisesPermitidos = array(4, 13, 18, 54, 68);

            $lugarNacimiento = null;

            if ($trabajador['departamentonacimiento_id']){

                if (in_array($trabajador['pais_id']['value'], $paisesPermitidos)){
                    $lugarNacimiento = $trabajador['departamentonacimiento_id']['label'];
                }
            }else{
                if ($trabajador['lugar_nacimiento']){
                    $lugarNacimiento = formatText($trabajador['lugar_nacimiento']);
                }
            }

            $carcteresND = strlen($trabajador['numero_documento']);

            $dataUsu = [
                'nombres'                   => $trabajador['nombres'],
                'apellidos'                 => $trabajador['apellidos'],
                'genero_id'                 => $genero,
                'nacionalidad_id'           => $trabajador['nacionalidad_id'] ?: null,
                'paisnacimiento_id'         => $pais_nacimiento,
                'tipodocumento_id'          => $tipodocumento,
                'numero_documento'          => ($carcteresND >= 7 OR $carcteresND == 0) ? $trabajador['numero_documento'] : null,
                'estadocivil_id'            => getValueSelectSingle($trabajador['estadocivil_id']),
                'fecha_nacimiento'          => $trabajador['fechanacimiento'] ? Carbon::parse($trabajador['fechanacimiento']) : null,
                'departamentonacimiento_id' => $trabajador['departamentonacimiento_id'] ? getValueSelectSingle($trabajador['departamentonacimiento_id']) : null,
                'lugar_nacimiento'          => $lugarNacimiento,
                'correo'                    => formatText($trabajador['correo'])
            ];

            $u = Usuario::where('id', $tra->usuario_id)->update($dataUsu);

            $actividades = saveFormatMultiselect($trabajador['actividad_id']);

            $dataTra = [
                'direccion'                     => $trabajador['direccion'] ? strtoupper($trabajador['direccion']) : null,
                'actividad_id'                  => $actividades,
                'idioma_id'                     => saveFormatMultiselect($trabajador['idioma_id']),
                'cama_adentro'                  => $mod['ca'],
                'cama_afuera'                   => $mod['cf'],
                'por_horas'                     => $mod['ph'],
                'departamento_id'               => $dom ? $dom['departamento'] : null,
                'provincia_id'                  => $dom ? $dom['provincia'] : null,
                'distrito_id'                   => $dom ? $dom['distrito'] : null,
                //'firma'                         => $trabajador['firma'] ? saveImageS3($trabajador['firma'], $trabajador['firma'], 'firma', $trabajador['numero_documento']) : null,
                'chofer'                        => $chofer ? true : false,
                'numero_hijos'                  => $trabajador['numero_hijos'] ? getValueSelectSingle($trabajador['numero_hijos']) : null,
                'edad_hijos'                    => $trabajador['edad_hijos'] ? formatText($trabajador['edad_hijos']) : null,
                'foto_documento_delantera'      => $trabajador['foto_documento_delantera'] ? $trabajador['foto_documento_delantera'] : null,
                //'foto_documento_posterior'      => $trabajador['foto_documento_posterior'] ? $trabajador['foto_documento_posterior'] : null,
                'estatuspostulante_id'          => $finalizado ? 1 : 7,
                'foto_licencia_delantera'       => $pathLicenciaD,
                'foto_licencia_trasera'         => $pathLicenciaT,
                'sueldo_promedio'               => ($actividades && $mod['ca'] && $mod['cf'] && $mod['ph']) ? getSueldoPromedio($actividades, $mod['ca'], $mod['cf'], $mod['ph'] ) : $tra->sueldo_promedio,
                'video_introduccion'            => $trabajador['video_introduccion'] ?: null,
                'adjunto_prueba_covid'          => $trabajador['adjunto_prueba_covid'] ? json_encode($trabajador['adjunto_prueba_covid']) : null,
                'adjunto_cartilla_vacuna'       => $trabajador['adjunto_cartilla_vacuna'] ?: null,
                'tuvo_covid'                    => $trabajador['tuvo_covid'] ? getValueSelectSingle($trabajador['tuvo_covid']) : null,
                'tiene_vacuna'                  => $trabajador['tiene_vacuna'] != null ? getValueSelectSingle($trabajador['tiene_vacuna']) : null,
                'recibos'                       => $trabajador['recibos'] ?: null,
                //'contactos'                     => $trabajador['contactos'] ? saveFormatSingleContactos($trabajador['contactos']) : null,
                'verificaciones_laborales'      => saveFormatVerificaciones($verificacioneslaborales),
                'niveleducativo_id'             => $trabajador['niveleducativo_id'] ? getValueSelectSingle($trabajador['niveleducativo_id']) : null,
                'adjunto_educacion'             => saveFormatAdjuntoEducacion($adjuntoeducacion)
            ];

            $t = Trabajador::where('id', $id)->update($dataTra);

            DB::commit();

            if($finalizado){
                saveCambioEstatusPostulante($id, $dataTra['estatuspostulante_id']);
            }

            return response()->json(['code' => 200, 'msj' => 'Data registrada exitosamente. Gracias por confiar en Bertha.']);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al registrar la data. Consulte al administrador' ]);

        }

    }

    public function ajaxSearchDepartamentosList(Request $request){
        $paisID = $request->input('paisID');

        $departamentos = Departamento::borrado(false)->where('pais_id', $paisID)->orderBy('nombre', 'asc')->get();
        return response()->json([
            'departamentos'     => convertFormatSimpleSelect($departamentos, false, true)
        ]);
    }

    function ajaxUploadYoutubeRegistroPostulante(Request $request){

        try{

            $file = $request->input('file');

            list($baseType, $fileVideo) = explode(';', $file);
            list(, $fileVideo) = explode(',', $fileVideo);

            $extension = explode('/', mime_content_type($file))[1];

            $fileVideoDecode = base64_decode($fileVideo);
            $fileName = time().'.'.$extension;

            \Storage::disk('s3')->put('Adjuntos/' . $fileName, $fileVideoDecode, 'public');

            $path = \Storage::disk('s3')->url('Adjuntos/'. $fileName);

            return response()->json(['code' => 200, 'video' => $path]);

        } catch (\Exception $e) {

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al subir video. Consulte al administrador' ]);

        }

    }

    function ajaxDeleteYoutubeRegistroPostulante(Request $request){

        try{

            $url = $request->input('url');

            $fileName = getFileNameFromAwsUrl($url);

            \Storage::disk('s3')->delete($fileName);

            return response()->json(['code' => 200, 'msj' => 'Borrado exitoso']);

        } catch (\Exception $e) {

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al borrar video. Consulte al administrador' ]);

        }

    }
}
