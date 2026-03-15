@extends('Layouts.web-template')

@section('seo')
    <title>Bertha | Busca tus trabajadoras del hogar</title>
    <link rel="canonical" href="{{ route('inicio') }}" />
    <meta property="og:title" content="Bertha | Busca tus trabajadoras del hogar" />
    <meta property="og:type" content="website" />
    <meta name="description" content="Busca trabajadoras de todo servicio, nana, cuidadora de adulto mayor o enfermera." />
    <meta name="keywords" content="emmpleadas del hogar por dias , empleadas del hogar cama afuera , empleadas del hogar cama adentro , agencia de empleadas del hogar , busco empleada domestica , necesito empleada del hogar , busco empleadas , agencias de empleadas, buscar trabajadoras del hogar , entrevistar a trabajadora del hogar , agencias de empleadas">
    <meta property="og:url" content="{{ route('condiciones') }}" />
    <meta property="og:image" content="{{ asset('img/og.png') }}" />
@endsection

@section('content')
    <div id="seleccion" data-url="{{ url('/') }}" data-session="{{ $checksession }}" data-country="{{$country}}"></div>
@endsection
