@extends('Layouts.web-template')

@section('seo')
    <title>Bertha | Términos y Condiciones</title>
    <link rel="canonical" href="{{ route('inicio') }}" />
    <meta property="og:title" content="Bertha | Términos y Condiciones" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Bertha es la agencia de empleos líder en el Perú. Encuentra tu trabajador del hogar en la mejor agencia." />
    <meta property="og:url" content="{{ route('condiciones') }}" />
    <meta property="og:image" content="{{ asset('img/og.png') }}" />
@endsection

@section('content')
    <div id="terminos-condiciones" data-url="{{ url('/') }}" data-country="{{$country}}"></div>
@endsection
