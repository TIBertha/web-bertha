<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MasterController extends Controller
{
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
}
