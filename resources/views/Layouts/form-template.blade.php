<!DOCTYPE html>
<html lang="es" >
<head>
    <meta charset="UTF-8" />

    @yield('seo')
    <meta property="og:image" content="{{ asset('img/og.png') }}" />

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('img/favicon.png') }}" type="image/x-icon">

    <link rel="stylesheet" href="{{ asset('css/vendor.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    <!-- Vite React -->
    @viteReactRefresh
    @vite(['resources/scss/app.scss', 'resources/js/app.jsx'])

</head>

<body class="no-select-text form-template">
@yield('content')

@yield('javascript')

</body>

</html>
