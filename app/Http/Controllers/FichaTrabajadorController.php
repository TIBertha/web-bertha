<?php

namespace App\Http\Controllers;

use App\Models\HistorialToken;
use App\Models\Trabajador;
use App\Models\Views\DistritoView;
use App\Models\Views\TrabajadorView;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FichaTrabajadorController extends Controller
{
    public function viewFichaRestringidaTrabajador($token = null){
        if ($_SERVER['HTTP_HOST'] == 'bertha.pe'){
            return redirect()->to('https://holabertha.com');
        }else{
            if(!$token){
                return redirect('/');
            }else{

                $existToken = TrabajadorView::where('token', $token)->first();

                if($existToken){

                    $tra = TrabajadorView::where('usuario_id', $existToken->usuario_id)->first();

                    if ($tra){
                        $estatusPostulante = $tra->estatuspostulante_id;

                        if(in_array($estatusPostulante, [2,3,4,5,6])){
                            return redirect()->route('pedidos');
                        }

                        $f = $tra->foto ?: null;

                        if ($f) {
                            $f = glideServer()->makeImage($f, [
                                'w' => 310,
                                'h' => 310,
                                'fit' => 'crop',
                            ]);
                        }

                        $data['nombreTrabajadora'] = formatTextFirstCharacterToUpper(convert_from_latin1_to_utf8_recursively(getNameAndFirstCharacterFullName($tra->nombres, $tra->apellidos)));
                        $data['foto'] = $f ? strtok($f, '?') : null;
                        $data['token'] = $token;
                        $data['usuario'] = $existToken->usuario_id;
                        $data['accessverif'] = false;
                    }else{
                        return redirect('/');
                    }

                }else{
                    return redirect('/');
                }
            }

            //return view('Web.FichaTrabajador.Restringida.ficha-restringida-trabajador', $data);
        }

    }

    public function viewFichaCRMTrabajador($token = null){

        if ($_SERVER['HTTP_HOST'] == 'bertha.pe'){
            return redirect()->to('https://holabertha.com');
        }else{
            if(!$token){
                return redirect('/');
            }else{

                $existToken = HistorialToken::where('token', $token)->first();

                if ($existToken){
                    $tra = TrabajadorView::where('usuario_id', $existToken->usuario_id)->first();

                    if($tra){

                        if ($tra->foto){

                            $estatusPostulante = $tra->estatuspostulante_id;

                            if(in_array($estatusPostulante, [2,3,4,5,6])){
                                return redirect()->route('pedidos');
                            }

                            $f = null;

                            // = \Thumbnail::src($tra->foto, null)->smartcrop(310, 310)->url(true);

                            $data['nombreTrabajadora'] = formatTextFirstCharacterToUpper(convert_from_latin1_to_utf8_recursively(getNameAndFirstCharacterFullName($tra->nombres, $tra->apellidos)));
                            //$data['foto'] = $tra->foto ? strtok($f, '?') : null;
                            $data['foto'] = $tra->foto;
                            $data['videoYoutube'] = checkVideoYoutube($tra->video_introduccion_youtube);
                            $data['token'] = $token;
                            $data['usuario'] = $existToken->usuario_id;
                            $data['accessverif'] = true;
                        }else{
                            return redirect('/');
                        }

                    }else{
                        return redirect('/');
                    }
                }else{
                    return redirect('/');
                }
            }
            return view('Web.FichaTrabajador.Restringida.ficha-crm-trabajador', $data);
        }
    }

    public function getListAudioVerificaciones($verificaciones, $privada = null, $access = null){

        $result = [];

        if($verificaciones != null AND !empty($verificaciones) ){

            foreach (json_decode($verificaciones, true) as $data) {

                if (isset($data['adjuntos'])){

                    if($access){

                        foreach ($data['adjuntos'] as $adj){

                            if (in_array($adj['extension'], ['mp3', 'mp4', 'ogg'] )){
                                array_push($result, $adj['url']);
                            }

                        }

                    }

                }

            }
        }

        return $result;

    }

    public function getVerificacionesLaborales($verificaciones, $privada = null, $access){

        $result = null;

        if($verificaciones != null AND !empty($verificaciones) ){

            $veri = [];

            foreach (json_decode($verificaciones, true) as $data) {

                $adjunto = !empty($data['adjuntosrecomendaciones']);

                if ($privada){
                    $nombre = $data['nombre'] ? ($data['nombre']) : ' - ';
                    $telefono = $data['telefono'] ? $data['telefono'] : ' - ';
                }else{
                    $apellidos = $data['apellidos'] ?? null;

                    $nombre = $data['nombre'] ? (getNombresAnteriorEmpleador($data['nombre'],$apellidos)) : ' - ';
                    $telefono = $data['telefono'] ? verificarNum($data['telefono']) : ' - ';
                }

                if (isset($data['adjuntos'])){
                    $verificacion = $data['adjuntos'];
                    $docsVerificacion =  $access == true ? getAdjuntosVerificaciones($data['adjuntos']) : null;
                }

                if ($data['telefono']){
                    $formatTel = base64_encode(nostNumber(verificarNum($data['telefono'])));
                }


                $veri[] = [
                    'empleador'       => mb_convert_case($nombre, MB_CASE_UPPER, "UTF-8"),
                    'telefono'        => $telefono,
                    'formatTel'       => $formatTel,
                    'distrito'        => $data['distrito'] ? (DistritoView::find($data['distrito'])->distritostres) : ' - ',
                    'actividades'     => strtoupper(showTiposActividadesFichaModal($data['actividad'], '', ', ')),
                    'fechainicio'     => isset($data['inicioLabores']) ? ( $data['inicioLabores'] ? Carbon::parse($data['inicioLabores'])->format('m/Y') : null ) : null,
                    'fechafin'        => isset($data['finLabores']) ? ( $data['finLabores'] ? Carbon::parse($data['finLabores'])->format('m/Y') : null ) : null,
                    'duracion'        => isset($data['tiempo']) ? ($data['tiempo'] ? $data['tiempo'] : null) : null,
                    'adjunto'         => $adjunto,
                    'verificacion'    => isset($data['adjuntos']) ? $verificacion : null,
                    'docsVerificacion' => isset($data['adjuntos']) ? $docsVerificacion : null,
                ];
            }

            $result = $veri;

        }

        return $result;

    }

    public function ajaxGetDataFichaRestringidaTrabajador(Request $request){
        $tra = null;
        $token = $request->input('token');
        countViewFicha($token);
        $accessverif = $request->input('accessverif');
        $usuario = $request->input('usuario');

        if ($token) {
            $tra = TrabajadorView::where('usuario_id', $usuario)->first();
        }

        $nombreTrabajadorRestringido = convert_from_latin1_to_utf8_recursively(getNameAndFirstCharacterFullName($tra->nombres, $tra->apellidos));

        $dataSeleccion = [
            'id' => $tra->id,
            'nombre' => $nombreTrabajadorRestringido,
            'foto' => $tra->foto,
            'modalidades' => showTiposModalidadesFichaModal($tra->cama_adentro, $tra->cama_afuera, $tra->por_horas),
            'modalidad_id' => showTiposModalidadesID($tra->cama_adentro, $tra->cama_afuera, $tra->por_horas),
            'actividades' => showTiposActividadesFichaModal($tra->actividad_id, '', ', ', false),
            'actividad_id' => $tra->actividad_id ? json_decode($tra->actividad_id, true) : [],
            'edad' => $tra->edad,
            'nacionalidad_id' => $tra->nacionalidad_id,
        ];

        $disponibilidad = getDisponibilidadTrabajador($tra->actualizado);

        return response()->json([
            'code'                  => 200,
            'disponibilidad'        => $disponibilidad,
            'dataseleccion'         => $dataSeleccion,
            'name'                  => mb_convert_case(getNameAndFirstCharacterFullNameSimple($tra->nombres, $tra->apellidos), MB_CASE_TITLE, "UTF-8") ,
            'nombreTrabajador'      => mb_convert_case($nombreTrabajadorRestringido, MB_CASE_UPPER, "UTF-8"),
            'informacionBasica'     => formatInformacionBasica($tra),
            'identificacion'        => formatIdentificacion($tra),
            'licencia'              => formatLicencia($tra),
            'domicilio'             => formatDomicilio($tra),
            'legal'                 => formatLegal($tra),
            'salud'                 => formatSalud($tra),
            'testPsicologico'       => !!$tra->test_psicologico,
            'retrato'               => $tra->foto,
            'experiencia'           => $this->getVerificacionesLaborales($tra->verificaciones_laborales, null, $accessverif),
            'listaudio'             => $this->getListAudioVerificaciones($tra->verificaciones_laborales, null, $accessverif),
            'numExperiencia'        => $tra->cantidad_verificaciones_laborales,
            'estudio'               => $tra->adjunto_educacion ? formatAdjuntoEducacionNew($tra->adjunto_educacion) : null,
            'nivelEducativo'        => $tra->niveleducativo,
            'numEstudio'            => $tra->cantidad_adjunto_educacion,
            'actividad'             => formatActividad($tra->actividad_id, $tra->postulando_pais_id),
            'redesContacto'         => formatRedesContacto($tra),
            'idioma'                => formatIdioma($tra->idioma_id),
            'modalidad'             => formatModalidad($tra),
            'video'                 => $tra->video_introduccion_youtube ?: null,
            'video_amazon'          => $tra->video_introduccion_youtube ? null : $tra->videointroduccion,
            'sueldo_promedio'       => $tra->sueldo_promedio,
            'firma'                 => $tra->firma,
            'likes'                 => $tra->likes,
            'num_vistas'            => $tra->num_vistas
        ]);

    }

    public function ajaxGetLikesAndViews(Request $request){
        $token = $request->input('token');

        $ficha = Trabajador::where('token', $token)->firstOrFail();

        return response()->json([
            'code'  => 200,
            'likes' => $ficha->likes,
            'views' => $ficha->num_vistas,
        ]);
    }

    public function ajaxAddLikeFicha(Request $request){
        $token = $request->input('token');
        $ipAddress = $request->input('ipAddress');
        $ficha = Trabajador::where('token', $token)->firstOrFail();

        $likes = json_decode($ficha->likes, true) ?? [];

        // Evitar duplicados
        if (!in_array($ipAddress, $likes)) {
            $likes[] = $ipAddress;
            $ficha->update(['likes' => json_encode($likes)]);
        }

        return response()->json([
            'code'  => 200,
            'likes' => $likes,
        ]);
    }

    public function ajaxRemoveLikeFicha(Request $request){
        $token = $request->input('token');
        $ipAddress = $request->input('ipAddress');
        $ficha = Trabajador::where('token', $token)->firstOrFail();

        $likes = json_decode($ficha->likes, true) ?? [];

        if (($key = array_search($ipAddress, $likes)) !== false) {
            unset($likes[$key]);
            $likes = array_values($likes); // reindexar
            $ficha->update(['likes' => json_encode($likes)]);
        }

        return response()->json([
            'code'  => 200,
            'likes' => $likes,
        ]);

    }
}
