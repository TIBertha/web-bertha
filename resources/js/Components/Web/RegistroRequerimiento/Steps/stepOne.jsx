import React from "react";
import parse from "html-react-parser";

import { IMaskInput } from "react-imask";

import SelectFormExterno from "../../Components/selectFormExterno.jsx";
import Tooltips from "../../Components/tooltips.jsx";

export default function StepOne({handleChange, setFields, requerimiento , actividades, modalidades, nacionalidades, ubicaciones, nombreEmpleador, procedencia}) {

    let inputsueldo = '';

    if (requerimiento.sueldo && requerimiento.sueldo < requerimiento.sueldoActividad){
        inputsueldo = 'sueldo-minimo-input';
    }

    return (

        <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

            <h4 className="mb-0 texto-pasos">{'1. ¡Hola ' + nombreEmpleador + '! Llena todo tu requerimiento para que consigamos a tu trabajadora ideal. Son solo 3 pasos:' }</h4>

            <section className="row">

                <div className="col-12">
                    <div className="mt-4 texto-casillas">Actividad</div>
                    <SelectFormExterno value={requerimiento.actividad_id} placeholder="Seleccione la actividad" nombrecampo="actividad_id" tipocampo="evento" opciones={actividades} handleChange={handleChange} />
                </div>

                <div className="col-12">
                    <div className="mt-4 texto-casillas">Modalidad</div>
                    <SelectFormExterno value={requerimiento.modalidad_id} placeholder="Seleccione la modalidad" nombrecampo="modalidad_id" tipocampo="evento" opciones={modalidades} handleChange={handleChange} />
                </div>

                <div className="col-12">
                    <div className="mt-4 texto-casillas">Ingresa el distrito de labores<Tooltips text={parse(requerimiento.paispedido_id === 11 ? 'Escríbenos tu comuna, trabajamos en todas las comunas de La Región Metropolitana de Santiago.' : 'Escríbenos tu distrito, trabajamos en Lima Metropolitana, Callao y en todas las provincias de Lima')} estilo={"tooltip-formulario ms-2"} placement={'bottom'}/></div>
                    <SelectFormExterno value={requerimiento.ubicacion_id} isSearchable={true} placeholder="Escribe el distrito" nombrecampo="ubicacion_id" tipocampo="evento" opciones={ubicaciones} handleChange={handleChange} />
                </div>

                <div className="col-12">
                    <div className="mt-4 texto-casillas">Agrega tu dirección (es completamente confidencial y no la compartimos con nadie)</div>
                    <div className={'secRl pb-1'}>Avenida/calle/jirón/pasaje (o Manzana o Lote) + número (o s/n) + referencia</div>
                    <div className={'secRl'}>Ejemplo: Av Los Ingenieros 771. Frente a la iglesia de los mormones.</div>
                    <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                           name="centro"
                           type="text"
                           value={requerimiento.input_domicilio}
                           placeholder="Agrega tu direción"
                           onChange={ (e) => handleChange(e, 'input_domicilio', 'text') }
                    />
                </div>

                <div className="col-12">
                    <div className="mt-4 texto-casillas">{'Sueldo ' + (requerimiento.modalidad_id.value === 3 ? 'diario' : 'mensual') + ' a ofrecer'}<Tooltips text={parse('El sueldo debe ser igual o superior al referencial. Recuerda que, si elevas el sueldo, tendrás más posibilidades de encontrar un trabajador con recomendaciones')} estilo={"tooltip-formulario ms-2"} placement={'bottom'}/></div>
                    <IMaskInput
                        type="tel"
                        className={'opacity-inputs form-control input-formulario mt-0 texto-input ' + inputsueldo}
                        placeholder={requerimiento.placeHolderSueldo}
                        value={requerimiento.sueldo}
                        onChange={(e) => handleChange(e, 'sueldo')}
                        name="sueldo"
                    />

                    {(requerimiento.sueldo && (requerimiento.sueldo < (requerimiento.sueldoActividad ? requerimiento.sueldoActividad : 0)) ) &&
                        <div className="espacio">
                            <p className="sueldo-minimo-span mb-0">{'El sueldo es desde ' + requerimiento.divisa + requerimiento.sueldoActividad}</p>
                        </div>
                    }

                </div>

            </section>

        </div>

    )
}
