@extends('Layouts.web-template')

@section('seo')
    <title>Bertha | Libro de reclamaciones</title>
    <link rel="canonical" href="{{ route('inicio') }}" />
    <meta property="og:title" content="Bertha | Libro de reclamaciones" />
    <meta property="og:url" content="{{ route('libro-reclamaciones') }}" />
@endsection

@section('content')
    <div id="libro-reclamos" data-url="{{ url('/') }}" ></div>
@endsection
