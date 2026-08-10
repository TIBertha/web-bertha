<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use App\Models\Contrato;
use App\Models\RedesSociales;
use App\Models\TestimonialEmpleador;
use App\Models\TestimonialTrabajador;
use App\Models\Trabajador;
use App\Models\Views\PrensaView;
use App\Models\Views\TestimonialEmpleadorView;
use App\Models\Views\TestimonialTrabajadorView;
use App\Models\Views\TrabajadorView;
use App\Models\VistasWeb;
use Illuminate\Http\Request;

class WebController extends Controller
{
    public function index(Request $request)
    {
        // Detectar idioma del navegador (primeros 2 caracteres)
        $browserLang = substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);

        // Si es español → es-pe
        // Si es cualquier otro idioma → en-pe
        $lang = ($browserLang === 'es') ? 'es' : 'en';

        return redirect("/{$lang}-pe");
    }

    public function viewPeru($lang)
    {
        countViewWeb("/{$lang}-pe");
        return $this->viewIndex('pe', $lang);
    }

    public function cleanPass(){
        session()->forget('getPass');
    }

    public function viewIndex($country, $lang)
    {
        $data['lang'] = $lang;
        $data['country'] = $country;

        // Guardar país e idioma en sesión
        session()->put('country', $country);
        session()->put('lang', $lang);

        $data['blogs'] = PrensaView::orderBy('num', 'DESC')
            ->whereNotNull('fuente')
            ->get();

        $data['totalBlogs'] = count($data['blogs']);

        $empleadores = Contrato::groupBy('empleador_id')->get('empleador_id','id');
        $data['totalempleadores'] = count($empleadores) + 9763;

        $trabajadores = Contrato::count();
        $data['totaltrabajadores'] = $trabajadores + 29338;

        $data['seoH1'] = [
            'Encuentra Trabajadores del Hogar | Bertha'
        ];

        $data['seoH2'] = [
            'Trabajadoras del Hogar',
            'Empleadas domesticas',
            'Agencia de Empleos domesticos',
            'Agencias de empleo la molina',
            'Agencias de empleos en Perú',
            'Agencias de empleos en Lima',
            'Trabajos tiempo Completo',
            'Trabajos domesticos',
            'Empleos domesticos',
            'Agencia de empleos',
            'Bertha'
        ];

        return view('Web.Index.index', $data);
    }

    public function ajaxGetCountryCode(Request $request){
        $s = session()->get('country');
    }

    public function ajaxGetViews(Request $request)
    {
        $view = VistasWeb::where('url_pathname', '/principal')->firstOrFail();

        $view->increment('num_vistas');

        return response()->json([
            'code'  => 200,
            'views' => number_format($view->num_vistas, 0, ".", ","),
        ]);
    }

    public function condicionesRedirect(Request $request)
    {
        // Detectar idioma del navegador
        $browserLang = substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);

        // Si es español → es-pe
        // Si es cualquier otro idioma → en-pe
        $lang = ($browserLang === 'es') ? 'es' : 'en';

        return redirect("/{$lang}-pe/condiciones");
    }

    public function viewCondiciones(Request $request)
    {
        $country = 'pe';
        $lang = $request->lang ?? session('lang', 'es');

        session()->put('country', $country);
        session()->put('lang', $lang);

        $this->cleanPass();

        return view('Web.condiciones', [
            'country' => $country,
            'lang' => $lang,
        ]);
    }

    public function privacidadRedirect()
    {
        // 1. Si ya hay lang en sesión → usarlo
        $lang = session('lang');

        // 2. Si no hay sesión → detectar navegador
        if (!$lang) {
            $browserLang = substr(request()->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);
            $lang = in_array($browserLang, ['es', 'en']) ? $browserLang : 'es';
            session()->put('lang', $lang);
        }

        // 3. Redirigir a la ruta multilanguage correcta
        return redirect("/{$lang}-pe/privacidad");
    }

    public function viewPrivacidad(Request $request)
    {
        $country = 'pe';
        $lang = $request->lang ?? session('lang', 'es');

        session()->put('country', $country);
        session()->put('lang', $lang);

        return view('Web.privacidad', [
            'country' => $country,
            'lang' => $lang,
        ]);
    }

    public function ajaxGetRedesSociales(){
        $redessociales = RedesSociales::where('activo',1)->get();

        $data = [];

        if ($redessociales){
            foreach ($redessociales as $rs){
                $data[] = [
                    'user_name'         => $rs->user_name,
                    'icon'              => $rs->icon,
                    'link'              => $rs->link
                ];
            }
        }

        return response()->json([
            'code' => 200,
            'redessociales' => $data
        ]);
    }

    public function ajaxDisableModal(){
        session()->put('getPass', 'Ya Funciona');

        return response()->json([
            'code' => 200,
            'message' => 'Valor actualizado'
        ]);
    }

    public function ajaxVerifyDisableModal(){
        $exists = session()->has('getPass');

        return response()->json([
            'exists' => $exists
        ]);
    }

    public function ajaxGetDataPrensa(Request $request){

        $prensa = PrensaView::orderBy('num', 'DESC')->whereNotNull('fuente');

        return response()->json(['code' => 200,
            'prensa' => armarDataBlogs($prensa->get()),
        ]);

    }

    public function ajaxGetTestimonialesEmpleador(){
        $this->cleanPass();

        $testimoniales = TestimonialEmpleador::whereNotNull('imagen_testimonial')->orderBy('fecha','desc')->get();

        $data = [];

        foreach ($testimoniales as $t){
            $data[] = [
                'imagen'                             => $t->imagen_testimonial,
            ];
        }

        return response()->json([
            'code' => 200,
            'testimoniales' => $data
        ]);

    }

    public function ajaxGetTestimonialesTrabajador(){

        $this->cleanPass();

        $testimoniales = TestimonialTrabajador::whereNotNull('imagen')->orderBy('id', 'desc')->get();

        $data = [];

        foreach ($testimoniales as $t){
            $data[] = [
                'imagen'                             => $t->imagen,
            ];
        }

        return response()->json([
            'code' => 200,
            'testimoniales' => $data
        ]);

    }

    public function ajaxGetPostulantesSlider(){
        $this->cleanPass();

        $data = [];

        $postulantes = TrabajadorView::where('estadoid', 1)
            ->whereNotNull('foto')
            ->whereNotNull('nacionalidad_id')
            ->whereNotNull('nombres')
            ->whereNotNull('apellidos')
            ->inRandomOrder()
            ->limit(96)
            ->get();

        foreach ($postulantes as $p){
            $data[] = [
                'foto'                  => $p->foto,
                'nombres'               => mb_convert_case(explode(' ', trim($p->nombres))[0], MB_CASE_TITLE, "UTF-8") . ' ' . strtoupper(substr(explode(' ', trim($p->apellidos))[0], 0, 1)) . '.',
            ];
        }

        return response()->json([
            'code' => 200,
            'data' => $data
        ]);
    }

    public  function cuentaBancariaView()
    {
        $this->cleanPass();

        $lang = session('lang') ?? 'es';
        $country = session('country');

        return view('Web.cuenta-bancaria', [
            'country' => $country,
            'lang' => $lang,
        ]);
    }

}
