<?php

use Carbon\Carbon;

function formatDataRegistroRequerimiento($data, $placeholder, $sueldoActividad){

    $result = [];

    $valueCero = [
        'label' => mb_convert_case(0, MB_CASE_TITLE, "UTF-8"),
        'value' => 0,
    ];

    if($data){

        $paispedido = $data->paispedido_id;

        $result = [
            'id'                      => $data->id,
            'input_domicilio'         => $data->input_domicilio,
            'actividad_id'            => $data->actividad_id ? convertToFormatSelectRegistroRequerimiento($data->actividad_id, 'actividad', $paispedido) : '',
            'modalidad_id'            => $data->modalidad_id ? convertToFormatSelectRegistroRequerimiento($data->modalidad_id, 'modalidad', $paispedido) : '',
            'nacionalidad_id'         => $data->nacionalidad_busqueda ?convertToFormatSelectRegistroRequerimiento($data->nacionalidad_busqueda, 'nacionalidad') : '',
            'sueldo'                  => $data->sueldo,
            'rangominimo'             => $data->rangoedad_id ? getCampoRangoEdades($data->rangoedad_id, 'rangominimo') : '',
            'rangomaximo'             => $data->rangoedad_id ? getCampoRangoEdades($data->rangoedad_id, 'rangomaximo') : '',
            'placeHolderSueldo'       => $placeholder,
            'sueldoActividad'         => $sueldoActividad,
            'ubicacion_id'            => $data->distrito_id ? convertToFormatSelectRegistroRequerimiento($data->distrito_id, 'ubicacion') : '',
            'tipoVivienda_id'         => $data->tipovivienda_id ? convertToFormatSelectRegistroRequerimiento($data->tipovivienda_id, 'tipoVivienda') : '',
            'numeroPisos'             => convertToFormatSelectNumeroPisos($data->numero_pisos, $data->tipovivienda_id),
            'numeroBebes'             => convertToFormatSelectRegistroRequerimiento($data->numero_bebes),
            'numeroNinos'             => convertToFormatSelectRegistroRequerimiento($data->numero_ninos),
            'numeroAdultos'           => convertToFormatSelectRegistroRequerimiento($data->numero_adultos),
            'numeroMascotas'          => $data->numero_mascotas != 0 ? convertToFormatSelectRegistroRequerimiento($data->numero_mascotas) : $valueCero,
            'edadBebes'               => $data->edad_bebe ? convertToTags($data->edad_bebe) : [],
            'edadNinos'               => $data->edad_nino ? convertToTags($data->edad_nino) : [],
            'edadAdultos'             => $data->edad_adulto ? convertToTags($data->edad_adulto) : [],
            'tipoDescanso_id'         => convertToFormatSelectTipoDescanso($data->tiempo_cuarentena ?: 9),
            'diaSalida'               => convertToFormatSelectRegistroRequerimiento($data->dia_salida ?: 6, 'dia'),
            'diaIngreso'              => convertToFormatSelectRegistroRequerimiento($data->dia_ingreso ?: 1, 'dia'),
            'horaSalida'              => convertToFormatSelectHour($data->hora_salida ?: '1997-07-21 13:00:00'),
            'horaIngreso'             => convertToFormatSelectHour($data->hora_ingreso ?: '1997-07-21 07:00:00'),
            'tipoBeneficio_id'        => $data->tipobeneficio_id ? convertToFormatSelectRegistroRequerimiento($data->tipobeneficio_id, 'tipoBeneficio') : '',
            'fechaInicioLabores'      => $data->fecha_inicio_labores ?: '',
            'fechaEntrevista'         => $data->fecha_entrevista ?: '',
            'horaEntrevista'          => $data->hora_entrevista ? convertToFormatSelectHour($data->hora_entrevista) : null,
            'paispedido_id'           => $data->paispedido_id ?: null,
            'divisa'                  => $data->paispedido_id == 11 ? 'CLP $ ' : 'PEN S/ '
        ];

    }

    return $result;

}

