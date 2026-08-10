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


const edadNinosES = [
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

const edadNinosEN = [
    "Under 1 year",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
    "9 years",
    "10 years",
    "11 years",
    "12 years"
];

const optionsEdadNinosES = edadNinosES.map((edad) => ({
    id: edad,
    text: edad,
}));

const optionsEdadNinosEN = edadNinosEN.map((edad) => ({
    id: edad,
    text: edad,
}));

export default function StepOne({handleChange, setFields, requerimiento , actividades, modalidades, nacionalidades, ubicaciones, nombreEmpleador, procedencia, tiposViviendas, handleDelete, handleAddition, handleDrag, lang = 'es'}) {

    let inputsueldo = '';

    if (requerimiento.sueldo && requerimiento.sueldo < requerimiento.sueldoActividad){
        inputsueldo = 'sueldo-minimo-input';
    }

    const optionsEdadNinos = lang === 'en'
        ? optionsEdadNinosEN
        : optionsEdadNinosES;

    const st1Text = {
        es: {
            inicio: '1. ¡Hola ' + nombreEmpleador + '! Llena todo tu requerimiento para que consigamos a tu trabajadora ideal. Son solo 2 pasos:',

            label1: 'Tipo de vivienda',
            phLabel1: 'Ingresa tu tipo de vivienda',

            label2: 'N° de pisos a limpiar',
            phLabel2: 'Ingresa tu n° de pisos',

            label3: 'N° de niños' + (requerimiento.actividad_id.value === 8 ? ' y/o bebés' : '') + ' (menores de 18 años)',
            phLabel3: 'Ingresa tu n° de niños',

            label4: 'Selecciona la edad de cada hijo(a)',

            advice: 'Si tiene <strong>13 años o más</strong>, inclúyelo  en el número de adultos.',

            label5: 'Edades seleccionadas',

            label6: 'N° de ' + (requerimiento.actividad_id.value === 3 ? 'pacientes' : 'adultos (o adolescentes desde los 13 años)'),
            phLabel6: 'Ingresa tu n° de adultos',

            label7: 'Edad(es) del(los) ' + (requerimiento.actividad_id.value === 3 ? 'paciente(s)' : 'adulto(s))'),

            label8: 'N° de mascotas',
            ttLabel8: 'Cuéntanos si tienes mascotas, ya que existen trabajadoras alérgicas y queremos buscar alguien que pueda querer a tu mascota',
            phLabel8: 'Ingresa tu n° de mascotas',

            label9: 'Ingresa el distrito de labores',
            ttLabel9: 'Escríbenos tu distrito, trabajamos en Lima Metropolitana, Callao y en todas las provincias de Lima',
            phLabel9: 'Escribe el distrito',

            dav: 'Agrega tu dirección (es completamente confidencial y no la compartimos con nadie)',
            dav1: 'Avenida/calle/jirón/pasaje (o Manzana o Lote) + número (o s/n) + referencia',
            dav2: 'Ejemplo: Av Los Ingenieros 771. Frente a la iglesia de los mormones.',
            dav3: 'Agrega tu direción'
        },
        en: {
            inicio: '1. Hello ' + nombreEmpleador + '! Fill out your request so we can find the ideal worker for your home. It’s just 2 steps:',

            label1: 'Type of housing',
            phLabel1: 'Enter your type of housing',

            label2: 'Number of floors to clean',
            phLabel2: 'Enter the number of floors',

            label3: 'Number of children' + (requerimiento.actividad_id.value === 8 ? ' and/or babies' : '') + ' (under 18 years old)',
            phLabel3: 'Enter the number of children',

            label4: 'Select the age of each child',
            advice: 'If they are <strong>13 years or older</strong>, include them in the number of adults.',

            label5: 'Selected ages',

            label6: 'Number of ' + (requerimiento.actividad_id.value === 3 ? 'patients' : 'adults (or teenagers from 13 years old)'),
            phLabel6: 'Enter the number of adults',

            label7: 'Age(s) of the ' + (requerimiento.actividad_id.value === 3 ? 'patient(s)' : 'adult(s)'),

            label8: 'Number of pets',
            ttLabel8: 'Tell us if you have pets, since some workers are allergic and we want to find someone who can love your pet.',
            phLabel8: 'Enter the number of pets',

            label9: 'Enter the work district',
            ttLabel9: 'Write your district. We work in Lima Metropolitana, Callao, and all provinces of Lima.',
            phLabel9: 'Write the district',

            dav: 'Add your address (it is completely confidential and we do not share it with anyone)',
            dav1: 'Avenue/street/alley/passage (or Block or Lot) + number (or n/a) + reference',
            dav2: 'Example: Av Los Ingenieros 771. In front of the Mormon church.',
            dav3: 'Enter address'
        }
    }

    return (

        <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

            <h4 className="mb-0 texto-pasos">{st1Text[lang].inicio}</h4>

            <section className="row">

                {[1,4,5].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">{st1Text[lang].label1}</div>
                        <SelectFormExterno value={requerimiento.tipoVivienda_id} placeholder={st1Text[lang].phLabel1} nombrecampo="tipoVivienda_id" tipocampo="evento" opciones={tiposViviendas} handleChange={handleChange} />
                    </div>
                }

                {[1,4,5,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">{st1Text[lang].label2}</div>
                        <SelectFormExterno value={requerimiento.numeroPisos} placeholder={st1Text[lang].phLabel2} nombrecampo="numeroPisos" tipocampo="evento" opciones={requerimiento.tipoVivienda_id.value === 2 ? optionsPisosDepa : optionsPisos} handleChange={handleChange} />
                    </div>
                }

                {[8].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">{st1Text[lang].label3}</div>
                        <SelectFormExterno value={requerimiento.numeroNinos} placeholder={st1Text[lang].phLabel3} nombrecampo="numeroNinos" tipocampo="evento" opciones={requerimiento.actividad_id.value === 7 ? options3 : options6} handleChange={handleChange} />
                    </div>
                }

                {[1,2,4,5,6,7,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12 pt-4'}>

                        <div className="mt-4 texto-casillas">{st1Text[lang].label4}</div>

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

                        <div
                            className="my-2 edadninosAdvice"
                            dangerouslySetInnerHTML={{ __html: '<i class="fa-solid fa-circle-info me-2"></i>' + st1Text[lang].advice }}
                        ></div>


                        {(requerimiento.edadNinos.length !== 0) &&
                            <>
                                <div className="mt-4 texto-casillas">{st1Text[lang].label5}</div>

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
                    </div>
                }

                {[1,2,5,8,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">{st1Text[lang].label6}</div>
                        <SelectFormExterno value={requerimiento.numeroAdultos} placeholder={st1Text[lang].phLabel6} nombrecampo="numeroAdultos" tipocampo="evento" opciones={([3,10].includes(requerimiento.actividad_id.value)) ? options3 : options} handleChange={handleChange} />
                    </div>
                }

                {[3,10].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <TagEdades custom={false} campo={requerimiento.edadAdultos} nombrecampo="edadAdultos" handleChange={handleChange} handleDelete={handleDelete} handleAddition={handleAddition} handleDrag={handleDrag} labelEdad={st1Text[lang].label7}/>
                    </div>
                }

                {[1,5,9].includes(requerimiento.actividad_id.value) &&
                    <div className={'col-12'}>
                        <div className="mt-4 texto-casillas">{st1Text[lang].label8}<Tooltips text={parse(st1Text[lang].ttLabel8)} estilo={"tooltip-formulario ms-2"} placement={'bottom'}/></div>
                        <SelectFormExterno value={requerimiento.numeroMascotas} placeholder={st1Text[lang].phLabel8} nombrecampo="numeroMascotas" tipocampo="evento" opciones={options10} handleChange={handleChange} />
                    </div>
                }

                <div className="col-12">
                    <div className="mt-4 texto-casillas">{st1Text[lang].label9}<Tooltips text={parse(st1Text[lang].ttLabel9)} estilo={"tooltip-formulario ms-2"} placement={'bottom'}/></div>
                    <SelectFormExterno value={requerimiento.ubicacion_id} isSearchable={true} placeholder={st1Text[lang].phLabel9} nombrecampo="ubicacion_id" tipocampo="evento" opciones={ubicaciones} handleChange={handleChange} />
                </div>

                <div className="col-12">
                    <div className="mt-4 texto-casillas">{st1Text[lang].dav}</div>
                    <div className={'secRl pb-1'}>{st1Text[lang].dav1}</div>
                    <div className={'secRl'}>{st1Text[lang].dav2}</div>
                    <input className="opacity-inputs form-control input-formulario mt-0 mb-3 texto-input"
                           name="centro"
                           type="text"
                           value={requerimiento.input_domicilio}
                           placeholder={st1Text[lang].dav3}
                           onChange={ (e) => handleChange(e, 'input_domicilio', 'text') }
                    />
                </div>

            </section>

        </div>

    )
}
