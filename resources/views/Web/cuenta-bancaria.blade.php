@extends('Layouts.web-template')

@section('seo')
    <title>Bertha | Cuenta Bancaria</title>
    <link rel="canonical" href="{{ route('inicio') }}" />
    <meta property="og:title" content="Bertha | Cuenta Bancaria" />
    <meta property="og:url" content="{{ route('cuenta-bancaria') }}" />
@endsection

@section('content')
    <div id="cuenta-bancaria" data-url="{{ url('/') }}" ></div>
@endsection
