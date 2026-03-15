<?php

use App\Models\VistasWeb;
use App\Models\TipoCertificado;
use App\Models\Views\DistritoView;
use App\Models\Idioma;
use App\Models\Actividad;
use Carbon\Carbon;

function countViewWeb($urlPathName){
    if (!$urlPathName) {
        return false;
    }

    VistasWeb::where('url_pathname', $urlPathName)
        ->increment('num_vistas');

    return true;
}

function getNameAndFirstCharacterFullNameSimple($nombres, $apellidos){

    $names = explode(' ', trim($nombres));

    return ($names[0]) . ' ' . substr($apellidos, 0, 1) . '.';

}

function formatInformacionBasica($trabajadora){
    $result = [];

    if ($trabajadora){
        $fechaHoy = new DateTime(Carbon::now()->format('Y-m-d'));
        $fechaNacimiento = new DateTime($trabajadora->fecha_nacimiento);
        $diffEdad = armarEdad($fechaHoy->diff($fechaNacimiento));
        $result =[
            'aceptamascotas'        => $trabajadora->aceptamascotas == 1 ? true : false,
            'procedencia'           => formatTextFirstCharacterToUpper($trabajadora->lugarnacimiento),
            'pais_procedencia'      => ($trabajadora->pais_id == 54 ? 'Perú' : formatTextFirstCharacterToUpper($trabajadora->pais)),
            'fechaNacimiento'       => date("d/m/Y", strtotime($trabajadora->fecha_nacimiento)),
            'edad'                  => $diffEdad,
            'estadoCivil'           => formatTextFirstCharacterToUpper($trabajadora->estadocivil),
        ];
    }

    return $result;
}

function formatIdentificacion($trabajador,$privada = null){
    $result = [];

    if ($trabajador){

        $muestraDNI1 = 'https://adjuntosexperta.s3.amazonaws.com/Archivos/muestra-dni1.jpg';
        $muestraDNI2 = 'https://adjuntosexperta.s3.amazonaws.com/Archivos/muestra-dni2.jpg';
        $muestraCE1 = 'https://adjuntosexperta.s3.amazonaws.com/Archivos/muestra-ce1.jpg';
        $muestraCE2 = 'https://adjuntosexperta.s3.amazonaws.com/Archivos/muestra-ce2.jpg';

        $result =[
            'tipoDocumento'         => $trabajador->tipodocumento,
            'numeroDocumento'       => $privada ? $trabajador->numero_documento : restringirInformacion($trabajador->numero_documento),
            'fotoDocumentoDelantera'=> $trabajador->nacionalidad_id == 1 ? $muestraDNI1 : $muestraCE1 ,
            'fotoDocumentoPosterior'=> $trabajador->nacionalidad_id == 1 ? $muestraDNI2 : $muestraCE2,
        ];
    }

    return $result;
}

function formatLicencia($trabajador){

    $result = [];

    if ($trabajador){
        $result =[
            'fotoLicenciaDelantera'=> $trabajador->foto_licencia_delantera,
            'fotoLicenciaPosterior'=> $trabajador->foto_licencia_posterior,
        ];
    }

    return $result;
}

function formatDomicilio($trabajador){

    $result = [];

    if ($trabajador){
        $distritoView = DistritoView::find($trabajador->distrito_id);

        $result =[
            'ubicacion' => formatTextFirstCharacterToUpper($distritoView->distritostres),
            'declaracionJurada'=> ( ($trabajador->direccion) ? true : false),
            'recibo'=> $trabajador->recibos ? $trabajador->recibos : false,
            'direccion'=> str_repeat("*", strlen($trabajador->direccion)),
        ];

        return $result;
    }

    return $result;
}

