<?php

namespace App\Http\Controllers;

use App\Models\VistasWeb;
use Illuminate\Http\Request;

class MasterController extends Controller
{

    public function ajaxLangModalView(Request $request)
    {
        $vista = VistasWeb::find(19);

        if ($vista) {
            $vista->increment('num_vistas');
        }

        return response()->json(['code' => 200]);
    }

    public function ajaxUploadFile(Request $request){

        try{

            $url = '';

            $fileBase64  = $request->input('file');
            $campo       = $request->input('campo');
            $tipoarchivo = $request->input('tipoarchivo');

            if($fileBase64){

                $url = saveImageToS3($fileBase64);

                if( in_array($campo, ['informecovid', 'adjunto_prueba_covid']) ){
                    $url = [$url];
                }
            }

            return response()->json([
                'code' => 200,
                'result' => $url
            ]);

        } catch (\Exception $e) {

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al subir archivo. Consulte al administrador' ]);

        }

    }

    public function ajaxChangeLanguage(Request $request)
    {
        $data = $request->validate([
            'lang' => [
                'required',
                'in:' . implode(',', array_keys(config('regions.languages'))),
            ],
        ]);

        $request->session()->put('lang', $data['lang']);

        app()->setLocale($data['lang']);

        return response()->json([
            'code' => 200,
            'lang' => $data['lang'],
        ]);
    }
}
