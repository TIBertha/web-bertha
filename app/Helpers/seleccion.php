<?php

use App\Models\Pais;
use App\Models\Views\TrabajadorView;
use App\Models\Views\DistritoView;
use App\Models\Actividad;
use App\Models\Modalidad;
use App\Models\RangoEdad;

function processingSeleccion($data = null, $isDataUrl = null, $isMobile = null)
{
    if (!$data) {
        return processingFilters(null, $isMobile);
    }

    // Procesar parámetros desde URL si aplica
    if ($isDataUrl) {
        $data = processingParametersURL($data);
    }

    // Si después de procesar sigue vacío, retornar null
    if (empty($data)) {
        return processingFilters(null, $isMobile);
    }

    // Map directo sin foreach
    $processData = array_map(function ($d) {
        return checkFiltros($d['filtro'], $d['valor']);
    }, $data);

    return processingFilters($processData, $isMobile);
}


function processingParametersURL($data){

    $result = [];

    foreach ($data as $key => $value){

        $r = checkFiltros($key, $value);

        if($r){
            $result[] = $r;
        }
    }

    return $result;

}

function processingFilters($data = null, $isMobile = null)
{
    $cart = session()->get('cart-seleccion') ?? [];

    return [
        'filtros'      => $data ?? [],
        'trabajadores' => getQuerySeleccionTrabajadores($data, $isMobile),
        'url'          => $data ? generateQueryString($data) : '',
        'cart'         => $cart,
    ];
}

function getQuerySeleccionTrabajadores($filtros = null, $isMobile = null){

    $limit = $isMobile ? 8 : 9;
    $offset = 0;
    $page = 0;
    $queryWithoutNacionalidadAndRangoEdades = null;
    $queryWithNacionalidad = null;
    $queryWithRangoEdades = null;
    $actividades = null;
    $modalidades = null;

    $country = Pais::where('country_code', strtoupper(session()->get('country')))->first();

    $query = TrabajadorView::where('estadoid', 1)
        ->where('actividad_id', 'not like', '%[11]%')
        ->where('postulando_pais_id', $country->id)
        ->where('actualizado', '>=', \Carbon\Carbon::now()->subDays(30) )
        ->orderBy('actualizado', 'desc');

    if($filtros){

        $nacionalidad = 0;
        $tipoNacionalidad = null;
        $sueldo = findValueInFiltro('sueldo', $filtros);
        $edades = getFiltrosEdades($filtros);

        foreach ($filtros as $f){

            $filtro = $f['filtro'];
            $valor = $f['valor'];

            if($sueldo){
                if($filtro == 'actividad'){
                    $query->where(function ($q) use ($valor){
                        $q->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", [$valor]);
                    });
                }

                if($filtro == 'modalidad'){

                    if($valor == 1){

                        $query->where(function ($q){
                            $q->where('cama_adentro', true);
                        });

                    }else if($valor == 2){

                        $query->where(function ($q){
                            $q->where('cama_afuera', true);
                        });

                    }else if($valor == 3){

                        $query->where(function ($q){
                            $q->where('por_horas', true);
                        });

                    }

                }

                if (!($filtro === 'modalidad' && $valor == 3)) {
                    $query->where('sueldo_promedio', '<=', $sueldo);
                }

            }else{

                if($filtro == 'modalidad'){

                    if($valor == 1){

                        $query->where(function ($q){
                            $q->where('cama_adentro', true);
                        });

                    }else if($valor == 2){

                        $query->where(function ($q){
                            $q->where('cama_afuera', true);
                        });

                    }else if($valor == 3){

                        $query->where(function ($q){
                            $q->where('por_horas', true);
                        });

                    }

                }

                if($filtro == 'actividad'){

                    $query->where(function ($q) use ($valor){
                        $q->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", [$valor]);
                    });

                }

            }

            if($filtro == 'peruana' OR $filtro == 'extranjero'){

                $nacionalidad = $nacionalidad + 1;
                $tipoNacionalidad = $filtro;

            }

            if($filtro == 'page'){
                $offset = ( ($valor - 1) * ($limit) );
                $page = $valor;
            }

        }

        $queryWithoutNacionalidadAndRangoEdades = clone $query;

        if($edades){

            $query->where(function ($q) use ($edades) {

                $edad18a30 = in_array(1, $edades) ? 'edad between 18 and 30' : '""';
                $edad31a45 = in_array(2, $edades) ? 'edad between 31 and 45' : '""';
                $edad46amas = in_array(3, $edades) ? 'edad between 46 and 150' : '""';

                $q->whereRaw($edad18a30.' or ' . $edad31a45 . ' or ' .$edad46amas);

            });

            $queryWithRangoEdades = clone $query;

        }

        if($nacionalidad > 0){

            if($nacionalidad == 1){

                $query->where(function ($q) use ($tipoNacionalidad){
                    $q->where('nacionalidad_id', ($tipoNacionalidad == 'extranjero' ? 2 : 1));
                });

                $queryWithNacionalidad = clone $query;

            }

        }

    }

    $total = $query->count();
    $totalesFiltros = calcularTotalesFiltros($query, $actividades, $queryWithNacionalidad, $queryWithoutNacionalidadAndRangoEdades, $queryWithRangoEdades, $filtros);
    $items = $query->limit($limit)->offset($offset)->get();

    return [
        'total' => $total,
        'totalesfiltros' => $totalesFiltros,
        'page' => $page,
        'items' => formatDataTrabajadores($items)
    ];

}

