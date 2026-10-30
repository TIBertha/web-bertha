import React from 'react';
import Swal from 'sweetalert2';

export default function ButtonNext({ step, next, requerimiento, lang = 'es' }) {

    function validarStep1(requerimiento) {

        const faltantes = [];

        if (!requerimiento.tipoVivienda_id)
            faltantes.push('Tipo de vivienda');

        if (!requerimiento.numeroPisos)
            faltantes.push('Número de pisos');

        if (!requerimiento.numeroAdultos)
            faltantes.push('Número de adultos');

        if (!requerimiento.numeroMascotas)
            faltantes.push('Número de mascotas');

        return faltantes;
    }

    let disable = false;

    // ⭐ STEP 1
    if (step.current === 1) {

        const act = requerimiento.actividad_id?.value;

        const reglasActividad = {
            1: requerimiento.tipoVivienda_id && requerimiento.numeroPisos && requerimiento.numeroAdultos && requerimiento.numeroMascotas,
            2: requerimiento.numeroAdultos && requerimiento.edadNinos.length > 0,
            3: requerimiento.edadAdultos.length > 0,
            4: requerimiento.tipoVivienda_id && requerimiento.numeroPisos,
            5: requerimiento.tipoVivienda_id && requerimiento.numeroPisos && requerimiento.numeroAdultos,
            6: requerimiento.edadNinos.length > 0,
            7: requerimiento.edadNinos.length > 0,
            8: requerimiento.edadAdultos && requerimiento.numeroNinos,
            9: requerimiento.numeroPisos && requerimiento.numeroAdultos && requerimiento.numeroMascotas,
            10: requerimiento.edadAdultos.length > 0,
        };

        /*const reglasStep1Base =
            requerimiento.actividad_id &&
            requerimiento.sueldo >= requerimiento.sueldoActividad &&
            requerimiento.ubicacion_id;*/

        const reglasStep1Actividad = reglasActividad[act];

        disable = !(/*reglasStep1Base &&*/ reglasStep1Actividad);
    }

    // ⭐ STEP 2
    /*if (step.current === 2) {
        disable = !(
            requerimiento.actividad_id &&
            requerimiento.sueldo >= requerimiento.sueldoActividad
        );
    }*/

    const campos = {
        es: {
            tipoVivienda: 'Tipo de vivienda',
            numeroPisos: 'Número de pisos',
            numeroAdultos: 'Número de adultos',
            numeroMascotas: 'Número de mascotas',
            edadNinos: 'Edad de los niños',
            edadAdultos: 'Edad de los adultos',
            numeroNinos: 'Número de niños',
            selectDistrito: 'Seleccionar distrito de labores',
            domicilio: 'Agregar tu dirección'
        },
        en: {
            tipoVivienda: 'Type of residence',
            numeroPisos: 'Number of floors',
            numeroAdultos: 'Number of adults',
            numeroMascotas: 'Number of pets',
            edadNinos: 'Children ages',
            edadAdultos: 'Adults ages',
            numeroNinos: 'Number of children',
            selectDistrito: 'Select city',
            domicilio: 'Type your address'
        }
    };

    const validarActividad = (actividad, requerimiento, lang) => {

        const t = campos[lang] || campos.es;
        const faltantes = [];

        switch (actividad) {

            case 1:

                if (!requerimiento.tipoVivienda_id)
                    faltantes.push(t.tipoVivienda);

                if (!requerimiento.numeroPisos)
                    faltantes.push(t.numeroPisos);

                if (!requerimiento.numeroAdultos)
                    faltantes.push(t.numeroAdultos);

                if (!requerimiento.numeroMascotas)
                    faltantes.push(t.numeroMascotas);

                if (!requerimiento.ubicacion_id)
                    faltantes.push(t.selectDistrito);

                if (!requerimiento.input_domicilio)
                    faltantes.push(t.domicilio);

                break;

            case 2:

                if (!requerimiento.numeroAdultos)
                    faltantes.push(t.numeroAdultos);

                if (!requerimiento.edadNinos?.length)
                    faltantes.push(t.edadNinos);

                if (!requerimiento.numeroMascotas)
                    faltantes.push(t.numeroMascotas);

                if (!requerimiento.ubicacion_id)
                    faltantes.push(t.selectDistrito);

                if (!requerimiento.input_domicilio)
                    faltantes.push(t.domicilio);

                break;

            case 3:

                if (!requerimiento.edadAdultos?.length)
                    faltantes.push(t.edadAdultos);

                if (!requerimiento.numeroMascotas)
                    faltantes.push(t.numeroMascotas);

                if (!requerimiento.ubicacion_id)
                    faltantes.push(t.selectDistrito);

                if (!requerimiento.input_domicilio)
                    faltantes.push(t.domicilio);

                break;
        }

        return faltantes;
    };

    const handleNext = () => {

        if (step.current === 1) {

            const faltantes = validarActividad(
                requerimiento.actividad_id?.value,
                requerimiento,
                lang
            );

            if (faltantes.length > 0) {

                Swal.fire({
                    icon: 'warning',
                    title: lang === 'en'
                        ? 'Incomplete information'
                        : 'Información incompleta',

                    html: `
                    <div style="text-align:left">
                        ${faltantes.map(x => `• ${x}`).join('<br>')}
                    </div>
                `,

                    confirmButtonText: lang === 'en'
                        ? 'Continue'
                        : 'Continuar',
                    confirmButtonColor: '#47187D'
                });

                return;
            }
        }

        next();
    };

    if (step.current < step.last) {
        return (
            <button
                className={
                    step.current === 1
                        ? 'bertha-pink-button button-registro'
                        : 'btn bertha-pink-button button-registro'
                }
                type="button"
                onClick={handleNext}
            >
                <b>{lang === 'en' ? 'Next' :'Siguiente'}</b>
            </button>
        );
    }

    return null;
}