function resolverActividad($data)
{
    $actividad = $data['actividad_id']['value'] ?? null;

    // Helpers locales
    $listaNinos   = $data['edadNinos']   ? json_encode($data['edadNinos'])   : null;
    $listaAdultos = $data['edadAdultos'] ? json_encode($data['edadAdultos']) : null;
    $listaBebes   = $data['edadBebes']   ? json_encode($data['edadBebes'])   : null;

    return match ($actividad) {

        // ⭐ Actividad 1 y 5
        1, 5 => [
            'tipovivienda_id'          => $data['tipoVivienda_id']['value'] ?? null,
            'numero_pisos'             => $data['numeroPisos']['value'] ?? null,
            'numero_adultos'           => $data['numeroAdultos']['value'] ?? null,
            'numero_ninos'             => $listaNinos ? countList($listaNinos) : null,
            'edad_nino'                => $listaNinos,
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,
            'cantidad_persona_atender' => ($data['numeroAdultos']['value'] ?? 0) + ($listaNinos ? countList($listaNinos) : 0),

            'numero_bebes'             => null,
            'edad_adulto'              => null,
            'edad_bebe'                => null,
        ],

        // ⭐ Actividad 2
        2 => [
            'numero_adultos'           => $data['numeroAdultos']['value'] ?? null,
            'numero_ninos'             => $listaNinos ? countList($listaNinos) : null,
            'edad_nino'                => $listaNinos,
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,
            'cantidad_persona_atender' => ($data['numeroAdultos']['value'] ?? 0) + ($listaNinos ? countList($listaNinos) : 0),

            'edad_adulto'              => null,
            'edad_bebe'                => null,
            'numero_pisos'             => null,
        ],

        // ⭐ Actividad 3 y 10
        3, 10 => [
            'numero_adultos'           => $listaAdultos ? countList($listaAdultos) : null,
            'edad_adulto'              => $listaAdultos,
            'cantidad_persona_atender' => $listaAdultos ? countList($listaAdultos) : null,
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,

            'edad_bebe'                => null,
            'edad_nino'                => null,
            'numero_pisos'             => null,
            'numero_bebes'             => null,
            'numero_ninos'             => null,
        ],

        // ⭐ Actividad 4
        4 => [
            'tipovivienda_id'          => $data['tipoVivienda_id']['value'] ?? null,
            'numero_pisos'             => $data['numeroPisos']['value'] ?? null,
            'numero_ninos'             => $listaNinos ? countList($listaNinos) : null,
            'edad_nino'                => $listaNinos,
            'cantidad_persona_atender' => $listaNinos ? countList($listaNinos) : null,
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,

            'edad_adulto'              => null,
            'edad_bebe'                => null,
            'numero_adultos'           => null,
            'numero_bebes'             => null,
        ],

        // ⭐ Actividad 6
        6 => [
            'numero_ninos'             => $listaNinos ? countList($listaNinos) : null,
            'edad_nino'                => $listaNinos,
            'cantidad_persona_atender' => $listaNinos ? countList($listaNinos) : null,
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,

            'edad_bebe'                => null,
            'edad_adulto'              => null,
            'numero_bebes'             => null,
            'numero_pisos'             => null,
            'numero_adultos'           => null,
        ],

        // ⭐ Actividad 7
        7 => [
            'numero_ninos'             => $listaNinos ? countList($listaNinos) : null,
            'edad_nino'                => $listaNinos,
            'cantidad_persona_atender' => $listaNinos ? countList($listaNinos) : null,
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,

            'edad_adulto'              => null,
            'edad_bebe'                => null,
            'numero_pisos'             => null,
            'numero_adultos'           => null,
            'numero_bebes'             => null,
        ],

        // ⭐ Actividad 8
        8 => [
            'numero_adultos'           => $data['numeroAdultos']['value'] ?? null,
            'numero_ninos'             => $data['numeroNinos']['value'] ?? null,
            'cantidad_persona_atender' => ($data['numeroAdultos']['value'] ?? 0) + ($data['numeroNinos']['value'] ?? 0),
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,

            'edad_adulto'              => null,
            'edad_bebe'                => null,
            'edad_nino'                => null,
            'numero_pisos'             => null,
            'numero_bebes'             => null,
        ],

        // ⭐ Actividad 9
        9 => [
            'numero_pisos'             => $data['numeroPisos']['value'] ?? null,
            'numero_adultos'           => $data['numeroAdultos']['value'] ?? null,
            'numero_ninos'             => $listaNinos ? countList($listaNinos) : null,
            'edad_nino'                => $listaNinos,
            'numero_mascotas'          => $data['numeroMascotas']['value'] ?? 0,
            'cantidad_persona_atender' => ($data['numeroAdultos']['value'] ?? 0) + ($listaNinos ? countList($listaNinos) : 0),

            'edad_bebe'                => null,
            'edad_adulto'              => null,
        ],

        // ⭐ Actividad 10
        default => [],
    };
}

function resolverModalidad($data)
{
    $modalidad = $data['modalidad_id']['value'] ?? null;

    return match ($modalidad) {

        // ⭐ Modalidad 1 — Cama dentro
        1 => [
            'tiempo_cuarentena'       => $data['tipoDescanso_id']['value'] ?? null,
            'dia_ingreso'             => $data['diaIngreso']['value'] ?? null,
            'dia_salida'              => $data['diaSalida']['value'] ?? null,
            'hora_ingreso'            => $data['hora_ingreso'] ? Carbon::parse($data['hora_ingreso']) : null,
            'hora_salida'             => $data['hora_salida'] ? Carbon::parse($data['hora_salida']) : null,
            'dia_descanso_camadentro' => $data['diaDescansoCamaDentro'] ? strtoupper($data['diaDescansoCamaDentro']) : null,
            'sueldo'                  => $data['sueldo'] ?? null,

            'horarios'                => null,
            'frecuenciaservicio_id'   => null,
            'valor_dia_frecuencia'    => null,
        ],

        // ⭐ Modalidad 2 — Cama afuera
        2 => [
            'horarios'                => $data['horarios'] ?? null,
            'sueldo'                  => $data['sueldo'] ?? null,

            'tiempo_cuarentena'       => null,
            'dia_ingreso'             => null,
            'dia_salida'              => null,
            'hora_ingreso'            => null,
            'hora_salida'             => null,
            'dia_descanso_camadentro' => null,
            'frecuenciaservicio_id'   => null,
            'valor_dia_frecuencia'    => null,
        ],

        // ⭐ Modalidad 3 — Por días
        3 => function () use ($data) {

            if ($data['frecuencia']) {
                $frecuencia = $data['frecuencia']['value'];
                $sueldoPorDias = $frecuencia < 4
                    ? ($data['sueldo'] * 12)
                    : (($data['sueldo'] * $frecuencia) * 12);
            } else {
                $sueldoPorDias = $data['sueldo'] ?? null;
            }

            return [
                'horarios'                => $data['horarios'] ?? null,
                'frecuenciaservicio_id'   => $data['frecuencia']['value'] ?? null,
                'sueldo'                  => $sueldoPorDias,
                'valor_dia_frecuencia'    => $data['sueldo'] ?? null,

                'tiempo_cuarentena'       => null,
                'dia_ingreso'             => null,
                'dia_salida'              => null,
                'hora_ingreso'            => null,
                'hora_salida'             => null,
                'dia_descanso_camadentro' => null,
            ];
        },

        default => [],
    };
}
