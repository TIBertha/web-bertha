import React from "react";
import TcPeru from "./tcPeru.jsx";

export default function TerminosCondiciones({url, country}){
    return(
        <>
            <h1 className="seo-h1" hidden>Términos y Condiciones de Bertha</h1>

            <section className="container privacidad">
                <div className="legal">
                    <h2 className="legal-title">Términos y Condiciones</h2>

                    <div>
                        <h5 className="title-termino">Selección de Personal</h5>
                    </div>

                    <TcPeru url={url} />

                </div>
            </section>
        </>
    )
}