function formatLegal($trabajador){

    $result = [];

    if ($trabajador){

        if ($trabajador->certificado_antecedente){

            $certificado = $trabajador->certificado_antecedente ? json_decode($trabajador->certificado_antecedente) : null;
            $muestracerti = 'https://adjuntosexperta.s3.amazonaws.com/Archivos/muestra-certi.jpg';

            $result = [
                'antecedetesPoliciales'    => 'NO REGISTRA',
                'antecedetesJudiciales'    => 'NO REGISTRA',
                'antecedetesPenales'       => 'NO REGISTRA',
                'certificado'              => $trabajador->certificado_antecedente ? $muestracerti : null,
            ];
        }else{
            $result =[
                'antecedetesPoliciales'    => $trabajador->policial_conclusion == 0 ? 'NO REGISTRA' : null,
                'antecedetesJudiciales'    => $trabajador->judicial_conclusion == 0 ? 'NO REGISTRA' : null,
                'antecedetesPenales'       => $trabajador->penal_conclusion == 0 ? 'NO REGISTRA' : null,
                'certificado'              => null
            ];
        }


    }

    return $result;
}

function formatSalud($trabajador){

    $result = [];
    $muestraAdjunto = 'https://adjuntosexperta.s3.amazonaws.com/Archivos/muestra-carnetvacunacion.jpg';

    if ($trabajador){

        $adjuntoCartillaVacuna = $trabajador->adjunto_cartilla_vacuna ? json_decode(str_replace('\/','/',$trabajador->adjunto_cartilla_vacuna)) : null;

        $result = [
            'tuvoCovid'                 => $trabajador->tuvo_covid ? $trabajador->tuvo_covid : null,
            'tipoResultado'             => $trabajador->tipo_prueba_covid ? $trabajador->tipo_prueba_covid : null,
            'resultadoCovid'            => $trabajador->resultado_covid ? $trabajador->resultado_covid : null,
            'informeCovid'              => $trabajador->adjunto_informe_covid ? json_decode(str_replace('\/','/',$trabajador->adjunto_informe_covid))[0] : null,
            'pruebaCovid'               => $trabajador->adjunto_prueba_covid ? json_decode(str_replace('\/','/',$trabajador->adjunto_prueba_covid))[0] : null,
            'tieneVacuna'               => $trabajador->tiene_vacuna ? $trabajador->tiene_vacuna : '0',
            //'adjuntoCartillaVacuna'     => $trabajador->adjunto_cartilla_vacuna ? json_decode(str_replace('\/','/',$trabajador->adjunto_cartilla_vacuna)) : null,
            'adjuntoCartillaVacuna'     => $trabajador->adjunto_cartilla_vacuna ? $muestraAdjunto : null,
        ];

    }

    return $result;
}

function formatRedesContacto($trabajador){
    $result = [];

    if ($trabajador){

        $telefono = $trabajador->telefono ? verificarNum($trabajador->telefono) : null;
        $whatsapp = $trabajador->telefono_whatsapp ? verificarNum($trabajador->telefono_whatsapp) : null;

        $result =[
            'telefono'      => $telefono,
            'whatsapp'      => $whatsapp,
            'formatTel'     => $telefono ? base64_encode(nostNumber($telefono)) : null,
            'formatWA'      => $whatsapp ? base64_encode(nostNumber($whatsapp)) : null,
        ];
    }
    return $result;
}

function convert_from_latin1_to_utf8_recursively($dat){
    if (is_string($dat)) {
        return utf8_encode($dat);
    } elseif (is_array($dat)) {
        $ret = [];
        foreach ($dat as $i => $d) $ret[ $i ] = convert_from_latin1_to_utf8_recursively($d);

        return $ret;
    } elseif (is_object($dat)) {
        foreach ($dat as $i => $d) $dat->$i = convert_from_latin1_to_utf8_recursively($d);

        return $dat;
    } else {
        return $dat;
    }
}

function getNombresAnteriorEmpleador($nombre, $apellidos = null){
    if (!$nombre) {
        return '';
    }

    $arr = explode(' ', trim($nombre));
    $first = $arr[0];

    // Si vienen apellidos por separado
    if ($apellidos) {
        return $first . ' ' . substr($apellidos, 0, 1) . '.';
    }

    // Si el nombre completo trae apellido
    if (count($arr) > 1) {
        return $first . ' ' . substr($arr[1], 0, 1) . '.';
    }

    // Si solo trae un nombre
    return $first;
}


