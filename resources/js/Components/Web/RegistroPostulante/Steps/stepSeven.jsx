import React, {useState} from 'react';
import ModalVideo from "../Components/modalVideo.jsx";

export default function StepSeven({labelError, trabajador, show, stepCurrent, handleChange}) {
    const [isOpenVideoYoutube, setIsOpenVideoYoutube] = useState(false);
    const video = 'https://youtu.be/iBnCDjVOj3Y';

    return (

        <div className="form-group mb-0 no-select-text pt-3 pt-lg-0">

            <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">

                <ModalVideo channel='youtube' isOpen={isOpenVideoYoutube} url={video} onClose={ () => setIsOpenVideoYoutube(false) } />

                <h4 className="mb-0 texto-pasos">{stepCurrent}.  VIDEO DE PRESENTACIÓN</h4>
                <div className="subtitulo-pasos">
                    <p>Finalmente, envía tu video de presentación para que los empleadores se convenzan de contratarte.</p>
                    <p className="mb-1">A) Di solo tus nombre <b>(No digas tus apellidos)</b>.</p>
                    <p className="mb-1">B) Di el lugar donde naciste.</p>
                    <p className="mb-1">C) Di tus cualidades (Responsable, honesta, puntual).  <span className="ver-compromiso" onClick={ () => setIsOpenVideoYoutube(true)}>Ver Ejemplo</span></p>
                </div>

            </div>

        </div>

    )
}
