import React from "react";
import { mobileDesktop } from "../../Functions/General.jsx";

export default function ContactLabel({ url, path, lang = 'es' }) {
    const display = mobileDesktop();

    const textMap = {
        es: {
            jobWrite: "Escríbenos también al ",
            request: `Solicita también a tu trabajadora${display === 'desktop' ? ' del hogar' : ''} vía WhatsApp, escribiendo al `,
        },
        en: {
            jobWrite: "Write to us also at ",
            request: `Request your domestic worker${display === 'desktop' ? '' : ''} via WhatsApp, messaging `,
        }
    };

    // Detectar ruta multilanguage
    const jobPath = `/${lang}-pe/busco-trabajo`;

    const text = path.includes(jobPath)
        ? textMap[lang].jobWrite
        : textMap[lang].request;

    return (
        <section id="cintillo" className="px-3 px-md-5 py-2 px-md-4 contact-label bgb-pink">
            <div className="mx-auto text-center">
                <h4 className="display-5 title-tlf-whatsapp">
                    {text}
                    <a
                        className="number-breaker"
                        href="https://api.whatsapp.com/send?phone=51999256807"
                        target="_blank"
                    >
                        +51 999 256 807
                    </a>
                </h4>
            </div>
        </section>
    );
}