function formatAdjuntoEducacionNew($educacion){

    $result = [];

    if($educacion){

        foreach (json_decode($educacion, true) as $d){

            if ($d['adjuntos']){
                $adjunto = $d['adjuntos'];
            }

            $result[] =[
                'centro'       => ($d['centro']),
                'titulo'       => ($d['titulo']),
                'duracion'     => isset($d['tiempo']) ? ($d['tiempo']) : null,
                'tipo'         => $d['tipocertificado'] ?  TipoCertificado::find($d['tipocertificado'])->nombre : '-',
                'adjunto'      => isset($d['adjuntos']) ? ($d['adjuntos'] == [] ? false : $adjunto[0]['url']) : false
            ];
        }
    }


    return $result;

}

function formatActividad($actividad, $paisPostulando){
    $result = [];

    if($actividad){

        foreach (json_decode($actividad) as $a){

            $act = Actividad::find($a);

            $result[] =[
                'nombre' => formatTextFirstCharacterToUpper((($paisPostulando == 11 ? $act->nombre_ch : $act->nombre))),
            ];
        }
    }

    return $result;
}

function formatIdioma($idioma){
    $result = [];

    if($idioma){

        foreach (json_decode($idioma) as $a){

            $result[] =[
                'nombre' => formatTextFirstCharacterToUpper(((Idioma::find($a)->nombre))),
            ];
        }
    }

    return $result;
}

function formatModalidad($trabajadora){
    $result = [];

    if ($trabajadora){

        $result =[
            'camaAdentro' => (bool) $trabajadora->cama_adentro,
            'camaAfuera'  => (bool) $trabajadora->cama_afuera,
            'porDias'     => (bool) $trabajadora->por_horas,
        ];
    }

    return $result;
}

function getAdjuntosVerificaciones($adjunto){

    $result = null;

    if($adjunto != null AND !empty($adjunto)){

        $adj = [];

        foreach ($adjunto as $data){

            if( in_array($data['extension'], ['png', 'jpg', 'jpeg', 'jfif'] ) ){

                $tipo = 'imagen';

            }else if (in_array($data['extension'], ['mp3', 'mp4', 'ogg'] )){
                $tipo = 'audio';
            }

            $adj[] = [
                'adjunto'   => $data['url'],
                'extension' => $data['extension'],
                'tipo'      => $tipo
            ];

        }

        $result = (count($adj) > 0) ? $adj : null;
    }

    return $result;

}
function getNameAndFirstCharacterFullName($nombres, $apellidos){

    $names = explode(' ', trim($nombres));

    return utf8_decode($names[0]) . ' ' . substr(utf8_decode($apellidos), 0, 1) . '.';

}

function showTiposModalidadesID($ca, $cf, $pd){

    $mod = [];

    if($ca){
        array_push($mod, 1);
    }

    if($cf){
        array_push($mod, 2);
    }

    if($pd){
        array_push($mod, 3);
    }

    return $mod;
}

function showTiposModalidadesFichaModal($ca, $cf, $ph, $paisPostulando = 54){

    $mod = [
        $ca ? ($paisPostulando == 49 ? 'DE PLANTA' :'CAMA ADENTRO') : '',
        $cf ? ($paisPostulando == 49 ? 'ENTRADA POR SALIDA' :'CAMA AFUERA') : '',
        $ph ? 'POR DIAS' : '',
    ];

    $filterMod = array_filter($mod);

    if($filterMod){

        if(count($filterMod) > 1){

            $lastValue = array_pop($filterMod);
            $resultado = formatTextFirstCharacterToUpper(implode(', ', $filterMod));
            $resultado .= ' y '.formatTextFirstCharacterToUpper($lastValue);

        }else{

            $resultado = formatTextFirstCharacterToUpper(implode('', $filterMod));
        }

        return $resultado;

    }else{
        return '';
    }

}

