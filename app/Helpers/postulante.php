<?php

function getDisponibilidadTrabajador($fechaactualizado){

    $result = null;

    $actualizado = \Carbon\Carbon::parse($fechaactualizado);

    $fechaactual = \Carbon\Carbon::now();

    $difference = ($actualizado->diff($fechaactual)->days);

    if($difference >= 0 AND $difference <= 15){
        $result = 'A';
    }else if($difference > 15 AND $difference <= 30){
        $result = 'M';
    }else if($difference > 30){
        $result = 'B';
    }

    return $result;
}
