<?php

namespace App\Http\Controllers;

use App\Models\Contrato;
use App\Models\Trabajador;
use App\Models\Views\TrabajadorView;
use Illuminate\Http\Request;

class MisContratosController extends Controller
{
    public function ajaxOpenEncodeAntecedentesTrabajador($id){
        $decodeID = base64_decode($id);

        $contrato = Contrato::find($decodeID);

        $trabajadorData = Trabajador::find($contrato->trabajador_id);

        $data['pdflink'] = $trabajadorData->certificado_antecedente_pdf;

        return view('Web.MisContratos.AntecedentesPDF.ver-antecedente', $data);
    }
}
