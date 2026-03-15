import React from 'react';

export default function ButtonNext({step, next, trabajador, typeform, show, disableButtonNext}) {

    if( step.current < step.last ){

        return (

            <button
                className={
                    step.current === 1
                        ? 'bertha-pink-button button-registro'
                        : 'btn bertha-pink-button button-registro'
                }
                type="button"
                onClick={next}
                disabled={disableButtonNext}
            >
                <b>{step.current === 1 ? ( show ? 'Ver' : 'Aceptar y Empezar') : 'Siguiente'}</b>
            </button>

        );

    }else{
        return null;
    }
}
