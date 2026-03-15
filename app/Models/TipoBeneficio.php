<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoBeneficio extends Model
{
    protected $table = 'tipos_beneficios';

    const CREATED_AT = 'creado';
    const UPDATED_AT = 'actualizado';
}
