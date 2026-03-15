import React, {useState} from "react";

import {showAlert} from "../../../Helpers/alerts.jsx";

import frontExample from "../../../../../../public/img/id_card_front.svg";

import {ajaxUploadFile} from "../../../Functions/General.jsx";

import LoadingMessage from "../Components/loadingMessage.jsx";

import imageCompression from "browser-image-compression";

export default function StepSix({labelError, trabajador, show, setFields, stepCurrent}) {
    const [loading, setLoading] = useState(false);
    const textLoading = 'Subiendo foto';

    let isChofer = trabajador.actividad_id ? trabajador.actividad_id.some( (item) => item.value === 8) : false;


    const actionUpload = (archivo, nombrecampo) => {

        let file = archivo.target.files[0];
        let tipoFile = file.type;

        let tiposFilePermitidos = ['image/png', 'image/jpg', 'image/jpeg'];

        if(tiposFilePermitidos.includes(tipoFile)){

            setLoading(true);

            let options = {
                maxSizeMB: 4,
                maxWidthOrHeight: 800,
                useWebWorker: true
            };

            imageCompression(file, options).then( function(compressedFile){

                let reader = new FileReader();

                reader.readAsDataURL(compressedFile);

                reader.onload = (e) => {

                    let f = reader.result;
                    let campo = nombrecampo;
                    let tipoarchivo = '';
                    ajaxUploadFile(f, campo, tipoarchivo).then(r => {
                        setLoading(false);
                        if(r.code === 200){
                            setFields({[nombrecampo]: r.result});
                        }else if(r.code === 500){
                            showAlert('error', r.msj)
                        }
                    });
                };

            });

        }else{
            showAlert('error', 'Tipo de archivo no permitido');
        }

    }
    return(
        <div className="form-group mb-0 no-select-text pt-3 pt-lg-0">
            <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

                <h4 className="mb-3 texto-pasos">{stepCurrent}. DOCUMENTO DE IDENTIDAD</h4>
                <div className="subtitulo-pasos">{'Genial, ahora adjunta las fotos (echadas) de tu último documento de identidad' + (isChofer ? ' y licencia de condicir.' : '.')}</div>


                <div className="row justify-content-center mt-3">
                    <div className="alert alert-purple alert-registro-postulante mb-0 pb-0" role="alert">
                        <i className="fas fa-info-circle icon-alert-registro-postulante me-2"></i>Adjunta tu documento más reciente.
                    </div>
                </div>

                {loading && <LoadingMessage mensaje={textLoading}/> }

                <section>

                    <div className="col-12">

                        <div className="row">

                            <div className="col-12">

                                <div className="text-center mt-5">

                                    <img id="img_foto_documento_delantera" className="identificacion-postulante" src={trabajador.foto_documento_delantera == null ? frontExample : trabajador.foto_documento_delantera}/>
                                    {(( labelError === true ) && !(trabajador.foto_documento_delantera)) &&
                                        <div className="msj-error-registro-postulante">
                                            Faltar llenar este campo.
                                        </div>
                                    }
                                    <div className="botoninputfile mx-auto">
                                        <input type="file" name="foto_documento_delantera" id="foto_documento_delantera" className="inputfile" accept=".jpg,.png" onChange={(e) => show ? '' : actionUpload(e, 'foto_documento_delantera')} />
                                        {!(show) && <label htmlFor="foto_documento_delantera" className="d-block post-registro-upload mb-0 mt-3 uploadfile"><i className="icon fas fa-camera me-2" data-toggle="tooltip" data-placement="bottom" title={(trabajador.foto_documento_delantera ? 'Cambiar' : 'Subir') + ' Foto'}></i>{(trabajador.foto_documento_delantera ? 'Cambiar' : 'Subir') + ' Foto'}</label> }
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </div>
        </div>
    )
}
