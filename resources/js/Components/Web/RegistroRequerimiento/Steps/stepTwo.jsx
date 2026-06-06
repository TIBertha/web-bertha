import React from "react";
import parse from "html-react-parser";

import Tooltips from "../../Components/tooltips.jsx";

import SelectFormExterno from "../../Components/selectFormExterno.jsx";

import TagEdades from "../Components/tagEdades.jsx";
import imgEnterButton from "../../../../../../public/img/enter-button.jpg";
import imgCommaButton from "../../../../../../public/img/comma-button.png";

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

export default function StepTwo({handleChange, handleDelete, handleAddition, handleDrag, requerimiento, tiposViviendas}) {
    let estilo = {TipoVivienda: '', NumeroPisos: '', NumeroNinos: '', EdadNinos: '', NumeroAdultos: '', EdadAdultos: '', NumeroMascotas: ''};


    if ([1,5].includes(requerimiento.actividad_id.value)){
        estilo.TipoVivienda = 'col-12 col-lg-12 order-1';
        estilo.NumeroPisos = "col-12 col-lg-12 order-2";
        estilo.NumeroAdultos = "col-12 col-lg-12 order-3";
        estilo.EdadNinos = "col-12 col-lg-12 order-4";
        estilo.NumeroMascotas = "col-12 col-lg-12 order-5";
    }else if ([2,8].includes(requerimiento.actividad_id.value)){
        estilo.NumeroAdultos = 'col-12 col-lg-12 order-1';
        if ([2].includes(requerimiento.actividad_id.value)){
            estilo.EdadNinos = 'col-12 col-lg-12 order-3';
        }
        if ([8].includes(requerimiento.actividad_id.value)){
            estilo.NumeroNinos = 'col-12 col-lg-12 order-3';
        }
    }else if ([3,10].includes(requerimiento.actividad_id.value)){
        estilo.EdadAdultos = 'col-12 order-2';
    }else if ([6,7].includes(requerimiento.actividad_id.value)){
        estilo.EdadNinos = "col-12 order-2";
    }else if ([4,9].includes(requerimiento.actividad_id.value)){
        estilo.EdadNinos = 'col-12 col-lg-12 order-4';
        if ([4].includes(requerimiento.actividad_id.value)){
            estilo.TipoVivienda = 'col-12 col-lg-6 order-2';
            estilo.NumeroPisos = 'col-12 col-lg-6 order-3';
        }
        if ([9].includes(requerimiento.actividad_id.value)){
            estilo.NumeroPisos = 'col-12 col-lg-12 order-2';
            estilo.NumeroAdultos = 'col-12 col-lg-12 order-3';
            estilo.NumeroMascotas = 'col-12 col-lg-12 order-5';
        }
    }

    let label = {EdadNino: ''};

    if ([1,2,4,5,9].includes(requerimiento.actividad_id.value)){
        label.EdadNino = 'N° de niños';
    }else if (requerimiento.actividad_id.value === 6){
        label.EdadNino = 'Edad(es) del(los) bebé(s)'
    }

    return (
        <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">
            <h4 className="mb-0 texto-pasos">2. Ahora, cuéntanos sobre tu hogar</h4>

            {requerimiento.actividad_id &&
                <section className="row">

                    {[1,4,5].includes(requerimiento.actividad_id.value) &&
                        <div className={estilo.TipoVivienda}>
                            <div className="mt-4 texto-casillas">Tipo de vivienda</div>
                            <SelectFormExterno value={requerimiento.tipoVivienda_id} placeholder="Ingresa tu tipo de vivienda" nombrecampo="tipoVivienda_id" tipocampo="evento" opciones={tiposViviendas} handleChange={handleChange} />
                        </div>
                    }

                    {[1,4,5,9].includes(requerimiento.actividad_id.value) &&
                        <div className={estilo.NumeroPisos}>
                            <div className="mt-4 texto-casillas">N° de pisos a limpiar</div>
                            <SelectFormExterno value={requerimiento.numeroPisos} placeholder="Ingresa tu n° de pisos" nombrecampo="numeroPisos" tipocampo="evento" opciones={requerimiento.tipoVivienda_id.value === 2 ? optionsPisosDepa : optionsPisos} handleChange={handleChange} />
                        </div>
                    }

                    {[8].includes(requerimiento.actividad_id.value) &&
                        <div className={estilo.NumeroNinos}>
                            <div className="mt-4 texto-casillas">{'N° de niños' + (requerimiento.actividad_id.value === 8 ? ' y/o bebés' : '') + ' (menores de 18 años)'}</div>
                            <SelectFormExterno value={requerimiento.numeroNinos} placeholder="Ingresa tu n° de niños" nombrecampo="numeroNinos" tipocampo="evento" opciones={requerimiento.actividad_id.value === 7 ? options3 : options6} handleChange={handleChange} />
                        </div>
                    }

                    {[1,2,4,5,6,7,9].includes(requerimiento.actividad_id.value) &&
                        <div className={estilo.EdadNinos + ' pt-4'}>

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
                        <div className={estilo.NumeroAdultos}>
                            <div className="mt-4 texto-casillas">{'N° de ' + (requerimiento.actividad_id.value === 3 ? 'pacientes' : 'adultos (o adolescentes desde los 13 años)')}</div>
                            <SelectFormExterno value={requerimiento.numeroAdultos} placeholder="Ingresa tu n° de adultos" nombrecampo="numeroAdultos" tipocampo="evento" opciones={([3,10].includes(requerimiento.actividad_id.value)) ? options3 : options} handleChange={handleChange} />
                        </div>
                    }

                    {[3,10].includes(requerimiento.actividad_id.value) &&
                        <div className={estilo.EdadAdultos}>
                            <TagEdades custom={false} campo={requerimiento.edadAdultos} nombrecampo="edadAdultos" handleChange={handleChange} handleDelete={handleDelete} handleAddition={handleAddition} handleDrag={handleDrag} labelEdad={'Edad(es) del(los) ' + (requerimiento.actividad_id.value === 3 ? 'paciente(s)' : 'adulto(s))')}/>
                        </div>
                    }

                    {[1,5,9].includes(requerimiento.actividad_id.value) &&
                        <div className={estilo.NumeroMascotas}>
                            <div className="mt-4 texto-casillas">N° de mascotas<Tooltips text={parse('Cuéntanos si tienes mascotas, ya que existen trabajadoras alérgicas y queremos buscar alguien que pueda querer a tu mascota')} estilo={"tooltip-formulario ms-2"} placement={'bottom'}/></div>
                            <SelectFormExterno value={requerimiento.numeroMascotas} placeholder="Ingresa tu n° de mascotas" nombrecampo="numeroMascotas" tipocampo="evento" opciones={options10} handleChange={handleChange} />
                        </div>
                    }

                </section>
            }

        </div>
    )
}
