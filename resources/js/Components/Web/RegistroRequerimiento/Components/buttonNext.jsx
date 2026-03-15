import React from 'react';

export default function ButtonNext({ step, next, requerimiento }) {

    let disable = false;

    // ⭐ STEP 1
    if (step.current === 1) {
        disable = !(
            requerimiento.actividad_id &&
            requerimiento.sueldo >= requerimiento.sueldoActividad &&
            requerimiento.ubicacion_id
        );
    }

    // ⭐ STEP 2
    if (step.current === 2) {

        const act = requerimiento.actividad_id?.value;

        const reglas = {
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

        disable = !reglas[act];
    }

    if (step.current < step.last) {
        return (
            <button
                className={
                    step.current === 1
                        ? 'bertha-pink-button button-registro'
                        : 'btn bertha-pink-button button-registro'
                }
                type="button"
                onClick={next}
                disabled={disable}
            >
                <b>Siguiente</b>
            </button>
        );
    }

    return null;
}

