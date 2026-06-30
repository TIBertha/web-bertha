<!DOCTYPE html>
<html lang="es" >
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="robots" content="index,follow" />
    @yield('seo')
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Bertha es la agencia de empleos líder en el Perú. Encuentra tu trabajador del hogar en la mejor agencia." />
    <meta property="og:image" content="{{ asset('img/og.png') }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="api-base-url" content="{{ url('/') }}" />

    <!-- <MouseFlow> -->
    @include('Components.mouseflow')

    <!-- <Google Tag Manager> -->
    @include('Components.googletagmanager')

    <!-- <Facebook Domain Verification> -->
    <meta name="facebook-domain-verification" content="c987yu14ziqx4pdbo5erjf8lkxomzf" />

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('img/favicon.png') }}" type="image/x-icon">

    <link rel="stylesheet" href="{{ asset('css/vendor.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    <!-- Vite React -->
    @viteReactRefresh
    @vite(['resources/scss/app.scss', 'resources/js/app.jsx'])

</head>

<body class="no-select-text">

<!-- <Google Tag Manager (noscript)> -->
@include('Components.GTMnoscript')


<section class="main-content total-height py-0">
    @yield('content')
</section>

@yield('javascript')

</body>

</html>
