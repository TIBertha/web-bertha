<?php

function armarDataBlogs($data){
    $result = [];

    if ($data){
        foreach ($data as $d){
            $result[] = [
                'fuente'        => $d->fuente,
                'imagen'        => $d->imagen,
                'titulo'        => $d->titulo,
                'fecha'         => $d->fecha,
                'medio'         => $d->medio,
                'logo_medio'    => $d->logo_medio,
                'contenido'     => $d->contenido ? strip_tags($d->contenido) : null,
                'num'           => $d->num
            ];
        }
    }
    return $result;
}

function quitarTildes($cadena) {
    $no_permitidas= array ("á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","Ñ","À","Ã","Ì","Ò","Ù","Ã™","Ã ","Ã¨","Ã¬","Ã²","Ã¹","ç","Ç","Ã¢","ê","Ã®","Ã´","Ã»","Ã‚","ÃŠ","ÃŽ","Ã”","Ã›","ü","Ã¶","Ã–","Ã¯","Ã¤","«","Ò","Ã","Ã„","Ã‹");
    $permitidas= array ("a","e","i","o","u","A","E","I","O","U","n","N","A","E","I","O","U","a","e","i","o","u","c","C","a","e","i","o","u","A","E","I","O","U","u","o","O","i","a","e","U","I","A","E");
    $texto = str_replace($no_permitidas, $permitidas ,$cadena);
    return $texto;
}

function convertToFormatSelectRegistroRequerimiento($id, $type =  null, $paispedido = null){
    $result = '';

    if ($id){
        if ($type == 'actividad'){
            $data = \App\Models\Actividad::find($id);

            $result = [
                'label' => mb_convert_case(($paispedido == 11 ? $data->nombre_ch : $data->nombre), MB_CASE_TITLE, "UTF-8") . ' ' . $data->descripcion,
                'value' => $data->id,
            ];
        }else if ($type == 'modalidad'){
            $data = \App\Models\Modalidad::find($id);

            $result = [
                'label' => mb_convert_case(($paispedido == 11 ? $data->nombre_ch : $data->nombre), MB_CASE_TITLE, "UTF-8") . ' ' . $data->descripcion,
                'value' => $data->id,
            ];
        }else if ($type == 'nacionalidad'){
            $data = \App\Models\Nacionalidad::find($id);

            $result = [
                'label' => mb_convert_case($data->nombre, MB_CASE_TITLE, "UTF-8"),
                'value' => $data->id,
            ];
        }else if ($type == 'ubicacion'){
            $data = \App\Models\Views\DistritoView::find($id);

            $result = [
                'label' => mb_convert_case($data->distritoscinco, MB_CASE_TITLE, "UTF-8"),
                'value' => $data->id,
            ];
        }else if ($type == 'tipoVivienda'){
            $data = \App\Models\TipoVivienda::find($id);

            $result = [
                'label' => mb_convert_case($data->nombre, MB_CASE_TITLE, "UTF-8"),
                'value' => $data->id,
            ];
        }else if ($type == 'tipoBeneficio'){
            $data = \App\Models\TipoBeneficio::find($id);

            $result = [
                'label' => mb_convert_case($data->nombre, MB_CASE_TITLE, "UTF-8"),
                'value' => $data->id,
            ];
        }else if ($type == 'dia'){
            $data = \App\Models\DiaSemana::find($id);

            $result = [
                'label' => mb_convert_case($data->nombre, MB_CASE_TITLE, "UTF-8"),
                'value' => $data->id,
            ];
        }else{

            $result = [
                'label' => mb_convert_case($id, MB_CASE_TITLE, "UTF-8"),
                'value' => $id,
            ];
        }
    }

    return $result;
}

function getCampoRangoEdades($data, $tipo){
    $result = '';

    if ($data){
        $rango = json_decode($data,true)[0];

        if ($tipo == 'rangominimo'){
            $result = $rango['edadminima'];
        }else if ($tipo == 'rangomaximo'){
            $result = $rango['edadmaxima'];
        }

    }

    return $result;
}

