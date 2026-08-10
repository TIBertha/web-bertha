import React from 'react';
import VerExperiencia from "../Components/verExperiencia.jsx";

export default function ColumnaExperienciaEstudios({url, dataseleccion, privado, numExperiencia, experiencia, iconFile, iconShield, listaudio, lang = 'es'}) {
    return (
        <section className="map p-3">

            { (numExperiencia > 0) &&
                <>
                    <div className="py-3">
                        <p className="titulo-seccions m-0">{lang === 'en' ? 'Experience' : 'Experiencia'}</p>
                        <div className="row mx-0 justify-content-end detalles mt-2">
                            {experiencia.map((data,index) =>{
                                return(
                                    <VerExperiencia
                                        url={url}
                                        key={parseFloat(index)}
                                        index={parseFloat(index)}
                                        privado={privado}
                                        experiencia={data}
                                        iconFile={iconFile}
                                        iconShield={iconShield}
                                        listaudio={listaudio}
                                        dataselection={dataseleccion}
                                        lang={lang}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </>
            }

        </section>
    )
}
