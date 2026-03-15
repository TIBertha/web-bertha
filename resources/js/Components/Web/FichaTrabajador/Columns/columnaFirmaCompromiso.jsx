import React from "react";
import VerCompromiso from "../Components/verCompromiso.jsx";

export default function ColumnaFirmaCompromiso({ firmaImg }) {
    return (
        <section className={"map p-3 mt-3"}>
            <div className="py-3">
                <p className="titulo-seccions m-0">Firma</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 px-0 experiencia-estudio">
                        <div className="row mx-0">
                            <div className="col-0 col-sm-2 mb-auto text-center ps-0 pe-2 px-sm-3">
                                {/*----*/}
                            </div>

                            <div className="col col-sm-8 my-auto px-sm-3">
                                <p>Compromiso: ACEPTADO</p>
                                {firmaImg && (
                                    <div className="adjuntoverificacion">
                                        <div className="contenido-adj">
                                            <VerCompromiso />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-2 my-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