function formatDataTrabajadores($trabajadores){

    $result = [];

    if($trabajadores){

        foreach ($trabajadores as $d){

            $disponibilidad = getDisponibilidadTrabajador($d->actualizado);

            $direccion = DistritoView::find($d->distrito_id);

            $result[] = [
                'id'                       => $d->id,
                'token'                    => $d->token,
                'foto'                     => $d->foto,
                'usuario'                  => $d->usuario_id,
                'nacionalidad'             => mb_convert_case($d->nacionalidad, MB_CASE_TITLE, "UTF-8"),
                'nacionalidad_id'          => $d->nacionalidad_id,
                'nombre'                   => convert_from_latin1_to_utf8_recursively(getNameAndFirstCharacterFullName($d->nombres, $d->apellidos)),
                'edad'                     => $d->edad,
                'modalidad_id'             => showTiposModalidadesID($d->cama_adentro, $d->cama_afuera, $d->por_horas),
                'modalidades'              => showTiposModalidadesFichaModal($d->cama_adentro, $d->cama_afuera, $d->por_horas, $d->postulando_pais_id),
                'actividad_id'             => $d->actividad_id ? json_decode($d->actividad_id, true) : [],
                'actividades'              => showTiposActividadesFichaModal($d->actividad_id, '', ', ', false, $d->postulando_pais_id),
                'lugarnacimiento'          => formatTextFirstCharacterToUpper($d->lugarnacimiento) . ', ' . ( $d->pais_id == 54 ? 'Perú' : formatTextFirstCharacterToUpper($d->pais)),
                'direccion'                => mb_convert_case($direccion->distritostres, MB_CASE_TITLE, "UTF-8"),
                'videopresentacion'        => $d->videointroduccion ?? null,
                'videoextension'           => $d->videointroduccion ?? null,
                'videointroduccionyoutube' => $d->video_introduccion_youtube ?? null,
                'sueldo_promedio'          => $d->sueldo_promedio,
                'cama_adentro'             => $d->cama_adentro,
                'cama_afuera'              => $d->cama_afuera,
                'por_dias'                 => $d->por_horas,
                'disponibilidad'           => $disponibilidad,
                'tiene_vacuna'             => $d->tiene_vacuna ?? '0',
                'adjunto_cartilla_vacuna'  => $d->adjunto_cartilla_vacuna
            ];

        }

    }

    return $result;
}

