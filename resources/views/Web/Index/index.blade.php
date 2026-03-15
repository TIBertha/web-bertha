@extends('Layouts.web-template')

@section('seo')
    <title>Bertha | Trabajadoras del hogar cama adentro, cama afuera y por días</title>
    <link rel="canonical" href="{{ route('inicio') }}" />
    <meta property="og:title" content="Bertha | Trabajadoras del hogar cama adentro, cama afuera y por días" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Bertha es la agencia de empleos líder en el Perú. Encuentra tu trabajador del hogar en la mejor agencia." />
    <meta property="og:url" content="{{ route('inicio') }}" />
    <meta property="og:image" content="{{ asset('img/og.png') }}" />

    <meta name="description" content="Bertha es la agencia de empleos líder en el Perú. Encuentra a trabajadoras del hogar a cama adentro, cama afuera y por días. En 5 minutos selecciona a trabajadoras sin antecedentes, con recomendaciones." />
    <meta name="keywords" content="busco trabajo por horas limpieza, app de limpieza, bertha, limpieza app, nanas de confianza, trabajo por horas en lima, agencia de empleos peru , agencia de empleos lima peru , agencia de empleos en la molina , soy empleada del hogar busco trabajo , empleadas del hogar lima , ofertas de trabajo , agencias de empleadas , busco trabajo en lima , trabajos en lima, agencias de empleadas , trabajos en lima , agencias de empleos , agencias de empleos en lima , agencias de empleos en la molina , agencias de empleos domésticos , agencias de empleos en lima perú , empleadas del hogar , trabajadoras del hogar , agencia de empleadas domesticas , empleada domestica , asistenta de hogar , agencia empleadas domesticas">

    <script type="application/ld+json">
        {
        "@type": "EmploymentAgency",
        "@id": "https://holabertha.com",
        "logo": "https://www.holabertha.com/img/g-logo.png",
        "image": "https://www.holabertha.com/img/ogimage_beec.jpg",
        "priceRange": "S/",
        "name": "Bertha",
        "ethicsPolicy": "https://holabertha.com/privacidad",
        "legalName": "Empleos Residencial La Molina E.I.R.L.",
        "foundingDate": "1968-08-27",
        "member" : {
        "@type": "Person",
        "name": "Jorge Wankun"
        },
        "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenida La Molina 1157 Centro Comercial La Rotonda 1 Of. 124",
        "addressLocality": "La Molina",
        "postalCode": "15024"
        },
        "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "250"
        },
        "openingHours": [
        "Mo-fr 07:00-18:00",
        "Sa 07:00-13:00"
        ],
        "award": "Empresa Peruana del Año 2012",
        "numberOfEmployees" : "5",
        "telephone": "(+51) 999 256 807",
        "email": "gerencia@holabertha.com",
        "url": "http://www.holabertha.com"
    }
    </script>

    <script type="application/ld+json">
        {
        "@type":"ItemList",
        "itemListElement":
        [
        {"@type": "SiteNavigationElement",
        "position": 1,
        "name": "Seleccionar - Perú",
        "description": "Todo servicio, nanas, niñeras, cocineras, enfermeras, choferes y más",
        "url":"https://holabertha.com/es-pe/seleccionar"
        },
        {"@type": "SiteNavigationElement",
        "position": 2,
        "name": "Busco Trabajo - Perú",
        "description": "Empieza a ganar dinero como trabajador del hogar en Bertha. Sueldos altos más beneficios laborales.",
        "url":"https://holabertha.com/es-pe/busco-trabajo"
        },
        {"@type": "SiteNavigationElement",
        "position": 3,
        "name": "Seleccionar - Chile",
        "description": "Todo servicio, nanas, niñeras, cocineras, enfermeras, choferes y más",
        "url":"https://holabertha.com/es-cl/seleccionar"
        },
        {"@type": "SiteNavigationElement",
        "position": 4,
        "name": "Busco Trabajo - Chile",
        "description": "Empieza a ganar dinero como trabajador del hogar en Bertha. Sueldos altos más beneficios laborales.",
        "url":"https://holabertha.com/es-cl/busco-trabajo"
        },
        {"@type": "SiteNavigationElement",
        "position": 5,
        "name": "Términos y Condiciones",
        "description": "Conoce nuestros términos y condiciones aquí",
        "url":"https://holabertha.com/condiciones"
        },
        {"@type": "SiteNavigationElement",
        "position": 6,
        "name": "Política de Privacidad",
        "description": "Conoce nuestras políticas de privacidad",
        "url":"https://holabertha.com/privacidad"
        },
        {"@type": "SiteNavigationElement",
        "position": 7,
        "name": "Brochure",
        "description": "Consigue a trabajadoras del hogar cama adentro, cama afuera y por días",
        "url":"https://holabertha.com/brochure"
        }]
    }
    </script>
@endsection

@section('content')

    @if($seoH1)
        @foreach($seoH1 as $s)
            <h2 class="seo-h1" hidden>{{$s}}</h2>
        @endforeach
    @endif

    @if($seoH2)
        @foreach($seoH2 as $s)
            <h2 class="seo-h2" hidden>{{$s}}</h2>
        @endforeach
    @endif

    <div id="index" data-url="{{ url('/') }}" data-num="{{($totaltrabajadores)}}" data-country="{{$country}}"></div>

@endsection
