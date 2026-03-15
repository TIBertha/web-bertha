@extends('Layouts.web-template')

@section('seo')
    <title>Bertha | Política de Privacidad</title>
    <link rel="canonical" href="{{ route('inicio') }}" />
    <meta property="og:title" content="Bertha | Política de Privacidad" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Bertha es la agencia de empleos líder en el Perú. Encuentra tu trabajador del hogar en la mejor agencia." />
    <meta property="og:url" content="{{ route('condiciones') }}" />
    <meta property="og:image" content="{{ asset('img/og.png') }}" />
@endsection

@section('content')
    <div id="privacidad" data-url="{{ url('/') }}" ></div>
@endsection
