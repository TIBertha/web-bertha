<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateReclamo extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'data.nombres'           => ['required', 'string'],
            'data.apellidos'         => ['required', 'string'],
            'data.documento'         => ['required', 'string'],
            'data.direccion'         => ['required', 'string'],
            'data.correo'            => ['required', 'email'],
            'data.telefono'          => ['required', 'string'],
            'data.bien'              => ['required'],
            'data.tipo'              => ['required'],
            'data.fechaincidente'    => ['required'],
            'data.lugarincidente'    => ['required'],
            'data.detalle'           => ['required'],
            'data.pedido'            => ['required'],
            'data.politica'          => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'data.nombres.required'          => 'El nombre es requerido',
            'data.apellidos.required'        => 'El apellido es requerido',
            'data.documento.required'        => 'El DNI es requerido',
            'data.direccion.required'        => 'El domicilio es requerido',
            'data.correo.required'           => 'El correo es requerido',
            'data.correo.email'              => 'Ingrese un correo válido',
            'data.telefono.required'         => 'El teléfono es requerido',
            'data.bien.required'             => 'Debe seleccionar un bien',
            'data.tipo.required'             => 'Debe seleccionar qué tipo de reclamo desea realizar',
            'data.fechaincidente.required'   => 'Debe indicar la fecha del incidente',
            'data.lugarincidente.required'   => 'Debe indicar el lugar del incidente',
            'data.detalle.required'          => 'El detalle del incidente es requerido',
            'data.pedido.required'           => 'El pedido es requerido',
            'data.politica.accepted'         => 'Debe aceptar la declaración jurada',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json($validator->errors()->first(), 422)
        );
    }
}

