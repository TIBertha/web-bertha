import React, { useState } from "react";
import parse from "html-react-parser";

import Recomendacion from "../../../../../../public/img/ficha/carta-recomendacion.jpg";

import ReproductorAudio from "./reproductorAudio.jsx";
import VisualizarImagen from "./visualizarImagen.jsx";
import InputTelefono from "./inputTelefono.jsx";

import Tooltips from "../../Components/tooltips.jsx";

export default function VerExperiencia({
    url,
    experiencia,
    iconFile,
    iconShield,
    listaudio,
}) {
    let [show, setShow] = useState(false);

    let verificacion = experiencia.verificacion;
    return (
        <>
            {experiencia.empleador &&
                experiencia.telefono &&
                experiencia.distrito &&
                experiencia.actividades && (
                    <section className="col-12 px-0 experiencia-estudio">
                        <div className="row mx-0">
                            <div className="col-0 col-sm-2 mb-auto text-center ps-0 pe-2 px-sm-3"></div>
                            <div className="col col-sm-8 my-auto px-sm-3">
                                <p>
                                    Ex empleador: {experiencia.empleador}{" "}
                                    {verificacion && verificacion.length > 0 ? (
                                        <Tooltips
                                            text={parse(
                                                "Recomendación verificada",
                                            )}
                                            iconclass={iconShield}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </p>

                                <InputTelefono
                                    labelTitle={"Telefono del empleador"}
                                    codedPhone={experiencia.formatTel}
                                    phone={experiencia.telefono}
                                />

                                <p>
                                    Lugar de Labores:{" "}
                                    {experiencia.empleador == "NELLY" &&
                                    experiencia.distrito == "SANTIAGO DE SURCO"
                                        ? "SANTIAGO DE CHILE"
                                        : experiencia.distrito}
                                </p>
                                <p>
                                    Actividades Realizadas:{" "}
                                    {experiencia.actividades}
                                </p>
                                {experiencia.fechainicio ? (
                                    <p hidden={show}>
                                        Fecha de Inicio:{" "}
                                        {experiencia.fechainicio}
                                    </p>
                                ) : (
                                    ""
                                )}
                                {experiencia.fechafin ? (
                                    <p hidden={show}>
                                        Fecha de Fin: {experiencia.fechafin}
                                    </p>
                                ) : (
                                    ""
                                )}
                                {experiencia.duracion ? (
                                    <p>
                                        Tiempo del Servicio:{" "}
                                        {experiencia.duracion}
                                    </p>
                                ) : (
                                    ""
                                )}
                                {experiencia.docsVerificacion && (
                                    <div hidden={false}>
                                        <p>Verificaciones:</p>
                                        <div className="adjuntoverificacion">
                                            {experiencia.docsVerificacion.map(
                                                (data, index) => {
                                                    return (
                                                        <div className="contenido-adj">
                                                            {data.tipo ===
                                                            "audio" ? (
                                                                <ReproductorAudio
                                                                    url={url}
                                                                    audio={
                                                                        data.adjunto
                                                                    }
                                                                    listaudio={
                                                                        listaudio
                                                                    }
                                                                />
                                                            ) : (
                                                                <VisualizarImagen
                                                                    url={url}
                                                                    imagen={
                                                                        data.adjunto
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-2 mb-auto">
                                {experiencia.adjunto && (
                                    <>
                                        <Tooltips
                                            text={parse(
                                                '<img class="icon-documento-identidad" src="' +
                                                    Recomendacion +
                                                    '"/>',
                                            )}
                                            iconclass={iconFile}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                )}
        </>
    );
}