function checkFiltros($filtro, $value){

    $f = strtolower($filtro);

    $country = Pais::where('country_code', strtoupper(session()->get('country')))->first();

    if($f == 'actividad'){

        $d = Actividad::borrado(false)->where('id', $value)->first();

        if($d){
            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper($country->id == 11 ? $d->nombre_ch : $d->nombre)
            ];
        }
    }

    if($f == 'modalidad'){

        $d = Modalidad::borrado(false)->where('id', $value)->first();

        if($d){
            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper($country->id == 11 ? $d->nombre_ch : $d->nombre)
            ];
        }
    }

    if($f == 'edad18a30'){

        $d = RangoEdad::borrado(false)->where('id', 1)->first();

        if($d){
            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper($d->nombre, false, true)
            ];
        }
    }

    if($f == 'edad31a45'){

        $d = RangoEdad::borrado(false)->where('id', 2)->first();

        if($d){
            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper($d->nombre, false, true)
            ];
        }
    }

    if($f == 'edad46amas'){

        $d = RangoEdad::borrado(false)->where('id', 3)->first();

        if($d){
            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper($d->nombre, false, true)
            ];
        }
    }

    if($f == 'peruana'){

        if($value == 1){
            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper('Peruana')
            ];
        }
    }

    if($f == 'extranjero'){

        if($value == 1){
            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper('Extranjero')
            ];
        }
    }

    if($f == 'sueldo'){

        if($value){

            return [
                'filtro' => $f,
                'valor' => (int)$value,
                'label' => formatTextFirstCharacterToUpper('S/.' . (int)$value)
            ];
        }
    }

    if($f == 'page'){

        return [
            'filtro' => $f,
            'valor' => (int)$value,
            'label' => 'page'
        ];
    }

    return null;

}

function generateQueryString($data)
{

    $result = '';

    if ($data) {

        $arrayResult = [];

        foreach ($data as $d) {
            $arrayResult[$d['filtro']] = $d['valor'];
        }

        $result = http_build_query($arrayResult);
    }

    return $result;
}

function calcularTotalesFiltros($query, $actividades = null, $queryWithNacionality = null, $queryWithoutNacionalidadAndRangoEdad = null, $queryWithRangoEdades = null, $filtros = null){

    $actividad = findValueInFiltro('actividad', $filtros);
    $modalidad = findValueInFiltro('modalidad', $filtros);

    $peruana = $queryWithRangoEdades ? clone $queryWithRangoEdades :  ( $queryWithoutNacionalidadAndRangoEdad ? clone $queryWithoutNacionalidadAndRangoEdad : clone $query);
    $extranjero = $queryWithRangoEdades ? clone $queryWithRangoEdades :  ( $queryWithoutNacionalidadAndRangoEdad ? clone $queryWithoutNacionalidadAndRangoEdad : clone $query);
    $ambos = $queryWithRangoEdades ? clone $queryWithRangoEdades :  ( $queryWithoutNacionalidadAndRangoEdad ? clone $queryWithoutNacionalidadAndRangoEdad : clone $query);

    //dd($query->toSql(), $queryWithoutNacionality->toSql());
    $desde18a30 = $queryWithNacionality ? clone $queryWithNacionality : ( $queryWithoutNacionalidadAndRangoEdad ? clone $queryWithoutNacionalidadAndRangoEdad : clone $query);
    $desde30a45 = $queryWithNacionality ? clone $queryWithNacionality : ( $queryWithoutNacionalidadAndRangoEdad ? clone $queryWithoutNacionalidadAndRangoEdad : clone $query);
    $mas40 = $queryWithNacionality ? clone $queryWithNacionality : ( $queryWithoutNacionalidadAndRangoEdad ? clone $queryWithoutNacionalidadAndRangoEdad : clone $query);

    $ca = clone $query;
    $cf = clone $query;
    $pd = clone $query;

    $todoservicio = clone $query;
    $cocina = clone $query;
    $enfermeria = clone $query;
    $limpiezavaron = clone $query;
    $limpiezadama = clone $query;
    $nana = clone $query;
    $ninera = clone $query;
    $chofer = clone $query;
    $mayordomo = clone $query;
    $cuidadoadulto = clone $query;
    $otro = clone $query;

    return [
        'camaadentro'  => ($modalidad == 1 OR $modalidad == null) ? $ca->where('cama_adentro', true)->count() : 0,
        'camaafuera'   => ($modalidad == 2 OR $modalidad == null) ? $cf->where('cama_afuera', true)->count() : 0,
        'pordias'      => ($modalidad == 3 OR $modalidad == null) ? $pd->where('por_horas', true)->count() : 0,
        'todoservicio' => ($actividad == 1 OR $actividad == null) ? $todoservicio->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(1, $actividades) ? [1] : 1000 ) : [1] ) )->count() : 0,
        'cocina'       => ($actividad == 2 OR $actividad == null) ? $cocina->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(2, $actividades) ? [2] : 1000 ) : [2] ) )->count() : 0,
        'enfermeria'   => ($actividad == 3 OR $actividad == null) ? $enfermeria->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(3, $actividades) ? [3] : 1000 ) : [3] ) )->count() : 0,
        'limpiezavaron'=> ($actividad == 4 OR $actividad == null) ? $limpiezavaron->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(4, $actividades) ? [4] : 1000 ) : [4] ) )->count() : 0,
        'limpiezadama' => ($actividad == 5 OR $actividad == null) ? $limpiezadama->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(5, $actividades) ? [5] : 1000 ) : [5] ) )->count() : 0,
        'nana'         => ($actividad == 6 OR $actividad == null) ? $nana->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(6, $actividades) ? [6] : 1000 ) : [6] ) )->count() : 0,
        'ninera'       => ($actividad == 7 OR $actividad == null) ? $ninera->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(7, $actividades) ? [7] : 1000 ) : [7] ) )->count() : 0,
        'chofer'       => ($actividad == 8 OR $actividad == null) ? $chofer->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(8, $actividades) ? [8] : 1000 ) : [8] ) )->count() : 0,
        'mayordomo'    => ($actividad == 9 OR $actividad == null) ? $mayordomo->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(9, $actividades) ? [9] : 1000 ) : [9] ) )->count() : 0,
        'cuidadoadulto'=> ($actividad == 10 OR $actividad == null) ? $cuidadoadulto->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(10, $actividades) ? [10] : 1000 ) : [10] ) )->count() : 0,
        'otro'         => ($actividad == 11 OR $actividad == null) ? $otro->whereRaw("FIND_IN_SET(?, actividad_id_naked) > 0", ( $actividades ? (isFindActividad(11, $actividades) ? [11] : 1000 ) : [11] ) )->count() : 0,
        'peruano'      => $peruana->where('nacionalidad_id', 1)->count(),
        'extranjero'   => $extranjero->where('nacionalidad_id', 2)->count(),
        'ambos'        => $ambos->whereIn('nacionalidad_id', [1,2])->count(),
        'desde18a30'   => $desde18a30->whereBetween('edad', [18, 30] )->count(),
        'desde30a45'   => $desde30a45->whereBetween('edad', [31, 45])->count(),
        'mas45'        => $mas40->whereBetween('edad', [46, 150])->count()
    ];


}

