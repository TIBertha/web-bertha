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
    lang = 'es'
}) {
    let [show, setShow] = useState(false);

    let verificacion = experiencia.verificacion;

    const expText = {
        es: {
            t1: 'Ex-empleador:',
            t2: 'Teléfono del empleador',
            t3: 'Lugar de Labores:',
            t4: 'Actividades Realizadas:',
            t5: 'Fecha de Inicio:',
            t6: 'Fecha de Fin:',
            t7: 'Tiempo del Servicio:',
            t8: 'Verificaciones:',
            t9: 'Recomendación verificada'
        },
        en: {
            t1: 'Former employer:',
            t2: 'Employer’s phone number',
            t3: 'Workplace:',
            t4: 'Tasks performed:',
            t5: 'Start date:',
            t6: 'End date:',
            t7: 'Length of service:',
            t8: 'Verifications:',
            t9: 'Verified recommendation'
        }
    };
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
                                    {expText[lang].t1 + ' ' + experiencia.empleador + ' '}
                                    {verificacion && verificacion.length > 0 ? (
                                        <Tooltips
                                            text={parse(
                                                expText[lang].t9
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
                                    labelTitle={expText[lang].t2}
                                    codedPhone={experiencia.formatTel}
                                    phone={experiencia.telefono}
                                />

                                <p>{expText[lang].t3 + ' ' + experiencia.distrito}</p>

                                <p>{expText[lang].t4 + ' ' + experiencia.actividades}</p>

                                {experiencia.fechainicio &&
                                    <p hidden={show}>{expText[lang].t5 + ' ' + experiencia.fechainicio}</p>
                                }

                                {experiencia.fechafin &&
                                    <p hidden={show}>{expText[lang].t6 + ' ' + experiencia.fechafin}</p>
                                }

                                {experiencia.duracion &&
                                    <p hidden={show}>{expText[lang].t7 + ' ' + experiencia.duracion}</p>

                                }
                                {experiencia.docsVerificacion && (
                                    <div hidden={false}>
                                        <p>{expText[lang].t8}</p>
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
                                                                    imagen={data.adjunto}
                                                                    lang={lang}
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
                                {/*experiencia.adjunto && (
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
                                )*/}
                            </div>
                        </div>
                    </section>
                )}
        </>
    );
}
