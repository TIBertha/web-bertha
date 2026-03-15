<?php

use Carbon\Carbon;

function formatDataRegistroPostulante($data){

    $result = [];

    if($data){

        $defaultContactos[] = [
            'nombre' => '',
            'telefono' => '',
            'parentesco' => ''
        ];

        $nuVa = $data->tiene_vacuna != null ? (intval($data->tiene_vacuna) == 0 ? '0' : strval($data->tiene_vacuna)) : null;
        $tieneVacuna = $data->tiene_vacuna != null ? convertToFormatSelectRegistroPostulante($nuVa, 'tiene_vacuna') : null;

        $result = [
            'id'                   => $data->id,
            'postulando_pais_id'   => $data->postulando_pais_id,
            'nombreWhatsApp'       => convertNameToWhatsAppEncoded($data->trabajador),
            'nombres'              => $data->nombres,
            'apellidos'            => $data->apellidos,
            'genero_id'            => convertToFormatSelectRegistroPostulante($data->genero_id, 'genero'),
            'fechanacimiento'      => $data->fecha_nacimiento ? Carbon::parse($data->fecha_nacimiento) : null,
            'tipodocumento_id'     => convertToFormatSelectRegistroPostulante($data->tipodocumento_id, 'tipo_documento'),
            'numero_documento'     => $data->numero_documento,
            'estadocivil_id'       => convertToFormatSelectRegistroPostulante($data->estadocivil_id, 'estado_civil'),
            'telefono'             => $data->telefono,
            'telefono_whatsapp'    => $data->telefono_whatsapp,
            'correo'               => $data->correo,
            'numero_hijos'         => $data->numero_hijos == 0 ? ['label' => '0', 'value' => 0] : ($data->numero_hijos ? convertToFormatSelectRegistroPostulante($data->numero_hijos, 'numero_hijos') : null),
            'edad_hijos'           => $data->edad_hijos ? $data->edad_hijos : null,
            'nacionalidad_id'      => $data->nacionalidad_id,
            'pais_id'              => convertToFormatSelectRegistroPostulante($data->pais_id, 'pais'),
            'lugar_nacimiento'     => $data->lugarnacimiento,
            'departamentonacimiento_id' => convertToFormatSelectRegistroPostulante($data->departamentonacimiento_id, 'departamento'),
            'distrito_id'          => convertToFormatSelectRegistroPostulante($data->distrito_id, 'distrito'),
            'direccion'            => $data->direccion,
            'idioma_id'            => $data->idioma_id ? convertToFormatSelectRegistroPostulante($data->idioma_id, 'idioma') : [['label' => 'ESPAÑOL', 'value' => 4]],
            'actividad_id'         => $data->actividad_id ? convertToFormatSelectRegistroPostulante($data->actividad_id, 'actividad', $data->postulando_pais_id) : null,
            'modalidad_id'         => convertToFormatSelectRegistroPostulanteModalidad($data->cama_adentro, $data->cama_afuera, $data->por_horas, $data->postulando_pais_id),
            'foto'                 => $data->foto ? $data->foto : null,
            'foto_documento_delantera' => $data->foto_documento_delantera ?: null,
            'foto_documento_posterior' => $data->foto_documento_posterior ?: null,
            'foto_licencia_delantera' => $data->foto_licencia_delantera ?: null,
            'foto_licencia_posterior' => $data->foto_licencia_posterior ?: null,
            'video_introduccion'   => $data->videointroduccion ?: null,
            'firma'                => $data->firma ?: null,
            'tuvo_covid'           => $data->tuvo_covid ? convertToFormatSelectRegistroPostulante($data->tuvo_covid, 'tuvo_covid') : null,
            'tiene_vacuna'         => $tieneVacuna,
            'adjunto_prueba_covid' => $data->adjunto_prueba_covid ? json_decode($data->adjunto_prueba_covid, true) : null,
            'adjunto_cartilla_vacuna' => $data->adjunto_cartilla_vacuna ?: null,
            'recibos'              => $data->recibos ?: null,
            'contactos'            => ($data->contactos AND $data->contactos != '[]') ? convertFormatSingleContactos($data->contactos) : $defaultContactos,
            'verificaciones_laborales' => ($data->verificaciones_laborales AND $data->verificaciones_laborales != '[]') ? convertFormatSingleVerificacionesLaborales($data->verificaciones_laborales) : [],
            'niveleducativo_id'    => $data->niveleducativo_id ? convertToFormatSelectRegistroPostulante($data->niveleducativo_id, 'niveleducativo', $data->postulando_pais_id) : null,
            'adjunto_educacion'    => $data->adjunto_educacion ? convertFormatSingleAdjuntoEducacion($data->adjunto_educacion) : []
        ];

    }

    return $result;
}