function deleteCartSeleccion(){
    session()->forget('cart-seleccion');
}

function saveTrabajadoresCartSeleccion(){

    $cart = session()->get('cart-seleccion');

    if($cart){

        $result = [];

        foreach ($cart as $c){
            array_push($result, $c['id']);
        }

        return json_encode($result);

    }else{
        return null;
    }

}

function getSueldoByFiltros($filtros = null){

    $result = null;

    if($filtros){

        foreach ($filtros as $f){

            if($f['filtro'] == 'sueldo') {
                return $f['valor'];
            }
        }

    }

    return $result;

}

function findValueInFiltro($search, $arreglo){

    $result = null;

    if($arreglo){

        foreach ($arreglo as $key => $val) {

            if ($val['filtro'] == $search) {
                $result = (int)$val['valor'];
            }

        }

    }

    return $result;

}

function getArrayActividadesBySueldo($data){

    $result = [];

    if($data){

        foreach ($data as $d){
            array_push($result, $d->id);
        }
    }

    return $result;

}

function getArrayModalidadesBySueldo($data){

    $result = [];

    if($data){

        foreach ($data as $d){

            $mod = json_decode($d->modalidades_id, true);

            foreach ($mod as $m){
                array_push($result, $m);
            }

        }

        $result = array_unique($result);
    }

    return $result;

}

function isFindActividad($search, $array){

    $result = array_search($search, $array);

    if($result === false){
        return false;
    }else{
        return true;
    }

}

function getSueldoMinimoByActividades(){

    return (int)(Actividad::borrado(false)->min('precio_referencia'));
}

