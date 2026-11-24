import React from "react";
import { PrPeru } from "./prPeru.jsx";
import { PrMexico } from "./prMexico.jsx";

export default function Privacidad({
   url,
   country = "pe",
   lang = "es",
}) {
    
    const idioma = lang === "en" ? "en" : "es";

    const privacyByCountry = {
        pe: PrPeru,
        mx: PrMexico,
    };

    const contactByCountry = {
        pe: {
            whatsapp: "999 256 807",
            whatsappLink: "51999256807",
        },

        mx: {
            whatsapp: "52 55 2091 2182",
            whatsappLink: "525520912182",
        },
    };

    const pr = (privacyByCountry[country] || PrPeru)[idioma];

    const contact =
        contactByCountry[country] || contactByCountry.pe;

    return (
        <>
            <h1 className="seo-h1" hidden>
                {pr.title}
            </h1>

            <section className="container privacidad">

                <div className="legal">

                    <h2 className="legal-title">
                        {pr.title}
                    </h2>

                    <div className="legal-content">

                        {pr.resume.map((paragraph, index) => (
                            <div className="resume" key={index}>
                                {paragraph}
                            </div>
                        ))}

                        <ol className="list-ol legal-clauses">

                            {pr.items.map((item, index) => {

                                const paragraphs =
                                    typeof item.paragraphs === "function"
                                        ? item.paragraphs(contact)
                                        : item.paragraphs;

                                return (
                                    <li key={index}>
                                        <div className="details">

                                            <h3 className="subtitle">
                                                {item.title}
                                            </h3>

                                            {paragraphs.map((p, i) => (
                                                React.isValidElement(p) &&
                                                p.type === "ul"
                                                    ? React.cloneElement(p, {
                                                        key: i,
                                                    })
                                                    : (
                                                        <div
                                                            className="description"
                                                            key={i}
                                                        >
                                                            {p}
                                                        </div>
                                                    )
                                            ))}

                                        </div>
                                    </li>
                                );
                            })}

                        </ol>

                    </div>

                </div>

            </section>
        </>
    );
}