function convertFormatSingleContactos($data){

    $result = null;

    if($data){

        $r = [];

        foreach(json_decode($data, true) as $key => $value){

            if(array_filter($value)){

                $arreglo = [
                    'nombre' => $value['nombre'],
                    'telefono' => (string)$value['telefono'],
                    'parentesco' => convertToFormatSelectRegistroPostulante($value['parentesco'], 'parentesco')
                ];

                array_push($r, $arreglo);
            }

        }

        $result = $r;
    }

    return $result;

}

function convertFormatSingleVerificacionesLaborales($data){

    $result = null;

    if($data){

        foreach(json_decode($data, true) as $d){

            if(array_filter($d)){

                if($d['distrito']){

                    $distrito = \App\Models\Distrito::find($d['distrito']);
                    $provincia = \App\Models\Provincia::find($distrito->provincia_id);
                    $departamento = \App\Models\Departamento::find($provincia->departamento_id);

                    $distritoObject = [
                        'label' => ($distrito->nombre) . ' - ' . ($provincia->nombre) . ' - ' . ($departamento->nombre),
                        'value' => $distrito->id
                    ];

                }else{
                    $distritoObject = NULL;
                }

                if($d['actividad']){

                    $actividadObject = convertToFormatMultiselectActividad($d['actividad']);

                }else{
                    $actividadObject = NULL;
                }

                $result[] = [
                    "nombre" => $d['nombre'] ?? '',
                    "apellidos" => $d['apellidos'] ?? '',
                    "departamento" => null,
                    "provincia" => null,
                    "distrito" => $distritoObject ?? (object)[],
                    "telefono" => $d['telefono'] ?? '',
                    "inicioLabores" => $d['inicioLabores'] ?? '',
                    "finLabores" => $d['finLabores'] ?? '',
                    "actividad" => $actividadObject ?? (object)[],
                    "tiempo" => $d['tiempo'] ?? '',
                    "motivoretiro" => $d['motivoretiro'] ?? '',
                    "verificado" => $d['verificado'] ?? false,
                    "adjuntos" => $d['adjuntos'] ?? [],
                    "adjuntosrecomendaciones" => $d['adjuntosrecomendaciones'] ?? []
                ];

            }

        }

    }

    return ($result == [] ? NULL : $result);

}

function convertFormatSingleAdjuntoEducacion($data){

    $result = [];

    if($data){

        foreach(json_decode($data, true) as $d){

            $result[] = [
                "tipocertificado"   => $d['tipocertificado'] ? convertToFormatSelectRegistroPostulante($d['tipocertificado'], 'tipocertificado') : null,
                "centro"            => $d['centro'] ?? '',
                "titulo"            => $d['titulo'] ?? '',
                "fechainicio"       => $d['fechainicio'] ?? '',
                "fechafin"          => $d['fechafin'] ?? '',
                "tiempo"            => $d['tiempo'] ?? '',
                "adjuntos"          => $d['adjuntos'] ?? []

            ];

        }
    }

    return ( ($result == []) ? [] : $result);

}

function getSueldoPromedio($actividades, $camaadentro, $camaafuera, $pordias){

    $sueldos = [];

    if($camaadentro OR $camaafuera){

        if($camaadentro){

            foreach (json_decode($actividades, true) as $a){

                $act = \App\Models\Actividad::find($a);
                array_push($sueldos, (int)$act->precio_referencia);

            }

            $maxSueldo = max($sueldos);

            return ($maxSueldo ? $maxSueldo : null);

        }else if($camaafuera){

            foreach (json_decode($actividades, true) as $a){

                $act = \App\Models\Actividad::find($a);
                array_push($sueldos, (int)$act->precio_referencia_cf);

            }

            $maxSueldo = max($sueldos);

            return ($maxSueldo ? $maxSueldo : null);

        }

    }else if($pordias){
        return null;
    }

}

function saveCambioEstatusPostulante($trabajadorid, $estatus){

    return \App\Models\CambioEstatusTrabajador::create([
        'trabajador_id'           => $trabajadorid,
        'estatuspostulante_id'    => $estatus,
    ]);

}