function getFiltrosEdades($filtro){

    $edad18a30 = findValueInFiltro('edad18a30', $filtro);
    $edad31a45 = findValueInFiltro('edad31a45', $filtro);
    $edad46amas = findValueInFiltro('edad46amas', $filtro);

    return $result = array_filter([
        $edad18a30,
        $edad31a45,
        $edad46amas
    ]);

}

function procesarCartAndFiltros($cart, $filtros){

    $cartProcesado = sanearCart($cart);
    $filtrosProcesado = sanearFiltros($filtros);

    $result = [
        'actividad_id' => $cartProcesado['actividad_id'],
        'modalidad_id' => $cartProcesado['modalidad_id'],
        'sueldo' => $filtrosProcesado['sueldo'] ? $filtrosProcesado['sueldo'] : $cartProcesado['sueldo'],
        'nacionalidad_id' => $cartProcesado['nacionalidad_id'],
        'rangoedad_id' => $cartProcesado['rangoedad_id'],
        'trabajadores' => $cart
    ];

    return $result;
}

function sanearCart($cart){

    $arraysActividad = [];
    $arraysModalidad = [];
    $arraysNacionalidad = [];
    $arraysEdad = [];

    $cantidadTrabajadores = count($cart);

    foreach ($cart as $c){

        $arraysActividad[] = $c['actividad_id'];
        $arraysModalidad[] = $c['modalidad_id'];
        $arraysNacionalidad[] = [$c['nacionalidad_id']];

        if(in_range($c['edad'], 18, 30)){
            array_push($arraysEdad, 1);
        }

        if(in_range($c['edad'], 31, 45)){
            array_push($arraysEdad, 2);
        }

        if(in_range($c['edad'], 46, 150)){
            array_push($arraysEdad, 3);
        }

    }

    $commonActividad = $cantidadTrabajadores == 1 ? $arraysActividad[0] : array_intersect(...$arraysActividad);
    $commonModalidad = $cantidadTrabajadores == 1 ? $arraysModalidad[0] : array_intersect(...$arraysModalidad);
    $commonNacionalidad = $cantidadTrabajadores == 1 ? $arraysNacionalidad[0] : array_intersect(...$arraysNacionalidad);
    $commonEdad = array_unique($arraysEdad);

    $act = $commonActividad ? reset($commonActividad) : null;
    $mod = $commonModalidad ? reset($commonModalidad) : null;
    $nac = $commonNacionalidad ? reset($commonNacionalidad) : null;

    $result = [
        'actividad_id' => $act,
        'modalidad_id' => $mod,
        'nacionalidad_id' => $nac,
        'rangoedad_id' => $commonEdad ? (count($commonEdad) == 3 ? [4] : $commonEdad) : [4],
        'sueldo' => ''
    ];

    return $result;
}

function sanearFiltros($filtros){

    $result = [
        'actividad_id' => '',
        'modalidad_id' => '',
        'nacionalidad_id' => '',
        'rangoedad_id' => '',
        'sueldo' => ''
    ];

    if($filtros){

        $edades = [];
        $nacionalidad_id = null;

        $modalidad = findValueInFiltro('modalidad', $filtros);
        $actividad = findValueInFiltro('actividad', $filtros);
        $peruana = findValueInFiltro('peruana', $filtros);
        $extranjero = findValueInFiltro('extranjero', $filtros);
        $sueldo = findValueInFiltro('sueldo', $filtros);
        $edades18a30 = findValueInFiltro('edad18a30', $filtros);
        $edades31a45 = findValueInFiltro('edad31a45', $filtros);
        $edades46amas = findValueInFiltro('edad46amas', $filtros);

        if($edades18a30){
            array_push($edades, $edades18a30);
        }

        if($edades31a45){
            array_push($edades, $edades31a45);
        }

        if($edades46amas){
            array_push($edades, $edades46amas);
        }

        if($peruana AND $extranjero){
            $nacionalidad_id = 3;
        }else if($peruana){
            $nacionalidad_id = 1;
        }else if($extranjero){
            $nacionalidad_id = 2;
        }

        $result['actividad_id'] = $actividad;
        $result['modalidad_id'] = $modalidad;
        $result['nacionalidad_id'] = $nacionalidad_id;
        $result['rangoedad_id'] = $edades ? (count($edades) == 3 ? [4] : $edades ) : null;
        $result['sueldo'] = $sueldo;

    }

    return $result;

}
