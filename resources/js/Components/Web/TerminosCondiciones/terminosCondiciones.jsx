import React from "react";
import { TcPeru } from "./tcPeru.jsx";
import { TcMexico } from "./tcMexico.jsx";

export default function TerminosCondiciones({
    url,
    country,
    lang = "es",
}) {
    const idioma = lang === "en" ? "en" : "es";

    const termsByCountry = {
        pe: TcPeru,
        mx: TcMexico,
    };

    const tc = (termsByCountry[country] || TcPeru)[idioma];

    const tcText = {
        es: {
            seo: "Términos y Condiciones de Bertha",
            title: "Términos y Condiciones",
            subtitle: "Selección de Personal",
        },
        en: {
            seo: "Bertha Terms and Conditions",
            title: "Terms and Conditions",
            subtitle: "Staff Selection",
        },
    };

    const text = tcText[idioma];

    return (
        <>
            <h1 className="seo-h1" hidden>
                {text.seo}
            </h1>

            <section className="container privacidad">
                <div className="legal">

                    <h2 className="legal-title">
                        {text.title}
                    </h2>

                    {country === "pe" && (
                        <div>
                            <h5 className="title-termino">
                                {text.subtitle}
                            </h5>
                        </div>
                    )}

                    <div className="legal-content">

                        {tc.resume && (
                            <div className="resume">
                                {tc.resume}
                            </div>
                        )}

                        <ol className="list-ol legal-clauses">
                            {tc.items.map((item, index) => (
                                <li key={index}>
                                    <div className="details">

                                        <h3 className="subtitle">
                                            {item.title}
                                        </h3>

                                        {item.paragraphs.map((p, i) => (
                                            <div
                                                className="description"
                                                key={i}
                                            >
                                                {p}
                                            </div>
                                        ))}

                                    </div>
                                </li>
                            ))}
                        </ol>

                    </div>
                </div>
            </section>
        </>
    );
}
