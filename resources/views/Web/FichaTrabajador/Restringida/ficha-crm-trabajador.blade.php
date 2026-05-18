@extends('Layouts.outside-template')

@section('seo')

    <title>Bertha | Ficha {{$nombreTrabajadora}}</title>
    <meta property="og:title" content="Bertha | Ficha {{$nombreTrabajadora}}" />

    @if($videoYoutube)
        <meta property="og:video:url" content="{{ $videoYoutube }}">
        <meta property="og:video:secure_url" content="{{ $videoYoutube }}">
        <meta property="og:video:type" content="text/html">
        <meta property="og:video:width" content="1280">
        <meta property="og:video:height" content="720">
    @endif

    @if($foto)
        <meta property="og:image" content="{{ $foto }}" />
    @else
        <meta property="og:image" content="{{ asset('img/og.png') }}" />
    @endif

@endsection

@section('content')

    <div>
        <div id="ficha-restringida-trabajador-index" data-url="{{ url('/') }}" data-token="{{ $token }}" data-usuario="{{ $usuario }}" data-accessverif="1"></div>
    </div>

@endsection

@section('cintillo')

    @component('Components.cintillo')
        @slot('background')
            pink
        @endslot
        @slot('telefono')
            tiempocompleto2
        @endslot
        @slot('texto')
            Solicita también a tu trabajadora del hogar vía WhatsApp, escribiendo al
        @endslot
    @endcomponent

@endsection
