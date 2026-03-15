import {useState} from 'react';
import moment from "moment";
import {textLower} from "../../../Helpers/strings.jsx";
import {armarhorarioCFPD, ajaxRefreshOptionsRegistroRequerimiento} from "../../../Functions/RegistroRequerimiento.jsx";

export default function UseFormRequerimiento(initialState= {}) {

    const [value, setValue] = useState(initialState);

    const reset = () => {
        setValue( initialState );
    };

    const forceInputUppercase = (e) => {
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        e.target.value = e.target.value.toUpperCase();
        e.target.setSelectionRange(start, end);
    };

    const handleChange = (valor, nombrecampo, tipo = 'text') => {

        if (tipo === 'tags'){

            if (nombrecampo === 'edadNinos'){
                setValue({...value,
                    inputTag1: valor,
                });
            }else if (nombrecampo === 'edadAdultos'){
                setValue({...value,
                    inputTag2: valor,
                });
            }

        }else if(tipo === 'text'){

            setValue({...value, [ nombrecampo ]: valor.target.value.toUpperCase() });

            forceInputUppercase(valor);

        }else if (tipo == 'evento'){

            if (["actividad_id", "modalidad_id"].includes(nombrecampo)){

                let modalidadValue = nombrecampo === 'modalidad_id' ? valor.value : value.modalidad_id.value;
                let actividadValue = nombrecampo === 'actividad_id' ? valor.value : value.actividad_id.value;

                ajaxRefreshOptionsRegistroRequerimiento(modalidadValue, actividadValue, value.sueldoActividad).then(result => {

                    setValue({...value,
                        [nombrecampo]: valor,
                        sueldo: value.modalidad_id.label === 3 ? '' : value.sueldo,
                        actividades: result.actividades,
                        modalidades: result.modalidades,
                        placeHolderSueldo: result.placeHolderSueldo,
                        sueldoActividad: result.sueldoActividad,
                        horarios: [2,3].includes(modalidadValue) ? armarhorarioCFPD(modalidadValue) : [],
                    });
                });

            }else if(nombrecampo === 'tipoDescanso_id') {
                setValue(prev => {
                    const isEspecial = [8, 9].includes(valor.value);

                    return {
                        ...value,
                        [nombrecampo]: valor,
                        diaSalida: isEspecial ? { label: "Sábado", value: 6 } : null,
                        diaIngreso: isEspecial ? { label: "Domingo", value: 7 } : null,
                        horaSalida: isEspecial ? { label: "03:00 pm", value: 13 } : null,
                        horaIngreso: isEspecial ? { label: "07:00 pm", value: 19 } : null,
                        diaDescansoCamaDentro: isEspecial ? "De sábado a domingo" : null,
                    };
                });


            }else{
                setValue({...value,
                    [nombrecampo]: valor,
                });
            }

        }else if (tipo === 'time'){

            if (["diaIngreso", "diaSalida"].includes(nombrecampo)){

                const nuevoDiaIngreso =
                    nombrecampo === "diaIngreso"
                        ? valor.label
                        : value.diaIngreso.label;

                const nuevoDiaSalida =
                    nombrecampo === "diaSalida"
                        ? valor.label
                        : value.diaSalida.label;

                const diaDescanso = changeDiaIngresoSalida(nuevoDiaIngreso, nuevoDiaSalida);

                setValue({...value,
                    [nombrecampo]: valor ,
                    diaDescansoCamaDentro: diaDescanso
                });

            }else{
                setValue({...value,
                    [nombrecampo]: valor
                });
            }
        }else{

            setValue({...value,
                [nombrecampo]: valor
            });

        }
    };

    function changeDiaIngresoSalida(diaIngreso, diaSalida){

        let result = '';

        if(diaSalida === diaIngreso){
            result = diaSalida;
        }else{
            result = 'De ' + textLower(diaSalida) + ' a ' + textLower(diaIngreso);
        }

        return result;

    };

    /*const setFields = (target) => {
        setValue({...value, ...target});
    };*/

    const setFields = (target) => {
        const normalized = {
            ...target,
            edadNinos: Array.isArray(target.edadNinos)
                ? target.edadNinos
                : [],
        };

        setValue(prev => ({ ...prev, ...normalized }));
    };


    const handleDelete = (valor, nombrecampo) => {

        if (nombrecampo === 'edadBebes'){
            setValue({...value,
                [ nombrecampo ]: value.edadBebes.filter((tag, index) => index !== valor)
            })
        }else if (nombrecampo === 'edadNinos'){
            setValue({...value,
                [ nombrecampo ]: value.edadNinos.filter((tag, index) => index !== valor)
            })
        }else if (nombrecampo === 'edadAdultos'){
            setValue({...value,
                [ nombrecampo ]: value.edadAdultos.filter((tag, index) => index !== valor)
            })
        }

    };

    const handleAddition = (valor, nombrecampo) => {

        if (nombrecampo === 'edadBebes'){
            setValue(state => ({ ...value,edadBebes: [...value.edadBebes,valor] }))
        }else if (nombrecampo === 'edadNinos'){
            setValue(state => ({ ...value,edadNinos: [...value.edadNinos,valor] }))
        }else if (nombrecampo === 'edadAdultos'){
            setValue(state => ({ ...value,edadAdultos: [...value.edadAdultos,valor] }))
        }

    };

    const handleDrag = (tag, currPos, newPos, nombrecampo) => {

        let edades = '';

        if (nombrecampo === 'edadBebes'){
            edades = [...value.edadBebes];
        }else if (nombrecampo === 'edadNinos'){
            edades = [...value.edadNinos];
        }else if (nombrecampo === 'edadAdultos'){
            edades = [...value.edadAdultos];
        }

        let newTags = edades.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setValue({...value, [ nombrecampo ]: newTags});

    };

    const handleChangeHorarios = (valor, id, nombrecampo) => {

        const newHorarios = value.horarios.map(item => {

            if (item.id !== id) return item;

            const nuevoValor =
                nombrecampo === "isDescanso"
                    ? valor.target.checked
                    : valor
                        ? moment(valor).format()
                        : valor;

            return {
                ...item,
                [nombrecampo]: nuevoValor
            };
        });

        setValue({
            ...value,
            horarios: newHorarios
        });
    };

    return [ value, handleChange, handleDelete, handleAddition, handleDrag, handleChangeHorarios,setFields, reset ];
}
