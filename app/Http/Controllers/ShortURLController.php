<?php

namespace App\Http\Controllers;

use App\Models\Comprobante;
use App\Models\Distrito;
use App\Models\Domicilio;
use App\Models\Views\ContratoView;
use App\Models\Views\RequerimientoView;
use Illuminate\Http\Request;

class ShortURLController extends Controller
{
    public function ajaxOpenEncondeDomicilio($id){

        $decodeID = base64_decode($id);

        $domicilio = Domicilio::find($decodeID);


        $link = getMapLink($domicilio->latitud, $domicilio->longitud, 'link');

        header('Location: ' . $link);
        die();
    }

    public function ajaxOpenEncodeEmpleadorDireccion($id){

        $decodeID = base64_decode($id);

        $dom = Domicilio::find($decodeID);

        if ($dom->link_opcional){
            $link = $dom->link_opcional;
        }else{
            $dist = Distrito::find($dom->distrito_id);
            $link = generateLinkGoogleMap(str_replace(' ','%20',$dom->direccion), $dist->nombre);
        }

        header('Location: ' . $link);
        die();

    }

    public function ajaxOpenEncodeDireccionContrato($id){

        $decodeID = base64_decode($id);

        $contrato = ContratoView::find($decodeID);

        $dom = Domicilio::find($contrato->domicilio_id);

        if ($dom->link_opcional){
            $link = $dom->link_opcional;
        }else{
            $link = generateLinkGoogleMap(str_replace(' ','%20',$contrato->domicilio), $contrato->domicilio_distrito);
        }

        header('Location: ' . $link);
        die();

    }

    public function ajaxOpenEncodeConstanciaColocacion($id){

        $decodeID = base64_decode($id);

        $contrato = ContratoView::find($decodeID);

        $link = $contrato->pdf_constancia_colocacion;

        header('Location: ' . $link);
        die();

    }

    public function ajaxOpenEncodePDFContrato($id){

        $decodeID = base64_decode($id);

        $contrato = ContratoView::find($decodeID);

        $link = $contrato->pdf_contrato;

        header('Location: ' . $link);
        die();
    }

    public function ajaxOpenEncodePDFCurriculo($id){

        $decodeID = base64_decode($id);

        $contrato = ContratoView::find($decodeID);

        $link = $contrato->pdf_ficha;

        header('Location: ' . $link);
        die();
    }

    public function ajaxOpenEncodePDFComprobante($id){

        $link = '';

        $decodeID = base64_decode($id);

        $contrato = ContratoView::find($decodeID);

        $comprobante = Comprobante::where('mediofacturacion', $contrato->id)->where('estatuscomprobante_id', 1)->first();

        if ($contrato->pdf_comprobante_ext){
            $link = $contrato->pdf_comprobante_ext;
        }else{
            if ($comprobante){
                $link = $comprobante->url_pdf;
            }
        }

        header('Location: ' . $link);
        die();
    }

    public function ajaxOpenEncodePDFComprobanteAdelanto($id){

        $decodeID = base64_decode($id);

        $comprobante = Comprobante::find($decodeID);

        $link = $comprobante->url_pdf;

        header('Location: ' . $link);
        die();
    }

    public function ajaxOpenEncodePDFVerAdelanto($id){

        $decodeID = base64_decode($id);

        $requerimiento = RequerimientoView::find($decodeID);

        $link = null;

        if ($requerimiento->adjunto_adelanto){
            $link = $requerimiento->adjunto_adelanto;
        }else if ($requerimiento->comprobante_adelanto_id){
            $comprobante = Comprobante::find($requerimiento->comprobante_adelanto_id);
            $link = $comprobante->url_pdf;
        }

        header('Location: ' . $link);
        die();
    }

    public function ajaxOpenFotoReferencial(){

        $link = 'https://adjuntosexperta.s3.us-east-1.amazonaws.com/Adjuntos/77018434-retrato-1593877737.png';

        header('Location: ' . $link);
        die();

    }
}
