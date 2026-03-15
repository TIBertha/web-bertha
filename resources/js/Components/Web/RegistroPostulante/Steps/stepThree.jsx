import React from 'react';

import SelectFormExterno from "../../Components/selectFormExterno.jsx";

let vacunasCovid = [
    {value:'0' , label: 'NO'},
    {value:'1', label: '1 DOSIS'},
    {value:'2', label: '2 DOSIS'},
    {value:'3', label: '3 DOSIS'},
    {value:'4', label: '4 DOSIS'},
    {value:'5', label: '5 DOSIS'},
];

export default function StepThree({labelError, paisPostulando, trabajador, show, stepCurrent, distritos, setFields, handleChange, respuestasCartillaVacuna}) {

    return (
        <div className="form-group mb-0 no-select-text pt-3 pt-lg-0">

            <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

                <h4 className="mb-3 texto-pasos">{stepCurrent - 1}. DIRECCIÓN</h4>

                <section className="row mt-3">

                    <div className="col-12 col-lg-6">

                        <div className="mt-3 texto-casillas">{(paisPostulando === 54 ? 'Distrito' : 'Lugar') + ' donde vivo:'}</div>
                        <SelectFormExterno value={trabajador.distrito_id} isSearchable={true} placeholder={'Ingresa ' + (paisPostulando === 54 ? 'el distrito' : 'la comuna') + ' donde vives'} nombrecampo="distrito_id" tipocampo="event" opciones={distritos} handleChange={handleChange} isDisabled={!!show}/>
                        {((labelError) && !(trabajador.distrito_id)) &&
                            <div className="msj-error-registro-postulante">
                                Faltar llenar este campo.
                            </div>
                        }

                    </div>

                    <div className="col-12 col-lg-6">

                        <div className="mt-3 texto-casillas">Dirección donde vivo:</div>
                        <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                               name="direccion"
                               placeholder="Ingresa tu dirección"
                               value={trabajador.direccion}
                               onChange={ (e) => handleChange(e, 'direccion', 'text') }
                               disabled={!!show}
                        />
                        {((labelError) && !(trabajador.direccion)) &&
                            <div className="msj-error-registro-postulante">
                                Faltar llenar este campo.
                            </div>
                        }

                    </div>

                </section>

            </div>

            <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

                <h4 className="mb-3 texto-pasos">{stepCurrent}. COVID</h4>

                <section className="row mt-3">

                    <div className="col-12 col-lg-12">

                        <div className="mt-3 texto-casillas">Vacunas contra el covid:</div>
                        <SelectFormExterno value={trabajador.tiene_vacuna} isMulti={false} placeholder="Seleccione su respuesta" nombrecampo="tiene_vacuna" tipocampo="event" opciones={vacunasCovid} handleChange={handleChange} isDisabled={!!show} />

                        {((labelError) && !(trabajador.tiene_vacuna)) &&
                            <div className="msj-error-registro-postulante">Faltar llenar este campo.</div>
                        }

                    </div>

                </section>

            </div>

        </div>
    )
}
