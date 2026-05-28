@extends('Layouts.outside-template')

@section('seo')

    <title>Bertha | Ver Antecedente</title>
    <meta property="og:title" content="Bertha | Ver Antecedente" />

@endsection

@section('content')

    <div id="ver-antecedente" data-pdflink="{{ $pdflink }}"></div>

@endsection