function convertToFormatSelectNumeroPisos($pisos, $tipoVivienda){
    $result = '';

    if ($pisos){
        if ($tipoVivienda){
            if ($tipoVivienda == 2){
                if ($pisos == 1){
                    $nombre = 'Flat (1 piso)';
                }else if ($pisos == 2){
                    $nombre = 'Dúplex (2pisos)';
                }else if ($pisos == 3){
                    $nombre = 'Triplex (3 pisos)';
                }

                $result = [
                    'label' => mb_convert_case($nombre, MB_CASE_TITLE, "UTF-8"),
                    'value' => $pisos,
                ];
            }else{
                $result = [
                    'label' => mb_convert_case($pisos, MB_CASE_TITLE, "UTF-8"),
                    'value' => $pisos,
                ];
            }
        }else{
            $result = [
                'label' => mb_convert_case($pisos, MB_CASE_TITLE, "UTF-8"),
                'value' => $pisos,
            ];
        }
    }

    return $result;

}

function convertToTags($data){
    $result = [];

    if ($data){
        $result = json_decode($data);
    }

    return $result;
}

function convertToFormatSelectRegistroPostulante($id, $type, $paisPostulando = 54){

    $result = '';
    $t = '';

    if($type == 'numero_hijos'){

        $result = [
            'label' => $id,
            'value' => $id
        ];

    }else if ($type == 'tiene_vacuna'){
        $t = findFieldName($id,'tiene_vacuna');

        $result = [
            'label' => $t,
            'value' => $id
        ];
    }

    if($id){

        if($type == 'tuvo_covid'){

            $result = [
                'label' => $id,
                'value' => $id
            ];

        }else if($type == 'tiene_vacuna'){

            $t = findFieldName($id,'tiene_vacuna');

            $result = [
                'label' => $t,
                'value' => $id
            ];

        }else if($type == 'estado_civil'){

            $data = \App\Models\EstadoCivil::find($id);

            $result = [
                'label' => $data->nombre,
                'value' => $data->id
            ];

        }else if($type == 'tipo_documento'){

            $data = \App\Models\TipoDocumento::find($id);

            $result = [
                'label' => $data->nombre,
                'value' => $data->id
            ];

        }else if($type == 'genero'){

            $data = \App\Models\Genero::find($id);

            $result = [
                'label' => $data->segundo_nombre,
                'value' => $data->id
            ];

        }else if($type == 'departamento'){

            $data = \App\Models\Departamento::find($id);

            $result = [
                'label' => $data->nombre,
                'value' => $data->id
            ];

        }else if($type == 'distrito'){

            $data = \App\Models\Views\DistritoView::find($id);

            $result = [
                'label' => $data->distritostres,
                'value' => $data->id
            ];

        }else if($type == 'idioma'){

            if($id){

                $idiomas = json_decode($id, true);

                $result = [];

                foreach ($idiomas as $i){

                    $data = \App\Models\Idioma::find($i);

                    $result[] = [
                        'label' => $data->nombre,
                        'value' => $data->id
                    ];

                }
            }

        }else if($type == 'actividad'){

            $actividades = json_decode($id, true);

            $result = [];

            foreach ($actividades as $i){

                $data = \App\Models\Actividad::find($i);

                $result[] = [
                    'label' => ($paisPostulando == 11 ? $data->nombre_ch : $data->nombre),
                    'value' => $data->id
                ];

            }

        }else if($type == 'parentesco'){

            $data = \App\Models\Parentesco::find($id);

            $result = [
                'label' => $data->nombre,
                'value' => $data->id
            ];

        }else if($type == 'niveleducativo'){

            $data = \App\Models\NivelEducativo::find($id);

            $result = [
                'label' => ($paisPostulando == 11 ? $data->nombre_ch : $data->nombre),
                'value' => $data->id
            ];

        }else if($type == 'tipocertificado'){

            $data = \App\Models\TipoCertificado::find($id);

            $result = [
                'label' => $data->nombre,
                'value' => $data->id
            ];

        }else if($type == 'pais'){

            $data = \App\Models\Pais::find($id);

            $result = [
                'label' => $data->nombre,
                'value' => $data->id
            ];

        }

    }

    return $result;
}

function convertToFormatSelectRegistroPostulanteModalidad($camaadentro, $camaafuera, $pordias, $paisPostulando = 54){

    $result = [];

    if($camaadentro){

        $data = \App\Models\Modalidad::find(1);

        $result[] = [
            'label' => ($paisPostulando == 11 ? $data->nombre_ch : $data->nombre),
            'value' => $data->id
        ];

    }

    if($camaafuera){

        $data = \App\Models\Modalidad::find(2);

        $result[] = [
            'label' => ($paisPostulando == 11 ? $data->nombre_ch : $data->nombre),
            'value' => $data->id
        ];

    }

    if($pordias){

        $data = \App\Models\Modalidad::find(3);

        $result[] = [
            'label' => ($paisPostulando == 11 ? $data->nombre_ch : $data->nombre),
            'value' => $data->id
        ];

    }

    return $result ? $result : null;
}

