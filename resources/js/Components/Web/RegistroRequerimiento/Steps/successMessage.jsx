import React from "react";

export default function SuccessMessage({url, nombreEmpleador, lang = 'es'}) {

    const whatsAppLink =
        'https://api.whatsapp.com/send?phone=51999256807&text=Hola%2C%20soy%20' +
        nombreEmpleador +
        '%2C%20acabo%20de%20realizar%20un%20requerimiento%20por%20la%20web%20solicitando%20una%20trabajadora%20para%20mi%20hogar.%20¡Espero%20tu%20respuesta,%20gracias!';

    const text = {
        es: {
            title: "Requerimiento Exitoso",
            paragraph:
                "Hemos recibido tu requerimiento, comunicaremos tu oferta a la trabajadora(s) escogida. Si no acepta, nosotros buscaremos su reemplazo. Da clic a \"Ok\" ¡Te ayudaremos lo mejor posible!",
            button: "Ok"
        },
        en: {
            title: "Request Successful",
            paragraph:
                "We have received your request and will communicate your offer to the selected worker(s). If she does not accept, we will find a replacement for you. Click \"Ok\" — we will assist you as best as possible!",
            button: "Ok"
        }
    };

    const t = text[lang] ?? text['es'];

    return (
        <section className="confirmar-registro-postulante-form">
            <div className="confirmar-requerimiento-form-content">
                <div>

                    <h1 className="confirmar-requerimiento-title-form">
                        <i className="fas fa-check-circle icon-success me-2"></i>
                        {t.title}
                    </h1>

                    <hr/>

                    <p className="mb-4 mt-3">{t.paragraph}</p>

                    <div className="row mb-3">
                        <div className="col-12">
                            <a
                                className="btn bertha-purple-button full-size"
                                type="button"
                                href={whatsAppLink}
                                target={'_self'}
                            >
                                {t.button}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

