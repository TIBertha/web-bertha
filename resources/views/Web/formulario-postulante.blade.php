@extends('Layouts.form-template')

@section('seo')

    <title>Bertha | Consigue a trabajadoras del hogar</title>
    <meta name="description" content="Consigue a trabajadoras del hogar cama adentro, cama afuera y por días." />

@endsection

@section('content')
    <div class="row mx-0 form-div justify-content-center">
        <div class="col-11 col-md-8 col-lg-6 ret-a px-0 mx-auto mb-auto m-md-auto">
            <div id="registro-postulante" data-url="{{ url('/') }}" data-token="{{ $token }}" data-usuario="{{ $usuario }}" data-typeform="{{ '' }}" data-version="{{ 'edit' }}"></div>
        </div>
    </div>
@endsection