function convertToFormatMultiselectActividad($data){

    $result = [];

    if($data){

        foreach(json_decode($data) as $d){

            $actividad = \App\Models\Actividad::find($d);

            $result[] = [
                'label' => ((($actividad->nombre))),
                'value' => $actividad->id
            ];

        }
    }

    return $result;

}

function convertFormatSimpleSelectGeneros($data, $capitalize = true){

    $result = [];

    if($data){
        foreach($data as $d){
            $result[] = [
                'label' => $capitalize ? mb_convert_case($d->segundo_nombre, MB_CASE_TITLE, "UTF-8") : mb_convert_case($d->segundo_nombre, MB_CASE_UPPER, "UTF-8"),
                'value' => $d->id
            ];
        }
    }
    return $result;
}

function convertFormatSimpleSelectDistritos($data, $capitalize = true, $uppercase = false){

    $result = [];

    if($data){
        foreach($data as $d){
            if($uppercase){
                $result[] = [
                    'label' => mb_convert_case($d->distritostres, MB_CASE_UPPER, "UTF-8"),
                    'value' => $d->id
                ];
            }else{
                $result[] = [
                    'label' => $capitalize ? mb_convert_case($d->distritostres, MB_CASE_TITLE, "UTF-8") : ucfirst(mb_convert_case($d->distritostres, MB_CASE_LOWER, "UTF-8")) ,
                    'value' => $d->id
                ];
            }
        }
    }
    return $result;
}

function convertFormatSimpleSelectCantidades($data){

    $result = [];

    if($data){
        foreach($data as $d){
            $result[] = [
                'label' => $d,
                'value' => $d
            ];
        }
    }
    return $result;
}

function convertNameToWhatsAppEncoded($nombre){
    $n = mb_convert_case($nombre, MB_CASE_TITLE, "UTF-8");


    return '%2A' . str_replace(' ', '%20', $n) . '%2A';
}

function convertToFormatSelectTipoDescanso($data){
    $result = null;

    if ($data){
        if ($data == 7 ){
            $result = [
                'label' => mb_convert_case('25x5', MB_CASE_TITLE, "UTF-8"),
                'value' => $data,
            ];
        }else if ($data == 8){
            $result = [
                'label' => mb_convert_case('Quincenal', MB_CASE_TITLE, "UTF-8"),
                'value' => $data,
            ];
        }else if ($data == 9){
            $result = [
                'label' => mb_convert_case('Semanal', MB_CASE_TITLE, "UTF-8"),
                'value' => $data,
            ];
        }
    }
    return $result;
}

function convertToFormatSelectHour($data)
{
    if (!$data) {
        return null;
    }

    $hora = date('H', strtotime($data));   // 00–23
    $min  = date('i', strtotime($data));   // 00–59

    // Si los minutos son 00 → 0, si no → 0.5
    $decimal = ($min === "00") ? 0 : 0.5;

    // Valor numérico final
    $value = (int)$hora + $decimal;

    return [
        'value' => $value,
        'label' => date('h:i A', strtotime($data)),
    ];
}


function convertFormatSimpleSelect($data, $capitalize = true, $uppercase = false, $paisPedido = 54){

    $result = [];

    if($data){
        foreach($data as $d){
            if($uppercase){
                $result[] = [
                    'label' => mb_convert_case(($paisPedido == 11 ? $d->nombre_ch : $d->nombre), MB_CASE_UPPER, "UTF-8"),
                    'value' => $d->id
                ];
            }else{
                $result[] = [
                    'label' => $capitalize ? mb_convert_case(($paisPedido == 11 ? $d->nombre_ch : $d->nombre), MB_CASE_TITLE, "UTF-8") : ucfirst(mb_convert_case(($paisPedido == 11 ? $d->nombre_ch : $d->nombre), MB_CASE_LOWER, "UTF-8")) ,
                    'value' => $d->id
                ];
            }
        }
    }
    return $result;
}

function convertFormatDistritosSelect($data){

    $result = [];

    if($data){

        foreach($data as $d){

            $result[] = [
                'label' => mb_convert_case($d->distritoscinco, MB_CASE_UPPER, "UTF-8"),
                'value' => $d->id
            ];
        }
    }

    return $result;

}

