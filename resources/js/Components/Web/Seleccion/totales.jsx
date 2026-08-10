import React from "react";
import {mobileDesktop} from "../../Functions/General.jsx";

export default function Totales({ total, cart, finalizar, country , lang = 'es'}) {

    let display = mobileDesktop();

    const textAvailable = {
        es: "trabajadoras disponibles",
        en: "domestic workers available"
    };

    const textInterviewLimit = {
        es: "Entrevista hasta 2 trabajadoras",
        en: "Interview up to 2 domestic workers"
    };

    const textContinue = {
        es: "Continuar",
        en: "Continue"
    };

    return (
        <>
            <div className="row pb-3 mx-2">
                <div className="col-6 px-0">
                    <div className="text-start text-muted text-result">
                        {total ? total : 0} {textAvailable[lang]}
                    </div>
                </div>

                <div className="col-6 px-0">
                    <div className="text-end text-muted text-result">
                        {textInterviewLimit[lang]}
                        {display === 'desktop' &&
                            <>
                                {cart.length > 0 ? (
                                    <button
                                        className="btn bertha-green-button btn-sm ms-3 font-weight-bold btn-finalizar-seleccion"
                                        onClick={() => finalizar()}
                                    >
                                        {textContinue[lang]}
                                    </button>
                                ) : (
                                    ""
                                )}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