function showTiposActividadesFichaModal($actividades, $limit = '', $separador = ', ', $conector = false, $paisPedido = 54){

    $result = [];

    if($actividades){

        foreach (json_decode($actividades) as $d){

            $cantidadAct = count($result);

            $act = Actividad::find($d);

            if($d == 10){
                $nameAct = formatTextFirstCharacterToUpper('CUIDADO ADULTO');
            }else{
                $nameAct = formatTextFirstCharacterToUpper($paisPedido == 11 ? $act->nombre_ch : $act->nombre);
            }

            //dd($act, $nameAct);

            if($cantidadAct == 0){

                if($conector){
                    $result[] = strtolower($act->conector) . ' '.$nameAct;
                }else{
                    $result[] = $nameAct;
                }

            }else{
                $result[] = $nameAct;
            }

        }

        $newArray = $result;

        if($limit){
            $newArray = array_slice($result, 0, $limit);
        }

        if(count($newArray) > 1){

            $lastValue = array_pop($newArray);
            $resultado = implode($separador, $newArray);
            $resultado .= ' y '.$lastValue;

        }else{
            $resultado = implode('', $newArray);
        }

        return $resultado;

    }

    return $result;

}

function in_range($number, $min, $max){
    if (is_int($number) && is_int($min) && is_int($max))
    {
        return ($number >= $min && $number <= $max);
    }

    return false;
}

function getPlaceholderSueldo(int $actividad, int $modalidad,int $paispedido = 54){

    if ($modalidad === 3){

        $divisa = $paispedido == 11 ? 'CLP $ ' : 'PEN S/ ';

        if ($actividad == 1){
            $monto = $paispedido == 11 ? '30.000' : '80';
        }else if($actividad == 6){
            $monto = $paispedido == 11 ? '35.000' : '85';
        }else if($actividad == 10){
            $monto = $paispedido == 11 ? '30.000' : '85';
        }else if ($actividad == 3){
            $monto = $paispedido == 11 ? '30.000' : '100';
        }else{
            $monto = $paispedido == 11 ? '30.000' : '70';
        }

        return ('Desde ' . $divisa . $monto);

    }else{

        $act = Actividad::find($actividad);
        $divisa = $paispedido == 11 ? 'CLP $ ' : 'PEN S/ ';

        if ($modalidad == 1){
            $monto = $paispedido == 11 ? $act->pre_ref_cd_ch :$act->precio_referencia;
        }else if ($modalidad == 2){
            $monto = $paispedido == 11 ? $act->pre_ref_cf_ch :$act->precio_referencia_cf;
        }

        return ('Desde ' . $divisa . $monto);

    }

}

function createArrayCantidad($number, $inicio = 0){

    $result = [];

    for($i = $inicio; $i <= $number; $i++){

        array_push($result, $i);
    }

    return$result;

}

function getValueSelectSingle($data){

    if($data){
        return $data['value'];
    }

    return null;

}

function getDepartamentoProvinciaDistrito($data){

    if(!empty($data)){

        $distritoid = $data['value'];
        $distrito = \App\Models\Distrito::find($distritoid);
        $provincia = \App\Models\Provincia::find($distrito->provincia_id);
        $departamento = \App\Models\Departamento::find($provincia->departamento_id);

        return [
            'distrito' => $distritoid,
            'provincia' => $provincia->id,
            'departamento' => $departamento->id
        ];

    }else{
        return null;
    }

}

function saveFormatAdjuntoEducacion($data){

    $result = null;

    if($data){

        $r = [];

        foreach($data as $key => $value){

            if(array_filter($value)){

                $d = [
                    "tipocertificado" => isset($value['tipocertificado']) ? getValueSelectSingle($value['tipocertificado']) : null,
                    "centro"          => isset($value['centro']) ? $value['centro'] : null,
                    "titulo"          => isset($value['titulo']) ? $value['titulo'] : null,
                    "fechainicio"     => isset($value['fechainicio']) ? \Carbon\Carbon::parse($value['fechainicio'])->format('Y-m-d') : null ,
                    "fechafin"        => isset($value['fechafin']) ? \Carbon\Carbon::parse($value['fechafin'])->format('Y-m-d') : null ,
                    "tiempo"          => isset($value['tiempo']) ? $value['tiempo'] : null,
                    "adjuntos"        => isset($value['adjuntos']) ? $value['adjuntos'] : null
                ];

                array_push($r, $d);

            }

        }
        $result = json_encode($r);
    }
    return $result;
}

