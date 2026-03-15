<?php

use App\Models\Usuario;
use App\Models\Empleador;
use App\Models\Views\EmpleadorView;
use App\Models\Views\TrabajadorView;

function checkTipoUsuario($tipousuario, $usuario_id){

    if($tipousuario == 'cli'){

        $emp = EmpleadorView::where('usuario_id', $usuario_id)->first();

        if($emp){
            return true;
        }else{
            return false;
        }


    }else if($tipousuario == 'tra'){

        $tra = TrabajadorView::where('usuario_id', $usuario_id)->first();

        if($tra){
            return true;
        }else{
            return false;
        }
    }
}

function showName($userID){
    return '¡Hola, '.formatTextFirstCharacterToUpper($userID->nombres).'!';
}

function getEmpleadorID($userID){

    $emp = Empleador::activo(true)->where('usuario_id', $userID)->first();

    if($emp){
        return $emp->id;
    }else{
        return NULL;
    }
}

function findTypeLogin($usuario, $tipo = 'cli'){

    $newUsuario = str_replace(' ', '', $usuario);

    $user = Usuario::where('correo', $newUsuario)->whereIn('cuenta', ['BERTHA'])->first();

    if($user){

        $usuario_id = $user->id;

        $checkTipoUsuario = checkTipoUsuario($tipo, $usuario_id);

        if($checkTipoUsuario){
            return $user;
        }else{
            return NULL;
        }

    }else{

        $userTel = Usuario::where('telefono', $newUsuario)->whereIn('cuenta', ['BERTHA'])->first();

        if($userTel){

            $usuario_id = $userTel->id;

            $checkTipoUsuario = checkTipoUsuario($tipo, $usuario_id);

            if($checkTipoUsuario){
                return $userTel;
            }else{
                return NULL;
            }

        }else{
            return NULL;
        }

    }

}
