import React from "react";
import parse from "html-react-parser";

import { IMaskInput } from "react-imask";

import SelectFormExterno from "../../Components/selectFormExterno.jsx";
import Tooltips from "../../Components/tooltips.jsx";
import TagEdades from "../Components/tagEdades.jsx";

const makeNumberOptions = (max) =>
    Array.from({ length: max + 1 }, (_, i) => ({
        value: String(i),
        label: String(i)
    }));

const options = makeNumberOptions(8);
const options6 = makeNumberOptions(6);
const options10 = makeNumberOptions(10);

const makeRangeOptions = (min, max) =>
    Array.from({ length: max - min + 1 }, (_, i) => {
        const val = min + i;
        return { value: String(val), label: String(val) };
    });

const options3 = makeRangeOptions(1, 3);
const optionsPisos = makeRangeOptions(1, 5);

const optionsPisosDepa = [
    { value: '1', label: 'Flat (1 piso)' },
    { value: '2', label: 'Dúplex (2 pisos)' },
    { value: '3', label: 'Triplex (3 pisos)' },
];


const edadNinos = [
    "Menor a 1 año",
    "1 año",
    "2 años",
    "3 años",
    "4 años",
    "5 años",
    "6 años",
    "7 años",
    "8 años",
    "9 años",
    "10 años",
    "11 años",
    "12 años"
];

const optionsEdadNinos = edadNinos.map((edad) => ({
    id: edad,
    text: edad,
}));

export default function StepOne({handleChange, setFields, requerimiento , actividades, modalidades, nacionalidades, ubicaciones, nombreEmpleador, procedencia, tiposViviendas, handleDelete, handleAddition, handleDrag}) {

    let inputsueldo = '';

    if (requerimiento.sueldo && requerimiento.sueldo < requerimiento.sueldoActividad){
        inputsueldo = 'sueldo-minimo-input';
    }

    return (

        <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

            <h4 className="mb-0 texto-pasos">{'1. ¡Hola ' + nombreEmpleador + '! Llena todo tu requerimiento para que consigamos a tu trabajadora ideal. Son solo 3 pasos:' }</h4>

            <section className="row">

                {[1,4,5].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">Tipo de vivienda</div>
                        <SelectFormExterno value={requerimiento.tipoVivienda_id} placeholder="Ingresa tu tipo de vivienda" nombrecampo="tipoVivienda_id" tipocampo="evento" opciones={tiposViviendas} handleChange={handleChange} />
                    </div>
                }

                {[1,4,5,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">N° de pisos a limpiar</div>
                        <SelectFormExterno value={requerimiento.numeroPisos} placeholder="Ingresa tu n° de pisos" nombrecampo="numeroPisos" tipocampo="evento" opciones={requerimiento.tipoVivienda_id.value === 2 ? optionsPisosDepa : optionsPisos} handleChange={handleChange} />
                    </div>
                }

                {[8].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">{'N° de niños' + (requerimiento.actividad_id.value === 8 ? ' y/o bebés' : '') + ' (menores de 18 años)'}</div>
                        <SelectFormExterno value={requerimiento.numeroNinos} placeholder="Ingresa tu n° de niños" nombrecampo="numeroNinos" tipocampo="evento" opciones={requerimiento.actividad_id.value === 7 ? options3 : options6} handleChange={handleChange} />
                    </div>
                }

                {[1,2,4,5,6,7,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12 pt-4'}>

                        <div className="mt-4 texto-casillas">Edad de tu(s) hijo(s)</div>
                        <div className="mt-0 edadninosAdvice"><i className="fa-solid fa-circle-info me-2"></i> Si tiene <strong>13 años o más</strong>, inclúyelo  en el número de adultos.</div>

                        <div className={'optionsEdadesNinos'}>
                            <div className={'row mx-0'}>
                                {optionsEdadNinos.map((d) =>  {
                                    return(
                                        <div className={'col-auto px-0'}>
                                            <div className={'option'} onClick={(e) => handleAddition(e, 'edadNinos', d.id)}>
                                                {d.text}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {(requerimiento.edadNinos.length !== 0) &&
                            <>
                                <div className="mt-4 texto-casillas">Edades seleccionadas</div>

                                <div className={'edadesSeleccionadas'}>
                                    <div className={'row mx-0'}>
                                        {requerimiento.edadNinos.map((en, index) =>  {
                                            return(
                                                <div className={'col-auto px-0'}>
                                                    <div className={'seleccionados'}>
                                                        {en.text} <i className="fa-solid fa-xmark ms-3 deleteSeleccionado" onClick={(e) => handleDelete(index, 'edadNinos')}></i>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>

                        }

                        {/*
                            <TagEdades custom={[1,2,4,5,9].includes(requerimiento.actividad_id.value)} campo={requerimiento.edadNinos} nombrecampo="edadNinos" handleChange={handleChange} handleDelete={handleDelete} handleAddition={handleAddition} handleDrag={handleDrag} labelEdad={label.EdadNino}/>
                            */}

                    </div>
                }

                {[1,2,5,8,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">{'N° de ' + (requerimiento.actividad_id.value === 3 ? 'pacientes' : 'adultos (o adolescentes desde los 13 años)')}</div>
                        <SelectFormExterno value={requerimiento.numeroAdultos} placeholder="Ingresa tu n° de adultos" nombrecampo="numeroAdultos" tipocampo="evento" opciones={([3,10].includes(requerimiento.actividad_id.value)) ? options3 : options} handleChange={handleChange} />
                    </div>
                }

                {[3,10].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <TagEdades custom={false} campo={requerimiento.edadAdultos} nombrecampo="edadAdultos" handleChange={handleChange} handleDelete={handleDelete} handleAddition={handleAddition} handleDrag={handleDrag} labelEdad={'Edad(es) del(los) ' + (requerimiento.actividad_id.value === 3 ? 'paciente(s)' : 'adulto(s))')}/>
                    </div>
                }

                {[1,5,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">N° de mascotas<Tooltips text={parse('Cuéntanos si tienes mascotas, ya que existen trabajadoras alérgicas y queremos buscar alguien que pueda querer a tu mascota')} estilo={"tooltip-formulario ms-2"} placement={'bottom'}/></div>
                        <SelectFormExterno value={requerimiento.numeroMascotas} placeholder="Ingresa tu n° de mascotas" nombrecampo="numeroMascotas" tipocampo="evento" opciones={options10} handleChange={handleChange} />
                    </div>
                }

                {/*
                <div className="col-12">
                    <div className="mt-4 texto-casillas">Actividad</div>
                    <SelectFormExterno value={requerimiento.actividad_id} placeholder="Seleccione la actividad" nombrecampo="actividad_id" tipocampo="evento" opciones={actividades} handleChange={handleChange} />
                </div>

                <div className="col-12">
                    <div className="mt-4 texto-casillas">Modalidad</div>
                    <SelectFormExterno value={requerimiento.modalidad_id} placeholder="Seleccione la modalidad" nombrecampo="modalidad_id" tipocampo="evento" opciones={modalidades} handleChange={handleChange} />
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
                        <div>
                            <p className="sueldo-minimo-span mb-0">{'El sueldo es desde ' + requerimiento.divisa + requerimiento.sueldoActividad}</p>
                        </div>
                    }

                </div>
                */}


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

            </section>

        </div>

    )
}
