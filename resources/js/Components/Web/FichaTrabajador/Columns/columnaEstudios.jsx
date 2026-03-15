import React from 'react';
import VerEstudio from "../Components/verEstudio.jsx";

export default function ColumnaEstudios({url, privado, nivelEducativo, numEstudio, estudio, iconFile, margin}) {
    return(
        <section className={'map p-3 ' + margin}>
            <div className="py-3">
                <p className="titulo-seccions m-0">Estudios</p>
                <div className="row mx-0 justify-content-end detalles mt-2">

                    <div className={'col-12 col-xl-10 px-0 pb-3'}>
                        <div className="row mx-0">
                            <div className="col-12 my-auto">
                                <p>Nivel Educativo: {nivelEducativo}</p>
                            </div>
                        </div>
                    </div>

                    { (numEstudio > 0) &&
                        <>
                            {estudio.map((data,index) =>{
                                return(
                                    <VerEstudio key={index} url={url} estudio={data} iconFile={iconFile} privado={privado}/>
                                );
                            })}
                        </>
                    }

                </div>
            </div>
        </section>
    )
}
