import React from "react";
import {getCountryData, mobileDesktop} from "../../Functions/General.jsx";

export default function ContactLabel({ url, path, lang = 'es', country = 'pe'}) {
    const display = mobileDesktop();
    const countryData = getCountryData(country);

    const textMap = {
        es: {
            jobWrite: "Escríbenos también al ",
            request: `Solicita también a tu trabajadora${display === 'desktop' ? ' del hogar' : ''} vía WhatsApp, escribiendo al `,
        },
        en: {
            jobWrite: "You can also message us at ",
            request: `You can also request your domestic worker via WhatsApp by messaging `,
        }
    };

    const currentText = textMap[lang] ?? textMap.es;

    // Laravel entrega request()->path() sin la barra inicial.
    const currentPath = path.replace(/^\/+|\/+$/g, '');
    const jobPath = `${country}/busco-trabajo`;

    const text = currentPath === jobPath
        ? currentText.jobWrite
        : currentText.request;

    return (
        <section id="cintillo" className="px-3 px-md-5 py-2 px-md-4 contact-label bgb-pink">
            <div className="mx-auto text-center">
                <h4 className="display-5 title-tlf-whatsapp">
                    {text}
                    <a
                        className="number-breaker"
                        href={`https://api.whatsapp.com/send?phone=${countryData.whatsAppLink}`}
                        target="_blank"
                    >
                        {countryData.whatsApp}
                    </a>
                </h4>
            </div>
        </section>
    );
}
