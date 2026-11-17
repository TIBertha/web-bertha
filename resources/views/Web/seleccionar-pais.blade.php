@extends('Layouts.outside-template')

@section('seo')
    <title>Bertha | Selecciona dónde necesitas el servicio</title>

    <meta
        name="description"
        content="Selecciona dónde necesitas una trabajadora del hogar: Lima, Perú o Ciudad de México, México."
    />
@endsection

@section('content')
    <div
        id="seleccionar-pais"
        data-url="{{ url('/') }}"
        data-lang="{{ $lang }}"
        data-countries="{{ json_encode(config('regions.countries')) }}"
    ></div>
@endsection