function convertFormatSimpleSelectActividad($data, $paisPedido, $capitalize = true, $uppercase = false){

    $result = [];

    if($data){
        foreach($data as $d){
            if($uppercase){
                $result[] = [
                    'label' => mb_convert_case(($paisPedido == 54 ? $d->nombre : $d->nombre_ch), MB_CASE_UPPER, "UTF-8") . ' ' . $d->descripcion,
                    'value' => $d->id
                ];
            }else{
                $result[] = [
                    'label' => mb_convert_case(($paisPedido == 54 ? $d->nombre : $d->nombre_ch), ($capitalize ? MB_CASE_TITLE : MB_CASE_LOWER), "UTF-8") . ' ' . $d->descripcion,
                    'value' => $d->id
                ];
            }
        }
    }
    return $result;
}

function convertFormatSimpleSelectModalidad($data, $paisPedido, $capitalize = true, $uppercase = false){

    $result = [];

    if($data){
        foreach($data as $d){
            if($uppercase){
                $result[] = [
                    'label' => mb_convert_case(($paisPedido == 54 ? $d->nombre : $d->nombre_ch), MB_CASE_UPPER, "UTF-8") . ' ' . $d->descripcion,
                    'value' => $d->id
                ];
            }else{
                $result[] = [
                    'label' => mb_convert_case(($paisPedido == 54 ? $d->nombre : $d->nombre_ch), ($capitalize ? MB_CASE_TITLE : MB_CASE_LOWER), "UTF-8") . ' ' . $d->descripcion,
                    'value' => $d->id
                ];
            }
        }
    }
    return $result;
}

function gethorasList($start, $end){

    $result = [];

    if ($start && $end){
        foreach (range($start , $end) as $num){

            $value = $num;
            $hora = $num > 12 ? ($num - 12) : $num;

            $label = ( ($hora >= 10 ? $hora : ('0' . $hora )) . ':' . '00' . ' ' . ($num >= 12 ? 'pm' : 'am'));

            $result[] = [
                'label' => $label,
                'value' => $value
            ];

        }
    }

    return $result;
}

function saveRangoBusqueda($edadminima, $edadmaxima){
    $result = [];

    if ($edadminima && $edadmaxima){

        $result[] =[
            'edadminima' => $edadminima,
            'edadmaxima' => $edadmaxima,
        ];


    }

    return json_encode($result);

}

function getFirstName($nombres){

    $names = explode(' ', trim($nombres));

    return $names[0];

}

function unaccent($string){

    $string = trim($string);

    $string = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
        $string
    );

    $string = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
        $string
    );

    $string = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
        $string
    );

    $string = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
        $string
    );

    $string = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
        $string
    );

    $string = str_replace(
        array('ç', 'Ç'),
        array('c', 'C',),
        $string
    );

    $string = str_replace(
        array('ñ', 'Ñ', 'Ñ'),
        array('ñ', 'Ñ', 'Ñ'),
        $string
    );

    return $string;

}

function armarEdad($fechaDiff){
    $result = null;
    if ($fechaDiff){
        $anios = $fechaDiff->format('%y');
        $meses = $fechaDiff->format('%m');
        $dias = $fechaDiff->format('%d');

        $result = $anios . ($anios > 1 ? ' años' : ' año') . ($meses == 0 ? '' : ($dias > 0 ? ',' : ' y')) . ( $meses > 0 ? (' ' . $meses . ($meses > 1 ? ' meses ' : ' mes ')) : '') .  ($dias > 0 ? ' y' : '')  . ($dias > 0 ? (' ' . $dias . ($dias > 1 ? ' días' : ' día')) : '');
    }

    return $result;

}

function restringirInformacion($texto){

    $palabras = explode(' ', $texto);

    if($palabras){

        $result = [];

        foreach ($palabras as $p){

            $numcaracteres = strlen($p);

            if($numcaracteres){
                $result[] = substr($p, 0, 1).str_repeat('*', $numcaracteres - 2).substr($p, $numcaracteres - 1, 1);
            }
        }

        return implode(' ', $result);
    }

    return '';
}

