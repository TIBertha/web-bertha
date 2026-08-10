import React from "react";
import { TcPeruES } from "./tcPeruES.jsx";
import { TcPeruEN } from "./tcPeruEN.jsx";

export default function TerminosCondiciones({ url, country, lang = 'es' }) {

    const tc = lang === "es" ? TcPeruES : TcPeruEN;

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

    return (
        <>
            <h1 className="seo-h1" hidden>{tcText[lang].seo}</h1>

            <section className="container privacidad">
                <div className="legal">
                    <h2 className="legal-title">{tcText[lang].title}</h2>

                    <div>
                        <h5 className="title-termino">{tcText[lang].subtitle}</h5>
                    </div>

                    <div className="legal-content">

                        <div className="resume">
                            {tc.resume}
                        </div>

                        <ol className="list-ol">
                            {tc.items.map((item, index) => (
                                <li key={index}>
                                    <div className="details">
                                        <h3 className="subtitle">{item.title}</h3>

                                        {item.paragraphs.map((p, i) => (
                                            <div className="description" key={i}>
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
