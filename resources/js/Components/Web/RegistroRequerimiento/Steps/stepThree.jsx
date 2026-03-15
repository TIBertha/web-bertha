import React from "react";
import parse from "html-react-parser";
import moment from "moment";
import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

import Tooltips from "../../Components/tooltips.jsx";
import SelectFormExterno from "../../Components/selectFormExterno.jsx";

import {isHourIngresoEqualOrGreaterHourSalida} from "../../../Helpers/helpers.jsx";

export default function StepThree({handleChange, handleChangeHorarios, requerimiento, diasI, diasS, frecuencias, horasLabor}) {
    let estilo = {DiaDescansoCD: '', Frecuencia: '', HorarioSalidaRetorno: ''};

    if ([1,3].includes(requerimiento.modalidad_id.value)){
        estilo.HorarioSalidaRetorno = 'col-12 order-2';
        if ([1].includes(requerimiento.modalidad_id.value)){
            estilo.DiaDescansoCD = 'col-12 order-3';
        }
        if ([3].includes(requerimiento.modalidad_id.value)){
            estilo.Frecuencia = 'col-12 order-1';
        }
    }else if ([2].includes(requerimiento.modalidad_id.value)){
        estilo.HorarioSalidaRetorno = 'col-12 order-1';
    }

    let horarios = requerimiento.horarios;

    return(
        <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

            <h4 className="mb-0 texto-pasos">{'3. Con respecto al ' + ([1].includes(requerimiento.modalidad_id.value) ? 'descanso' : 'horario laboral')}</h4>

            {requerimiento.modalidad_id &&
                <section className="row">

                    {requerimiento.tipoDescanso_id.value !== 7 &&
                        <div className={estilo.HorarioSalidaRetorno}>

                            { (requerimiento.modalidad_id.value === 1 && requerimiento.tipoDescanso_id ) &&
                                <div className="mt-4 texto-casillas">Descanso Semanal<Tooltips text={parse('Las trabajadoras solo aceptan salidas semanales, procura que se retiren el sábado después de almuerzo y retornen el lunes a primera hora, eso les da ánimos y aumenta su permanencia en los hogares')} estilo={"tooltip-formulario ms-2"} placement={'bottom'}/></div>
                            }

                            <div className="form-group row">

                                <div className={'col-12' + (requerimiento.modalidad_id.value == 2 ? ' px-0' : '')}>

                                    <div className={'row'}>

                                        { requerimiento.modalidad_id.value !== 1 &&

                                            <div className={'col-12' + (requerimiento.modalidad_id.value === 3 ? ' order-2' : '')}>
                                                <div className={'row mx-0 mt-4'}>

                                                    <div className="col-12 px-0 mt-2">

                                                        <div className="row mx-0">

                                                            <div className="col-2 col-md-3 texto-casillas">
                                                                Día
                                                            </div>
                                                            <div className="col col-md-3 texto-casillas text-center">
                                                                <span className="d-none d-md-inline">Hora de inicio</span>
                                                                <span className="d-inline d-md-none">Inicio</span>
                                                            </div>
                                                            <div className="col col-md-3 texto-casillas text-center">
                                                                <span className="d-none d-md-inline">Hora de fin</span>
                                                                <span className="d-inline d-md-none">Fin</span>
                                                            </div>
                                                            <div className="col-3 col-md-3 texto-casillas text-center">
                                                                Descanso
                                                            </div>

                                                        </div>

                                                    </div>

                                                    {horarios &&
                                                        <>
                                                            {horarios.map((data,index) => {

                                                                let horaingreso =  data.horaingreso ? moment(data.horaingreso,"YYYY-MM-DD HH:mm:ss ").toDate() : '';
                                                                let horasalida =  '';

                                                                let isHourEqualOrGreater = isHourIngresoEqualOrGreaterHourSalida(data.horaingreso, data.horasalida);

                                                                if(isHourEqualOrGreater){
                                                                    horasalida = horaingreso;
                                                                }else{
                                                                    horasalida =  data.horasalida ? moment(data.horasalida,"YYYY-MM-DD HH:mm:ss ").toDate() : '';
                                                                }

                                                                return (
                                                                    <div className="col-12 px-0 mt-2" key={index}>

                                                                        <div className="row mx-0">

                                                                            <div className="col-2 col-md-3 texto-casillas my-auto">
                                                                                <p className="d-none d-md-inline m-0 distrito-placeholder-select">{data.dia}</p>
                                                                                <p className="d-inline d-md-none m-0 distrito-placeholder-select">{data.diaC}</p>
                                                                            </div>

                                                                            <div className="col col-md-3 lower-time-format">

                                                                                {data.isDescanso ?
                                                                                    <input className="opacity-inputs form-control input-formulario mt-0 mb-0 texto-input" disabled={true} value="-" />
                                                                                    :
                                                                                    <DatePicker
                                                                                        selected={horaingreso}
                                                                                        onChange={(e) => handleChangeHorarios(e, data.id, 'horaingreso') }
                                                                                        showTimeSelect
                                                                                        showTimeSelectOnly
                                                                                        className="opacity-inputs form-control input-formulario mt-0 mb-0 texto-input text-lower"
                                                                                        name="horaingreso"
                                                                                        placeholderText="Hora Inicio"
                                                                                        dateFormat="h:mm a"
                                                                                        timeCaption="Hora"
                                                                                        minTime={setHours(setMinutes(new Date(), 0), 7)}
                                                                                        maxTime={setHours(setMinutes(new Date(), 0), 10)}
                                                                                        autoComplete="off"
                                                                                    />
                                                                                }

                                                                            </div>

                                                                            <div className="col col-md-3 lower-time-format">

                                                                                {data.isDescanso ?
                                                                                    <input className="opacity-inputs form-control input-formulario mt-0 mb-0 texto-input" disabled={true} value="-" />
                                                                                    :
                                                                                    <DatePicker
                                                                                        selected={ (horasalida) }
                                                                                        onChange={(e) => handleChangeHorarios(e, data.id, 'horasalida') }
                                                                                        showTimeSelect
                                                                                        showTimeSelectOnly
                                                                                        className="opacity-inputs form-control input-formulario mt-0 mb-0 texto-input text-lower"
                                                                                        name="horasalida"
                                                                                        placeholderText="Hora Fin"
                                                                                        dateFormat="h:mm a"
                                                                                        timeCaption="Hora"
                                                                                        minTime={horaingreso ? horaingreso : setHours(setMinutes(new Date(), 0), 13)}
                                                                                        maxTime={setHours(setMinutes(new Date(), 29), 19)}
                                                                                        autoComplete="off"
                                                                                    />
                                                                                }

                                                                            </div>

                                                                            <div className="col-3 col-md-3 text-center my-auto">
                                                                                {data.id !== 7 &&
                                                                                    <div className="custom-control custom-checkbox mt-2">
                                                                                        <input type="checkbox"
                                                                                               className="custom-control-input"
                                                                                               id={'checkbox-' + data.id}
                                                                                               checked={data.isDescanso}
                                                                                               onChange={(e) => handleChangeHorarios(e, data.id, 'isDescanso') }
                                                                                        />
                                                                                        <label className="custom-control-label" htmlFor={'checkbox-' + data.id}></label>
                                                                                    </div>
                                                                                }
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                );

                                                            })

                                                            }
                                                        </>
                                                    }

                                                </div>
                                            </div>
                                        }

                                        {(requerimiento.modalidad_id.value === 1) &&
                                            <div className="col-12">
                                                {requerimiento.tipoDescanso_id &&
                                                    <div className="row mx-0">

                                                        <div className={'col-12 col-lg-6 order-1'}>
                                                            <div className="mt-4 texto-casillas">Día de salida</div>
                                                            <SelectFormExterno value={requerimiento.diaSalida} requerimiento={requerimiento} placeholder="Ingresa el día de salida" nombrecampo="diaSalida" tipocampo="time" opciones={diasS} handleChange={handleChange} />
                                                        </div>

                                                        <div className={'col-12 col-lg-6 order-2'}>
                                                            <div className="mt-4 texto-casillas">Hora de salida</div>
                                                            <SelectFormExterno value={requerimiento.horaSalida} placeholder="Ingresa la hora de salida" nombrecampo="horaSalida" tipocampo="time" opciones={horasLabor} handleChange={handleChange} />
                                                        </div>

                                                        <div className={'col-12 col-lg-6 order-3'}>
                                                            <div className="mt-4 texto-casillas">Día de retorno</div>
                                                            <SelectFormExterno value={requerimiento.diaIngreso} requerimiento={requerimiento} placeholder={requerimiento.modalidad_id.value === 1 ? 'Ingresa el día de retorno' :'Ingresa el día de ingreso'} nombrecampo="diaIngreso" tipocampo="time" opciones={diasI} handleChange={handleChange} />
                                                        </div>

                                                        <div className={'col-12 col-lg-6 order-4'}>
                                                            <div className="mt-4 texto-casillas">Hora de retorno</div>
                                                            <SelectFormExterno value={requerimiento.horaIngreso} placeholder={requerimiento.modalidad_id.value === 1 ? 'Ingresa la hora de retorno' :'Ingresa la hora de ingreso'} nombrecampo="horaIngreso" tipocampo="time" opciones={horasLabor} handleChange={handleChange} />
                                                        </div>

                                                    </div>
                                                }
                                            </div>
                                        }

                                        {(requerimiento.modalidad_id.value === 3) &&
                                            <div className={estilo.Frecuencia}>
                                                <div className="mt-4 texto-casillas">Frecuencia</div>
                                                <SelectFormExterno value={requerimiento.frecuencia} placeholder="Ingresa la frecuencia" nombrecampo="frecuencia" tipocampo="evento" opciones={frecuencias} handleChange={handleChange} />
                                            </div>
                                        }

                                        {(requerimiento.tipoDescanso_id && requerimiento.diaIngreso.value && requerimiento.diaSalida.value && requerimiento.modalidad_id.value === 1 ) &&
                                            <div className={estilo.DiaDescansoCD}>
                                                <div className="mt-4 texto-casillas">Día de descanso</div>
                                                <input
                                                    className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                                                    id="diaDescansoCamaDentro"
                                                    name="diaDescansoCamaDentro"
                                                    type="text"
                                                    placeholder="Ingresa los días de ingreso y salida"
                                                    value={requerimiento.diaDescansoCamaDentro}
                                                    onChange={(e) => handleChange(e, 'diaDescansoCamaDentro','input')}
                                                    disabled={true}
                                                />
                                            </div>
                                        }
                                        <div className="espacio"></div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    }

                </section>
            }

        </div>
    )
}
