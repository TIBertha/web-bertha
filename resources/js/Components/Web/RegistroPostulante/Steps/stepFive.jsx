import React, {useState} from 'react';
import Swal from "sweetalert2";
import moment from "moment";

import SelectFormExterno from "../../Components/selectFormExterno.jsx";

import global from "../../../Helpers/constantes.jsx";

export default function StepFive({labelError, trabajador, show, stepCurrent, setFields, tiposcertificados, niveleseducativos, handleChange}) {

    const add = () => {
        setFields({adjunto_educacion: trabajador.adjunto_educacion.concat([{ tipocertificado: '', centro: '', titulo: '', fechainicio: '', fechafin: '', tiempo: '', adjuntos: [] }]) });
    };

    const borrar = (id) => {

        let icon = '<i class="fas fa-exclamation-circle"></i>';

        Swal.fire({
            title: icon,
            text: '¿Desea borrar el item?',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: global.PURPLEBERTHA,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {

            if (result.value) {
                setFields({adjunto_educacion: trabajador.adjunto_educacion.filter((s, sidx) => id !== sidx) });
            }

        });
    };

    const calcularTiempo = (llave, valor, tipo, tipoObjeto) => {

        let fechaI = '';
        let fechaF = '';

        if(tipoObjeto === 'educacion'){

            let educacion = trabajador.adjunto_educacion;

            if(tipo === 'fechainicio'){
                fechaI = valor;
                fechaF = educacion[llave].fechafin;
            }else if(tipo === 'fechafin'){
                fechaI = educacion[llave].fechainicio;
                fechaF = valor;
            }

        }

        if (fechaI && fechaF){

            let a = moment(fechaF);
            let b = moment(fechaI);
            let anios = '';
            let meses = '';

            let years = a.diff(b, 'year');
            b.add(years, 'years');

            if (years > 0){
                if (years > 1){
                    anios = years + ' AÑOS';
                }else{
                    anios = years + ' AÑO';
                }
            }else{
                anios = 0;
            }

            let months = a.diff(b, 'months');
            b.add(months, 'months');

            if (months > 0){
                if (months > 1){
                    meses = months + ' MESES';
                }else{
                    meses = months + ' MES';
                }
            }else{
                meses = 0;
            }

            let enunciado = '';

            if (years > 0 && months > 0){
                enunciado = anios + ' Y ' + meses;
            }else if (years > 0 && months === 0){
                enunciado = anios;
            }else if (years === 0 && months > 0){
                enunciado = meses;
            }

            return enunciado ? enunciado : 'DIA(S)';
        }

    };

    const onChange = (e, nombrecampo, tipocampo, llave) => {

        const data = trabajador.adjunto_educacion.map((contacto, sidx) => {

            if (llave !== sidx) return contacto;

            if(tipocampo === 'event'){

                if (['fechainicio', 'fechafin'].includes(nombrecampo)){

                    let tiempo = calcularTiempo(llave, e, nombrecampo, 'educacion');

                    return { ...contacto, [nombrecampo]: e, tiempo: tiempo };

                }else{
                    return { ...contacto, [nombrecampo]: e};
                }

            }else{
                return { ...contacto, [e.target.name]: e.target.value.toUpperCase() };
            }

        });

        setFields({adjunto_educacion: data});

    };

    return (
        <div className="form-group mb-0 no-select-text pt-3 pt-lg-0">

            <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

                <h4 className="mb-0 texto-pasos">{stepCurrent}. ESTUDIOS</h4>
                <div className="subtitulo-pasos">¿Cuál es tu nivel de educación?</div>

                <section className="row">

                    <div className="col-12 col-lg-12">

                        <div className="mt-3 texto-casillas"></div>
                        <SelectFormExterno value={trabajador.niveleducativo_id} isMulti={false} placeholder="Selecciona tu respuesta" nombrecampo="niveleducativo_id" tipocampo="event" opciones={niveleseducativos} handleChange={handleChange} isDisabled={!!show} />
                        {(( labelError === true ) && !(trabajador.niveleducativo_id)) &&
                            <div className="msj-error-registro-postulante">
                                Faltar llenar este campo.
                            </div>
                        }
                    </div>

                </section>

                <div className="subtitulo-pasos mt-3">Si cuentas con un título, bachiller, curso o taller, agrégalo aquí: </div>

                <section className="row">

                    <div className="col-12 col-lg-12 mt-4">

                        <div className="mb-4">

                            <div className="uploadfile">

                                {trabajador.adjunto_educacion.map((data, key) => (

                                    <section key={key} className="mb-4 box-verificacion-laboral">

                                        <div className="row">

                                            <div className="col-12 col-lg-10">

                                                <div className="d-flex flex-wrap">

                                                    <div className="col-12 col-lg-6">

                                                        <div className="mt-3 texto-casillas">Tipo de certificado</div>
                                                        <SelectFormExterno value={data.tipocertificado} isMulti={false} placeholder="Seleccione" nombrecampo="tipocertificado" tipocampo="event" llave={key} opciones={tiposcertificados} handleChange={onChange} isDisabled={!!show} />

                                                    </div>

                                                    <div className="col-12 col-lg-6">

                                                        <div className="mt-3 texto-casillas">Centro de estudio</div>
                                                        <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                               name="centro"
                                                               type="text"
                                                               value={data.centro}
                                                               placeholder="Nombre de centro de estudios"
                                                               onChange={ (e) => onChange(e, 'centro', 'text', key) }
                                                               disabled={!!show}
                                                        />

                                                    </div>

                                                    <div className="col-12 col-lg-6">

                                                        <div className="mt-3 texto-casillas">Título otorgado</div>
                                                        <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                               name="titulo"
                                                               type="text"
                                                               value={data.titulo}
                                                               placeholder="Título otorgado"
                                                               onChange={ (e) => onChange(e, 'titulo', 'text', key) }
                                                               disabled={!!show}
                                                        />

                                                    </div>

                                                </div>



                                            </div>

                                            <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center">
                                                {!(show) && <span className="remove-contactos mt-4 mb-4" onClick={ () => borrar(key) }>Borrar</span> }
                                            </div>

                                        </div>


                                    </section>

                                ))}

                                <div className="form-group row justify-content-center align-items-center m-0">

                                    <div className="col-auto">
                                        {!(show) &&
                                            <div className="post-registro-upload mb-0 mt-3 uploadfile font-weight-bold" onClick={() => add()}><i className="fas fa-plus me-2"></i>
                                                Adicionar nuevo
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>

                        </div>

                        {!(show) &&
                            <div className="row justify-content-center mt-3">
                                <div className="alert alert-purple alert-registro-postulante mb-0 pb-0" role="alert">
                                    <i className="fas fa-info-circle icon-alert-registro-postulante me-2"></i>Si no lo tienes, dale clic en "Siguiente"
                                </div>
                            </div>
                        }

                    </div>

                </section>

            </div>

        </div>
    )
}
