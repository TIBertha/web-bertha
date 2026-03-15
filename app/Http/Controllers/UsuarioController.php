<?php

namespace App\Http\Controllers;

use App\Models\Empleador;
use App\Models\Trabajador;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function ajaxCheckPhone(Request $request){

        $telefono = $request->input('phone');
        $tipousuario = $request->input('tipousuario');

        $usuario = Usuario::where('telefono', $telefono)->first();

        if($usuario){

            $emp = Empleador::where('usuario_id', $usuario->id)->first();
            $tra = Trabajador::where('usuario_id', $usuario->id)->first();

            if($tipousuario == 'cli'){

                if($emp){
                    return response()->json(['code' => 100, 'msj' => 'El número de teléfono ingresado ya tiene cuenta de cliente registrada' ]);
                }else{
                    return response()->json(['code' => 200, 'msj' => 'Usuario nuevo', 'data' => $usuario ]);
                }

            }else if($tipousuario == 'tra'){

                if($tra){
                    return response()->json(['code' => 100, 'msj' => 'El número de teléfono ingresado ya tiene cuenta trabajador registrada' ]);
                }else{
                    return response()->json(['code' => 200, 'msj' => 'Usuario nuevo', 'data' => $tra, 'usuario' => $usuario ]);
                }

            }

        }else{
            return response()->json(['code' => 300, 'msj' => 'Usuario nuevo' ]);
        }

    }
}