function verificarNum($num){
    $result = null;
    if ($num){

        if (substr($num,2,1)  == '1' && strlen($num) == 10){
            //$result = intval('+51 1 ' . substr($num,2,8));
            $result = '+51 1 ' . restringirInformacion(substr($num,3,8));
        }else if (substr($num,0,2)  == '51'){
            $result = '+51 ' . restringirInformacion(substr($num,2,9));
        }else if (substr($num,0,2) == '56'){
            $result = '+56 ' . restringirInformacion(substr($num,2,(strlen($num) == 11 ? 9 : 10)));
        }else if (substr($num,0,2) == '34'){
            $result = '+34 ' . restringirInformacion(substr($num,2,(strlen($num) == 11 ? 9 : 10)));
        }else if (substr($num,0,2) == '61'){
            $result = '+61 ' . restringirInformacion(substr($num,2,(strlen($num) == 11 ? 9 : 10)));
        }else if (substr($num,0,1) == '1' && strlen($num) == 11){
            $result = '+1 ' . restringirInformacion(substr($num,1,strlen($num)));
        } else{
            $result = restringirInformacion($num);
        }
    }

    return$result;
}

function nostNumber($telefono){
    $string1 = str_replace("*", "0", $telefono);
    $string2 = str_replace(" ", "", $string1);
    return $string2;
}

function checkVideoYoutube($videoYoutube){
    $result = null;

    if ($videoYoutube){

        if(strpos($videoYoutube, 'https://youtu.be/') !== false){
            $result = str_replace('https://youtu.be/','https://www.youtube.com/embed/', $videoYoutube);
        }else if (strpos($videoYoutube, 'https://www.youtube.com/watch?v=') !== false){
            $result = str_replace('/watch?v=','/embed/', $videoYoutube);
        }
    }

    return $result;
}

function formatTextFirstCharacterToUpper($string, $removeracentos = true, $ucfirst = false){

    if(valueNull($string)){
        return NULL;
    }else{

        $procesaracentos = $removeracentos ? unaccent(trim($string)) : (trim($string));

        if($ucfirst){
            return ucfirst(mb_strtolower(  $procesaracentos )  );
        }else{
            return ucwords(mb_strtolower( $procesaracentos ));
        }

    }

}

function cleaner($text){

    $utf8 = array(
        '/[áàâãªä]/u'   =>   'a',
        '/[ÁÀÂÃÄ]/u'    =>   'A',
        '/[ÍÌÎÏ]/u'     =>   'I',
        '/[íìîï]/u'     =>   'i',
        '/[éèêë]/u'     =>   'e',
        '/[ÉÈÊË]/u'     =>   'E',
        '/[óòôõºö]/u'   =>   'o',
        '/[ÓÒÔÕÖ]/u'    =>   'O',
        '/[úùûü]/u'     =>   'u',
        '/[ÚÙÛÜ]/u'     =>   'U',
        '/ç/'           =>   'c',
        '/Ď/'           =>   'D',
        '/Ç/'           =>   'C',
        '/ñ/'           =>   'n',
        '/Ñ/'           =>   'N',
        '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
        '/[’‘‹›‚]/u'    =>   ' ', // Literally a single quote
        '/[“”«»„]/u'    =>   ' ', // Double quote
        '/ /'           =>   ' ' // nonbreaking space (equiv. to 0x160)
    );

    return preg_replace(array_keys($utf8), array_values($utf8), $text);
}

function valueNull($string){

    $text = trim((is_null($string) || empty($string) ? NULL : $string));

    if($text){
        return false;
    }else{
        return true;
    }

}

function formatText($string){

    if(valueNull($string)){
        return NULL;
    }else{
        return strtoupper(unaccent(trim($string)));
    }

}

function findFieldName($id, $tipo)
{
    if ($tipo !== 'tiene_vacuna') {
        return null;
    }

    $labels = [
        '0' => 'NO',
        '1' => '1 DOSIS',
        '2' => '2 DOSIS',
        '3' => '3 DOSIS',
        '4' => '4 DOSIS',
        '5' => '5 DOSIS',
    ];

    return $labels[$id] ?? null;
}


function getMapLink($latitud, $longitud, $tipo){
    $result = '';

    if ($tipo == 'image'){
        $result = 'https://maps.googleapis.com/maps/api/staticmap?center='. $latitud .','. $longitud .'&zoom=16&size=400x250&key=AIzaSyDn_o7H3NGNJhHZ5A13m7NIBqpmjq4YIW4';
    }elseif ($tipo == 'link'){
        $result = 'https://www.google.com.pe/maps/@' . $latitud . ',' . $longitud . ',17z';
    }

    return $result;
}

function generateLinkGoogleMap($direccion, $distrito){
    return 'https://www.google.com/maps/search/?api=1&query=' . $direccion . '%2C' . $distrito;
}
