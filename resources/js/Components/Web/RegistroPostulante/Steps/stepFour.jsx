import React from 'react';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import moment from "moment";
import es from "date-fns/locale/es";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import esp from 'react-phone-input-2/lang/es.json';

import SelectFormExterno from "../../Components/selectFormExterno.jsx";

import global from "../../../Helpers/constantes.jsx";

export default function StepFour({trabajador, show, stepCurrent, setFields, actividades, handleChange, paisPostulando, distritos}) {

    const add = () => {
        setFields({verificaciones_laborales: trabajador.verificaciones_laborales.concat([{ nombre: '', apellidos: '', departamento: '', provincia: '', distrito: '', telefono:'', actividad: '', inicioLabores:'', finLabores:'', tiempo: '', timeWork: '', motivoretiro: '', verificado: '', adjuntos: [], adjuntosrecomendaciones: [] }]) });
    };

    const borrar = (id) => {

        let icon = '<i class="fas fa-exclamation-circle"></i>';

        Swal.fire({
            title: icon,
            text: '¿Desea borrar la experiencia laboral?',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: global.PURPLEBERTHA,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {

            if (result.value) {
                setFields({verificaciones_laborales: trabajador.verificaciones_laborales.filter((s, sidx) => id !== sidx) });
            }

        });
    };

    const getWorkTime = (llave, valor, tipo, tipoObjeto) => {

        let fechaI = '';
        let fechaF = '';

        if(tipoObjeto === 'verificaciones'){

            let verificaciones = trabajador.verificaciones_laborales;

            if(tipo === 'inicioLabores'){
                fechaI = valor;
                fechaF = verificaciones[llave].finLabores;
            }else if(tipo === 'finLabores'){
                fechaI = verificaciones[llave].inicioLabores;
                fechaF = valor;
            }

        }

        if (fechaI && fechaF){

            let a = moment(fechaF);
            let b = moment(fechaI);

            let years = a.diff(b, 'year');
            b.add(years, 'years');

            let months = a.diff(b, 'months');
            b.add(months, 'months');

            return ((years > 0 ? years * 12 : 0) + months);
        }

    };

    const calcularTiempo = (llave, valor, tipo, tipoObjeto) => {

        let fechaI = '';
        let fechaF = '';

        if(tipoObjeto === 'verificaciones'){

            let verificaciones = trabajador.verificaciones_laborales;

            if(tipo === 'inicioLabores'){
                fechaI = valor;
                fechaF = verificaciones[llave].finLabores;
            }else if(tipo === 'finLabores'){
                fechaI = verificaciones[llave].inicioLabores;
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

        const data = trabajador.verificaciones_laborales.map((contacto, sidx) => {

            if (llave !== sidx) return contacto;

            if(tipocampo === 'event'){
                if (['inicioLabores', 'finLabores'].includes(nombrecampo)){

                    let tiempo = calcularTiempo(llave, e, nombrecampo, 'verificaciones');
                    let workTime = getWorkTime(llave, e, nombrecampo, 'verificaciones');

                    return { ...contacto, [nombrecampo]: e, tiempo: tiempo, timeWork :workTime };

                }else{
                    return { ...contacto, [nombrecampo]: e};
                }

            }else if (['telefono'].includes(nombrecampo)){
                return { ...contacto, telefono: e};
            }else{
                return { ...contacto, [e.target.name]: e.target.value.toUpperCase() };
            }
        });
        setFields({verificaciones_laborales: data});
    };

    return (
        <div className="form-group mb-0 no-select-text pt-3 pt-lg-0">
            <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

                <h4 className="mb-0 texto-pasos">{stepCurrent}. EXPERIENCIA LABORAL</h4>
                <div className="subtitulo-pasos">Tu recomendación es el motivo por el cual la mayoría de empleadores te contratan, si tienes el celular de al menos un ex empleador, agrega tu experiencia aquí:</div>

                <section className="row">

                    <div className="col-12 col-lg-12">

                        <div className="mb-4">

                            <div className="uploadfile">

                                {trabajador.verificaciones_laborales.map((data, key) => (

                                    <section key={key} className={'mb-3 mt-3 box-verificacion-laboral px-0 ' + ( ((data.timeWork > 0) && (data.timeWork < 6)) ? 'red-border-lessTime' : '')}>

                                        <div className="row mx-0">

                                            <div className="col-12 col-lg-10">

                                                <div className="row mx-0">

                                                    <div className="col-12 col-md-6">

                                                        <div className="mt-3 texto-casillas">Nombre de tu ex empleador</div>
                                                        <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                               name="nombre"
                                                               type="text"
                                                               value={data.nombre}
                                                               placeholder="Ingresa su nombre"
                                                               onChange={ (e) => onChange(e, 'nombre', 'text', key) }
                                                               disabled={!!show}
                                                        />

                                                    </div>

                                                    <div className="col-12 col-md-6">

                                                        <div className="mt-3 texto-casillas">Apellido de tu ex empleador</div>
                                                        <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                               name="apellidos"
                                                               type="text"
                                                               value={data.apellidos}
                                                               placeholder="Ingresa su apellido"
                                                               onChange={ (e) => onChange(e, 'apellidos', 'text', key) }
                                                               disabled={!!show}
                                                        />

                                                    </div>

                                                    <div className="col-12 col-md-6">

                                                        <div className="mt-3 texto-casillas">Teléfono de tu ex empleador</div>

                                                        <PhoneInput
                                                            placeholder="Teléfono del empleador"
                                                            containerClass='phone-input-formulary phone-input-formulario-registro'
                                                            buttonClass='phone-f-button'
                                                            inputClass='phone-f-input opacity-inputs form-control input-formulario mt-0 mb-3 texto-input'
                                                            localization={esp}
                                                            country={paisPostulando === 11 ? 'cl': 'pe'}
                                                            value={data.telefono}
                                                            onChange={ (e) => onChange(e, 'telefono', 'telefono', key) }
                                                            preferredCountries={['pe', 'us', 'cl', 'co', 've']}
                                                            enableLongNumbers={true}
                                                            disabled={!!show}
                                                        />

                                                    </div>

                                                    <div className="col-12 col-md-6">

                                                        <div className="mt-3 texto-casillas">Actividades realizadas</div>
                                                        <SelectFormExterno value={data.actividad} isMulti={true} placeholder="Selecciona" nombrecampo="actividad" tipocampo="event" llave={key} opciones={actividades} handleChange={onChange} isDisabled={!!show} />

                                                    </div>

                                                    <div className="col-12 col-md-6">

                                                        <div className="mt-3 texto-casillas">Fecha de inicio de labores</div>
                                                        <DatePicker
                                                            selected={data.inicioLabores ? moment(data.inicioLabores ,"YYYY-MM").toDate() : ''}
                                                            name="inicioLabores"
                                                            onChange={(e) => onChange(e, 'inicioLabores', 'event', key)}
                                                            dateFormat="MM/yyyy"
                                                            maxDate={new Date()}
                                                            showMonthYearPicker
                                                            placeholderText="mm/aaaa"
                                                            className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                            autoComplete="off"
                                                            locale={es}
                                                            disabled={!!show}
                                                        />

                                                    </div>

                                                    <div className="col-12 col-md-6">

                                                        <div className="mt-3 texto-casillas">Fecha de fin de labores</div>
                                                        <DatePicker
                                                            selected={data.finLabores ? moment(data.finLabores,"YYYY-MM").toDate() : ''}
                                                            name="finLabores"
                                                            onChange={(e) => onChange(e, 'finLabores', 'event', key)}
                                                            dateFormat="MM/yyyy"
                                                            minDate={data.inicioLabores ? data.inicioLabores : new Date()}
                                                            maxDate={new Date()}
                                                            showMonthYearPicker
                                                            placeholderText="mm/aaaa"
                                                            className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                            autoComplete="off"
                                                            locale={es}
                                                            disabled={!!show}
                                                        />

                                                    </div>

                                                    <div className="col-12 col-md-6">

                                                        <div className="mt-3 texto-casillas">Tiempo de servicio</div>
                                                        <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                               name="tiempo"
                                                               type="text"
                                                               value={data.tiempo}
                                                               placeholder="Tiempo de servicio"
                                                               disabled={true}
                                                               onChange={ (e) => onChange(e, 'tiempo', 'text', key) }
                                                        />

                                                    </div>

                                                    <div className="col-12 col-lg-6 mb-3">

                                                        <div className="mt-3 texto-casillas">Lugar de labores</div>
                                                        <SelectFormExterno isSearchable={true} value={data.distrito} placeholder={'Ingresa tu lugar de labores'} nombrecampo="distrito" tipocampo="event" llave={key} opciones={distritos} handleChange={onChange} isDisabled={!!show} />
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center">

                                                {show ? '' : <span className="remove-contactos mt-4 mb-4" onClick={ () => borrar(key) }>Borrar</span> }

                                            </div>

                                            {((data.timeWork > 0) && (data.timeWork < 6)) &&
                                                <div className="col-12 col-lg-12 mb-4 red-div-lessTime">
                                                    Tu experiencia debe ser mayor de 6 meses
                                                </div>
                                            }

                                        </div>


                                    </section>

                                ))}

                                <div className="form-group row pt-3 justify-content-center align-items-center m-0">

                                    <div className="col-auto">

                                        {show ? '' :

                                            <div className="post-registro-upload mb-0 mt-3 uploadfile font-weight-bold"
                                                 onClick={() => add()}><i className="fas fa-plus me-2"></i>
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
                                    <i className="fas fa-info-circle icon-alert-registro-postulante me-2"></i>
                                    Si no lo tienes, dale clic en "Siguiente"
                                </div>
                            </div>

                        }

                    </div>

                </section>

            </div>
        </div>
    )
}
