<?php

namespace App\Http\Requests;

use App\Models\Views\TrabajadorView;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateRegistroPostulante extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $trabajador = $this->input('data');
        $traID      = $trabajador['id'] ?? null;
        $tra        = $traID ? TrabajadorView::find($traID) : null;

        $numeroDocumento = $trabajador['numero_documento'] ?? null;
        $caracteresND    = strlen($numeroDocumento ?? '');

        // Regla base
        $ND = 'nullable';

        // Si tiene 7+ caracteres, aplicar unique
        if ($caracteresND >= 7 && $tra) {
            $ND = 'nullable|unique:usuarios,numero_documento,' . $tra->usuario_id . ',id';
        }

        return [
            'data.numero_documento' => $ND,
        ];
    }

    public function messages(): array
    {
        return [
            'data.correo.required'            => 'El correo es requerido',
            'data.correo.email'               => 'Ingrese un correo valido',
            'data.correo.unique'              => 'El correo ingresado ya se encuentra en uso. Intente con otro',
            'data.numero_documento.required'  => 'El número de documento es requerido',
            'data.numero_documento.unique'    => 'El número de documento ingresado ya se encuentra registrado',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json($validator->errors()->first(), 422)
        );
    }
}

