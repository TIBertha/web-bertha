import React, { useState } from "react";
import parse from "html-react-parser";

import Tooltips from "../../Components/tooltips.jsx";
import VerAdjunto from "./verAdjunto.jsx";

export default function VerEstudio({ url, privado, estudio, iconFile }) {
    return (
        <>
            {estudio.tipo && estudio.centro && estudio.titulo && (
                <section className="col-12 px-0 estudio-border">
                    <div className="row mx-0">
                        <div className="col-0 col-sm-2 mb-auto text-center ps-0 pe-2 px-sm-3"></div>
                        <div className="col col-sm-8 my-auto px-sm-3">
                            <p>Tipo de Certificadoss: {estudio.tipo}</p>
                            <p hidden={show}>
                                Centro de Estudios: {estudio.centro}
                            </p>
                            <p>Titulo: {estudio.titulo}</p>
                        </div>
                        <div className="col-2 mb-auto">
                            {estudio.adjunto && (
                                <>
                                    {privado ? (
                                        <VerAdjunto
                                            url={url}
                                            adjunto={estudio.adjunto}
                                            nombreAdjunto={"estudio"}
                                        />
                                    ) : (
                                        <Tooltips
                                            text={parse(
                                                '<img class="icon-documento-identidad" src="' +
                                                    estudio.adjunto +
                                                    '"/>',
                                            )}
                                            iconclass={iconFile}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
