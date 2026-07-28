<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trabajador extends Model
{
    protected $table = 'trabajadores';

    const CREATED_AT = 'creado';
    const UPDATED_AT = 'actualizado';

    protected $guarded = [];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'id');
    }

    public function scopeBorrado($query, $flag) {
        return $query->where('borrado', $flag);
    }

    public function scopeActivo($query, $flag) {
        return $query->where('activo', $flag);
    }

}
