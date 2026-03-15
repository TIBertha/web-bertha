<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidateReclamo;
use App\Models\Reclamo;
use App\Models\TipoBien;
use App\Models\TipoReclamo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;

class ReclamoController extends Controller
{
    public function viewLibroReclamaciones()
    {
        countViewWeb('/reclamos');
        cleanPass();
        if ($_SERVER['HTTP_HOST'] == 'bertha.pe'){
            return redirect()->to('https://holabertha.com');
        }else{
            return view('Web.libro-reclamaciones');
        }

    }

    public function ajaxNew(ValidateReclamo $request){

        $data = $request->input('data');

        $nombres = formatText($data['nombres']);
        $apelllidos = formatText($data['apellidos']);

        $token = generateTokenReclamo(quitarTildes($nombres), quitarTildes($apelllidos));

        $newData = [
            'nombres'          => $nombres,
            'apellidos'        => $apelllidos,
            'dni'              => formatText($data['documento']),
            'direccion'        => formatText($data['direccion']),
            'correo'           => formatText($data['correo']),
            'telefono'         => formatText($data['telefono']),
            'nombre_apoderado' => formatText($data['apoderado']),
            'tipobien_id'      => $data['bien'],
            'tiporeclamo_id'   => $data['tipo'],
            'fecha_incidente'  => Carbon::parse($data['fechaincidente']),
            'lugar_incidente'  => formatText($data['lugarincidente']),
            'detalle'          => formatText($data['detalle']),
            'pedido'           => formatText($data['pedido']),
            'fecha'            => Carbon::now(),
            'token'            => $token
        ];

        DB::beginTransaction();

        try{

            $exito = Reclamo::create($newData);

            DB::commit();
            return response()->json(['code' => 200, 'msj' => 'Solicitud generada exitosamente']);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al generar su solicitud. Consulte al administrador' ]);

        }

    }

    public function ajaxGetData(){

        $bienes = TipoBien::borrado(false)->orderBy('nombre', 'asc')->get();
        $tiposreclamos = TipoReclamo::borrado(false)->orderBy('nombre', 'asc')->get();

        return response()->json([
            'code' => 200,
            'bienes' => $bienes,
            'tiposreclamos' => $tiposreclamos
        ]);

    }
}
