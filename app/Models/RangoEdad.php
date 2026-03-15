<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RangoEdad extends Model
{
    protected $table = 'rangos_edades';

    const CREATED_AT = 'creado';
    const UPDATED_AT = 'actualizado';

    protected $fillable = ['nombre'];

    public function scopeBorrado($query, $flag) {
        return $query->where('borrado', $flag);
    }

}
