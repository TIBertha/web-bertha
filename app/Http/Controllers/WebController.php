<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use App\Models\Contrato;
use App\Models\RedesSociales;
use App\Models\TestimonialEmpleador;
use App\Models\TestimonialTrabajador;
use App\Models\Views\PrensaView;
use App\Models\Views\TestimonialEmpleadorView;
use App\Models\Views\TestimonialTrabajadorView;
use App\Models\VistasWeb;
use Illuminate\Http\Request;

class WebController extends Controller
{
    public function index()
    {
        return redirect('/es-pe');
    }

    public function viewPeru(){
        countViewWeb('/es-pe');
        return $this->viewIndex('pe');
    }

    public function cleanPass(){
        session()->forget('getPass');
    }

    public function viewIndex($country){

        $data['country'] = $country;

        $s = session()->get('country');

        session()->forget('country');
        session()->put('country', $country);

        $data['blogs'] = PrensaView::orderBy('num', 'DESC')->whereNotNull('fuente')->get();

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
        $s = $s = session()->get('country');
        dd($s);
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

    public function viewCondiciones($country)
    {
        $data['country'] = $country;

        $s = session()->get('country');

        session()->forget('country');
        session()->put('country', $country);

        $this->cleanPass();

        return view('Web.condiciones', $data);
    }

    public function condiciones()
    {
        return $this->viewCondiciones('pe');
    }

    public function viewPrivacidad()
    {
        countViewWeb('/privacidad');
        return view('Web.privacidad');
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

    public  function cuentaBancariaView()
    {
        $this->cleanPass();
        if ($_SERVER['HTTP_HOST'] == 'bertha.pe'){
            return redirect()->to('https://holabertha.com/es-pe');
        }else{
            return view('Web.cuenta-bancaria');
        }
    }

}
