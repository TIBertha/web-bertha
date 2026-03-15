import React from "react";

export default function SuccessMessage({url, nombreEmpleador}) {
    let whatsAppLink = 'https://api.whatsapp.com/send?phone=51999256807&text=Hola%2C%20soy%20' + nombreEmpleador + '%2C%20acabo%20de%20realizar%20un%20requerimiento%20por%20la%20web%20solicitando%20una%20trabajadora%20para%20mi%20hogar.%20¡Espero%20tu%20respuesta,%20gracias!';

    return (
        <section className="confirmar-registro-postulante-form">
            <div className="confirmar-requerimiento-form-content">
                <div>

                    <h1 className="confirmar-requerimiento-title-form"><i className="fas fa-check-circle icon-success me-2"></i>Requerimiento Exitoso</h1>

                    <hr/>

                    <p className="mb-4 mt-3">Hemos recibido tu requerimiento, comunicaremos tu oferta a la trabajadora(s) escogida. Si no acepta, nosotros buscaremos su reemplazo. Da clic a "Ok" ¡Te ayudaremos lo mejor posible!</p>

                    <div className="row mb-3">
                        <div className="col-12">
                            <a className="btn bertha-purple-button full-size" type="button" href={whatsAppLink} target={'_self'}>Ok</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )

}
