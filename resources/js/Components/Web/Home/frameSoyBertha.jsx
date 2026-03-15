import React from "react";

export default function FrameSoyBertha({url, country}) {
    let textFrame = 'Soy tu agencia de empleos online, mi trabajo es conectarte con trabajadoras del hogar, con total seguridad …y mucho cariño :)';

    return(
        <>
            <section className="bertha-section-padding alterative-bg-gray">
                <div className="titulo-seccion pb-2 pt-5">
                    <h3 className="display-5 titulo text-purple">Hola, soy Bertha</h3>
                </div>

                <div className="p-3 px-md-5 m-0">
                    <div className="row mx-0 justify-content-center text-center">
                        <div className="col-9 col-md-6 px-0">
                            <div className="text-purple responsive-subtext">
                                {textFrame}
                            </div>
                            <div className='py-5'>
                                <a className='btn-size btn btn-lg bertha-pink-button font-weight-bold no-box-shadow mt-0' href={url + '/es-' + country + '/seleccionar'}>Comencemos</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="coustom-wave"></div>
        </>
    )
}
