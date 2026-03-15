<?php

use App\Models\CambioEstatusTrabajador;
use App\Models\Trabajador;

function countViewFicha($token){
    Trabajador::where('token', $token)->increment('num_vistas');
}

function isCurriculoNew($trabajadorid)
{
    $hasStatus = CambioEstatusTrabajador::borrado(false)
        ->where('trabajador_id', $trabajadorid)
        ->where('estatuspostulante_id', 1)
        ->exists();

    return !$hasStatus;
}