function getActividadesVerificaciones($data){

    if(!empty($data)){

        return saveFormatMultiselect($data);

    }else{
        return NULL;
    }

}

function saveFormatVerificaciones($data){

    $result = null;

    if($data){

        $r = [];

        foreach($data as $key => $value){

            if(array_filter($value)){

                $dis = getDepartamentoProvinciaDistrito($value['distrito']);
                $act = getActividadesVerificaciones($value['actividad']);

                $d = [
                    "nombre" => $value['nombre'],
                    "apellidos" => isset($value['apellidos']) ? $value['apellidos'] : null,
                    "departamento" => $dis ? $dis['departamento'] : null,
                    "provincia" => $dis ? $dis['provincia'] : null,
                    "distrito" => $dis ? $dis['distrito'] : null,
                    "telefono" => $value['telefono'] ? $value['telefono'] : null,
                    "actividad" => $act,
                    "tiempo" => isset($value['tiempo']) ? ($value['tiempo'] ? $value['tiempo'] : null) : null,
                    "inicioLabores" => $value['inicioLabores'] ? \Carbon\Carbon::parse($value['inicioLabores'])->format('Y-m-d') : null ,
                    "finLabores" => $value['finLabores'] ? \Carbon\Carbon::parse($value['finLabores'])->format('Y-m-d') : null,
                    "verificado" => $value['verificado'],
                    "motivoretiro" => $value['motivoretiro'] ? $value['motivoretiro'] : null,
                    "adjuntos" => isset($value['adjuntos']) ? $value['adjuntos'] : null,
                    "adjuntosrecomendaciones" => isset($value['adjuntosrecomendaciones']) ? $value['adjuntosrecomendaciones'] : null
                ];

                array_push($r, $d);
            }
        }

        $result = json_encode($r);
    }
    return ( ($result == [] OR $result == '[]' OR $result == '') ? NULL : $result);
}

function saveFormatMultiselect($data){

    $result = null;

    if($data){

        $r = [];

        foreach($data as $d){
            array_push($r, $d['value']);
        }

        $result = json_encode($r);
    }

    return $result;

}

function getModalidadesMultiselect($modalidades){

    $ca = false;
    $cf = false;
    $ph = false;

    if($modalidades){

        foreach ($modalidades as $m){

            if($m['value'] == 1){
                $ca = true;
            }else if($m['value'] == 2){
                $cf = true;
            }else if($m['value'] == 3){
                $ph = true;
            }
        }

    }

    return [
        'ca' => $ca,
        'cf' => $cf,
        'ph' => $ph
    ];
}

function getSueldoMinimoActividad( int $actividad, int $modalidad, int $paispedido = 54){

    if ($modalidad == 3){

        if ($actividad == 1){
            $monto = $paispedido == 11 ? 30000 : 80;
        }else if($actividad == 6){
            $monto = $paispedido == 11 ? 35000 : 85;
        }else if($actividad == 10){
            $monto = $paispedido == 11 ? 30000 : 85;
        }else if ($actividad == 3){
            $monto = $paispedido == 11 ? 30000 : 100;
        }else{
            $monto = $paispedido == 11 ? 30000 : 70;
        }

        return $monto;

    }else{

        $act = Actividad::find($actividad);

        if ($modalidad == 1){
            $monto = $paispedido == 11 ? $act->pre_ref_cd_ch :$act->precio_referencia;
        }else if ($modalidad == 2){
            $monto = $paispedido == 11 ? $act->pre_ref_cf_ch :$act->precio_referencia_cf;
        }

        return $monto;

    }

}

function countList($lista){
    $result = 0;
    if ($lista){
        $result = count(json_decode($lista));
    }
    return $result;
}

function getFileNameFromAwsUrl($url){

    $url = urldecode(basename($url));
    $parts = explode('/', $url);

    return end($parts);

}
