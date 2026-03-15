<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VistasWeb extends Model
{
    protected $table = 'vistas_web';
    const CREATED_AT = 'creado';
    const UPDATED_AT = 'actualizado';

    protected $guarded = ['num_vistas'];

    public function scopeBorrado($query, $flag) {
        return $query->where('borrado', $flag);
    }
}
