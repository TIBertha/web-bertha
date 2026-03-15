<?php

use App\Models\Reclamo;
use App\Models\Empleador;
use App\Models\RequerimientoLink;
use App\Models\HistorialToken;
use Carbon\Carbon;

function almacenarToken($token, $usuario, $tipo){
    if ($token){
        $dataToken = [
            'usuario_id'        => $usuario,
            'token'             => $token,
            'tipo'              => $tipo,
            'creado'            => Carbon::now(),
            'actualizado'       => Carbon::now(),
        ];
        $exito = HistorialToken::create($dataToken);
        return json_encode(['code' => 200]);
    } else{
        return json_encode(['code' => 500]);
    }
}

function generateTokenEmpleador($nombres, $apellidos){

    $result = null;

    if($nombres AND $apellidos){

        $arrayNombres = explode(' ', $nombres);
        $arrayApellidos = $apellidos ? explode(' ', $apellidos) : ['null'];
        $sectionName= cleaner(strtolower($arrayNombres[0])) . '-' .substr(cleaner(strtolower($arrayApellidos[0])), 0, 1);

        do {
            $token = Str::random(6);

            $result = $sectionName . '-' .$token;

        } while ( Empleador::where("token", $token)->first() );

    }

    return $result;
}

function generateTokenReclamo($nombres, $apellidos){

    $result = null;

    if($nombres AND $apellidos){

        $arrayNombres = explode(' ', $nombres);
        $arrayApellidos = $apellidos ? explode(' ', $apellidos) : ['null'];
        $sectionName= cleaner(strtolower($arrayNombres[0])) . '-' .substr(cleaner(strtolower($arrayApellidos[0])), 0, 1);

        do {
            $token = Str::random(6);

            $result = $sectionName . '-' .$token;

        } while ( Reclamo::where("token", $token)->first() );

    }

    return $result;
}

function generarTokenFormRequerimiento(){

    do {
        $token = Str::random(10);
    } while ( RequerimientoLink::where("token", $token)->first() );

    return $token;
}
