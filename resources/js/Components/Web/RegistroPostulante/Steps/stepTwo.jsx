import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import es from "date-fns/locale/es";

import SelectFormExterno from "../../Components/selectFormExterno.jsx";
import {mayorEdad} from "../../../Helpers/helpers.jsx";
import {ajaxSearchDepartamentosList} from "../../../Functions/RegistroPostulante.jsx";

export default function StepTwo({labelError, trabajador, enabledCountries,show, setFields, stepCurrent, generos, paises, typeform, estadosciviles, cantidades, departamentos, departamentosCL, departamentosPE, idiomas, handleChange}) {

    const [isValidNumeroDocumento, setValidNumeroDocumento] = useState(false);
    const [msjError, setMsjError] = useState('');

    let fechaNac = trabajador.fechanacimiento ? moment(trabajador.fechanacimiento,"YYYY-MM-DD").toDate() : null;

    const validarNumeroDocumento = (e) => {

        let tipodocumento = trabajador.tipodocumento_id.value;

        if(e.target.value && tipodocumento){

            if(([1, 10].includes(parseInt(tipodocumento)))){

                if(e.target.value.length === 8){
                    setMsjError('');
                    setValidNumeroDocumento(false);
                }else{
                    setMsjError('El numero documento debe contener 8 dígitos.');
                    setValidNumeroDocumento(true);
                }

            }else{

                if(e.target.value.length >= 9){
                    setMsjError('');
                    setValidNumeroDocumento(false);
                }else{
                    setMsjError('El numero documento debe contener 9 o mas dígitos.');
                    setValidNumeroDocumento(true);
                }

            }

        }else{
            setMsjError('');
            setValidNumeroDocumento(false);
        }

    };

    let tiposDocumentos = [];

    const tdChileExt = [
        { value: '2',  label: 'PASAPORTE' },
        { value: '10', label: 'ROL UNICO NACIONAL (RUN)' },
        { value: '11', label: 'ROL UNICO TRIBUTARIO (RUT)' }
    ];

    const tdPeruExt = [
        { value: '4', label: 'CARNE DE EXTRANJERIA (CE)' },
        { value: '9', label: 'CARNE PERMISO PERMANENCIA (CPP)' },
        { value: '7', label: 'PERMISO TEMPORAL DE PERMANENCIA (PTP)' }
    ];

    const tdPeru = [
        { value: '1', label: 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)' }
    ];

    const tdChile = [
        { value: '10', label: 'ROL UNICO NACIONAL (RUN)' }
    ];

    let nacimiento = {
        label: 'Lugar',
        placeholder: 'lugar',
        isDisabled: false
    };

    // Blindaje: si pais_id viene vacío, evitar crash
    const paisNacimiento = parseInt(trabajador?.pais_id?.value);
    const paisPostulando = trabajador?.postulando_pais_id;

    if (paisPostulando === 54) {

        if (paisNacimiento === 54) {
            nacimiento.label = 'Departamento';
            nacimiento.placeholder = 'departamento';
            nacimiento.isDisabled = true;
            tiposDocumentos = tdPeru;
        } else {
            tiposDocumentos = tdPeruExt;
        }

    } else if (paisPostulando === 11) {

        if (paisNacimiento === 11) {
            nacimiento.isDisabled = true;
            tiposDocumentos = tdChile;
        } else {
            tiposDocumentos = tdChileExt;
        }

    } else {
        tiposDocumentos = tdPeruExt;
    }


    const [newListDepartamentos, setNewListDepartamentos] = useState([]);

    useEffect(() =>{
        ajaxSearchDepartamentosList(trabajador.pais_id.value).then(r => {
            setNewListDepartamentos(r.departamentos);
        })
    }, [trabajador.pais_id]);

    return (

        <div className="form-group mb-0 no-select-text pt-3 pt-lg-0">

            <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

                <h4 className="mb-3 texto-pasos">{stepCurrent - 1}. DATOS PERSONALES</h4>

                <div className="row d-flex flex-wrap">

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Escribe tus nombres completos:</div>
                        <input className="opacity-inputs form-control input-formulario mt-0 texto-input"
                               name="nombres" type="text" placeholder="Ingresa tu nombre completo"
                               value={trabajador.nombres} onChange={ (e) => handleChange(e, 'nombres', 'text') } disabled={!!show}/>
                        {labelError && !trabajador?.nombres && (
                            <div className="msj-error-registro-postulante">
                                Falta llenar este campo.
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Escribe tus apellidos completos:</div>
                        <input
                            className="opacity-inputs form-control input-formulario mt-0 texto-input"
                            name="apellidos"
                            type="text"
                            placeholder="Ingresa tu apellido completo"
                            value={trabajador.apellidos}
                            onChange={ (e) => handleChange(e, 'apellidos', 'text') }
                            disabled={!!show}
                        />
                        {(labelError && !trabajador.apellidos) &&
                            <div className="msj-error-registro-postulante">
                                Faltar llenar este campo.
                            </div>
                        }
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Soy:</div>
                        <SelectFormExterno value={trabajador.genero_id} placeholder="Ingrese su genero" nombrecampo="genero_id" tipocampo="event" opciones={generos} handleChange={handleChange}/>
                        {labelError && !trabajador?.genero_id && (
                            <div className="msj-error-registro-postulante">
                                Falta llenar este campo.
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Estado Civil:</div>
                        <SelectFormExterno value={trabajador.estadocivil_id} placeholder="Ingresa tu estado civil" nombrecampo="estadocivil_id" tipocampo="event" opciones={estadosciviles} handleChange={handleChange} isDisabled={!!show} />
                        {labelError && !trabajador?.estadocivil_id && (
                            <div className="msj-error-registro-postulante">
                                Falta llenar este campo.
                            </div>
                        )}
                    </div>

                    {typeform === 'new' &&
                        <div className="col-12 col-lg-6">

                            <div className="mt-3 texto-casillas">País Nacimiento:</div>
                            <SelectFormExterno isSearchable={true} value={trabajador.pais_id} placeholder={'Ingresa tu país de nacimiento'} nombrecampo="pais_id" tipocampo="pais" opciones={paises} paisPedido={trabajador.postulando_pais_id} handleChange={handleChange} isDisabled={!!show} />
                            {labelError && !trabajador?.pais_id && (
                                <div className="msj-error-registro-postulante">
                                    Falta llenar este campo.
                                </div>
                            )}

                        </div>
                    }

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">{'Lugar de nacimiento'}</div>
                        {enabledCountries.includes(parseInt(trabajador.pais_id.value)) ?
                            <SelectFormExterno isSearchable={true} value={trabajador.departamentonacimiento_id} placeholder={'Ingresa tu lugar de nacimiento'} nombrecampo="departamentonacimiento_id" tipocampo="event" opciones={newListDepartamentos} handleChange={handleChange} isDisabled={!!show} />
                            :
                            <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                   name="lugar_nacimiento"
                                   type="text"
                                   placeholder={'Ingresa tu lugar de nacimiento'}
                                   value={trabajador.lugar_nacimiento}
                                   onChange={ (e) => handleChange(e, 'lugar_nacimiento', 'text') }
                                   disabled={!!show}
                            />
                        }
                        {labelError && !trabajador?.departamentonacimiento_id && (
                            <div className="msj-error-registro-postulante">
                                Falta llenar este campo.
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Tipo de documento:</div>
                        <SelectFormExterno value={trabajador.tipodocumento_id} placeholder="Ingresa tu tipo de documento" nombrecampo="tipodocumento_id" tipocampo="event" opciones={tiposDocumentos} handleChange={handleChange} isDisabled={show ? true : nacimiento.isDisabled}/>
                        {labelError && !trabajador?.tipodocumento_id && (
                            <div className="msj-error-registro-postulante">
                                Falta llenar este campo.
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Número de documento:</div>
                        <input
                            className={"opacity-inputs form-control input-formulario mt-0 texto-input " + (msjError ? '' : '  ')}
                            name="numero_documento"
                            type="text"
                            placeholder="Ingresa tu número de documento"
                            value={trabajador.numero_documento}
                            onChange={ (e) => handleChange(e, 'numero_documento', 'text') }
                            onBlur={ (e) => validarNumeroDocumento(e)}
                            disabled={!!show}
                            maxLength={15}
                        />
                        {isValidNumeroDocumento &&
                            <div className="msj-error-registro-postulante">
                                {msjError}
                            </div>
                        }

                        {labelError && (!trabajador?.numero_documento || trabajador.numero_documento.length < 8) && (
                            <div className="msj-error-registro-postulante">
                                Falta llenar este campo.
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Fecha de nacimiento:</div>
                        <DatePicker
                            selected={fechaNac}
                            onChange={(e) => handleChange(e, 'fechanacimiento', 'event')}
                            showMonthDropdown
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            scrollableYearDropdown
                            locale={es}
                            maxDate={mayorEdad()}
                            dropdownMode="select"
                            className="opacity-inputs form-control input-formulario mt-0 mb-0 texto-input"
                            placeholderText="dd/mm/aaaa"
                            autoComplete="off"
                            disabled={!!show}
                        />
                        {labelError && !trabajador?.fechanacimiento && (
                            <div className="msj-error-registro-postulante">
                                Falta llenar este campo.
                            </div>
                        )}
                    </div>



                    <div className="col-12 col-lg-6">
                        <div className="mt-3 texto-casillas">Cantidad de hijos:</div>
                        <SelectFormExterno value={trabajador.numero_hijos} placeholder="Ingresa cuantos hijos tienes" nombrecampo="numero_hijos" tipocampo="event" opciones={cantidades} handleChange={handleChange} isDisabled={!!show} />
                        {labelError &&
                            (trabajador?.numero_hijos?.value === undefined || trabajador.numero_hijos.value === null) && (
                                <div className="msj-error-registro-postulante">
                                    Falta llenar este campo.
                                </div>
                            )}
                    </div>

                    {trabajador.numero_hijos?.value > 0 &&
                        <div className="col-12 col-lg-6">

                            <div className="mt-3 texto-casillas">Edad(es) de hijo(s):</div>
                            <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                   name="edad_hijos"
                                   type="text"
                                   placeholder={'Ingrese la edad de sus hijos'}
                                   value={trabajador.edad_hijos}
                                   onChange={ (e) => handleChange(e, 'edad_hijos', 'text')}
                                   disabled={!!show}
                            />
                            {labelError && !trabajador?.edad_hijos && (
                                <div className="msj-error-registro-postulante">
                                    Falta llenar este campo.
                                </div>
                            )}

                        </div>
                    }

                </div>

            </div>

        </div>

    )
}
