<?php

namespace App\Models;

use App\Models\Views\TrabajadorView;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{

    protected $table = 'usuarios';

    const CREATED_AT = 'creado';
    const UPDATED_AT = 'actualizado';

    protected $hidden = ['password'];
    protected $guarded = [];

    protected $dates = ['fecha_nacimiento'];

    public function scopeBorrado($query, $flag) {
        return $query->where('borrado', $flag);
    }

    public function scopeActivo($query, $flag) {
        return $query->where('activo', $flag);
    }

    public function trabajador(){
        return $this->hasOne('App\Models\Trabajador');
    }

    public function empleador(){
        return $this->hasOne('App\Models\Empleador');
    }

    public function checkPhone(){
        return $this->verificar_telefono;
    }

    public function isTrabajador(){

        $tra = Trabajador::activo(true)->where('usuario_id', $this->id)->first();

        if($tra){
            return true;
        }else{
            return false;
        }
    }

    public function isEmpleador(){

        $emp = Empleador::activo(true)->where('usuario_id', $this->id)->first();

        if($emp){
            return true;
        }else{
            return false;
        }
    }

    public function getTrabajadorID(){

        $tra = Trabajador::activo(true)->where('usuario_id', $this->id)->first();

        if($tra){
            return $tra->id;
        }else{
            return NULL;
        }
    }

    public function getEmpleadorID(){

        $emp = Empleador::activo(true)->where('usuario_id', $this->id)->first();

        if($emp){
            return $emp->id;
        }else{
            return NULL;
        }
    }

    public function getTipoUsuario(){

        return $this->tipo_usuario_login;
    }

    public function getFormReg(){
        $tra = Trabajador::activo(true)->where('usuario_id', $this->id)->first();

        $estado = $tra->estatuspostulante_id == 7 ? true : false;

        return $estado;
    }


    public function getTokenTrabajador(){

        $tra = Trabajador::activo(true)->where('usuario_id', $this->id)->first();

        return $tra ? ( $tra->token ? $tra->token : null ) : null;
    }

}
