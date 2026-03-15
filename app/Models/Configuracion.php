<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    protected $table = 'configuraciones';

    const CREATED_AT = 'creado';
    const UPDATED_AT = 'actualizado';

    protected $guarded = [];

    public static function add($key, $val)
    {
        if ( self::has($key) ) {
            return self::set($key, $val);
        }

        return self::create(['nombre' => $key, 'valor' => $val]) ? $val : false;
    }

    public static function get($key, $default = null)
    {
        if ( self::has($key) ) {

            $setting = self::getAllSettings()->where('nombre', $key)->first();
            return $setting->valor;
        }

        return self::getDefaultValue($key, $default);
    }

    public static function set($key, $val)
    {
        if ( $setting = self::getAllSettings()->where('nombre', $key)->first() ) {
            return $setting->update([
                'nombre' => $key,
                'valor'  => $val]) ? $val : false;
        }

        return self::add($key, $val);
    }

    public static function remove($key)
    {
        if( self::has($key) ) {
            return self::whereNombre($key)->delete();
        }

        return false;
    }

    public static function has($key)
    {
        return (boolean) self::getAllSettings()->whereStrict('nombre', $key)->count();
    }

    private static function getDefaultValue($key, $default)
    {
        return is_null($default) ? null : $default;
    }

    public static function getAllSettings()
    {
        return self::all();
    }

}
