import React from 'react';
import imgIniciarSesion from "../../../../../../public/img/new_version/bertha_fr_1_img.png";
import {getNombreCorto} from "../../../Helpers/strings.jsx";

export default function StepOne({trabajador, show}) {
    let nombre = trabajador ? getNombreCorto(trabajador.nombres, trabajador.apellidos) : '';

    let conditions = [
        '- La verificación de tus antecedentes y recomendaciones',
        '- Que toda tu información es real',
        '- Que vives en la dirección que nos brindes',
        '- Que gozas de salud física y mental',
        '- Que mostraremos tu información a nuestros empleadores',
    ]

    return (

        <div className="form-group mb-0 no-select-text pt-3 pt-lg-0">
            <div className="text-center">
                <img className="welcome-logo my-0" src={imgIniciarSesion}/>
                <div className="welcome-title">¡Hola {nombre}!</div>
                {show ? '' : <div className="welcome-subtitle">Al crear tu currículo, aceptas:</div> }
                {show ? '' :
                    <>
                        {conditions.map((c,key) =>
                            <div className="welcome-subtitle">{c}</div>
                        )}
                    </>
                }
            </div>
        </div>

    )
}
