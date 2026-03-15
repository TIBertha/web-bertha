import React, {useState } from "react";

export default function ContactLabel({url, path}) {

    const text = path.includes('/es-pe/busco-trabajo') ? 'Escríbenos también al ' : 'Solicita también a tu trabajadora del hogar vía WhatsApp, escribiendo al ';

    return (
        <section id="cintillo" className="px-3 px-md-5 py-2 px-md-4 contact-label bgb-pink">
            <div className="mx-auto text-center">
                <h4 className="display-5 title-tlf-whatsapp">{text}
                    <a className="number-breaker" href={'https://api.whatsapp.com/send?phone=51999256807'}
                       target="_blank">+51 999 256 807</a>
                </h4>
            </div>
        </section>
    )
}
