import React from "react";

export default function FrameSoyBertha({url, country, langSelected = 'es'}) {
    let sectionText = {Title: '', Content: ''};

    if (langSelected === 'es'){
        sectionText = {
            Title: 'Hola, soy Bertha',
            Content: 'Soy tu agencia de empleos online, mi trabajo es conectarte con trabajadoras del hogar, con total seguridad …y mucho cariño :)',
            Button: 'Comencemos'
        }
    }else if(langSelected === 'en'){
        sectionText = {
            Title: 'Greetings, my name is Bertha',
            Content: 'I’m your online domestic staffing agency, dedicated to matching you with reliable home workers, with full security ... and a warm, personal touch',
            Button: 'Let s start'
        }
    }


    let textFrame = 'Soy tu agencia de empleos online, mi trabajo es conectarte con trabajadoras del hogar, con total seguridad …y mucho cariño :)';


    return(
        <>
            <section className="bertha-section-padding alterative-bg-gray">
                <div className="titulo-seccion pb-2 pt-5">
                    <h3 className="display-5 titulo text-purple">{sectionText.Title}</h3>
                </div>

                <div className="p-3 px-md-5 m-0">
                    <div className="row mx-0 justify-content-center text-center">
                        <div className="col-9 col-md-6 px-0">
                            <div className="text-purple responsive-subtext">
                                {sectionText.Content}
                            </div>
                            <div className='py-5'>
                                <a className='btn-size btn btn-lg bertha-pink-button font-weight-bold no-box-shadow mt-0' href={url + '/es-' + country + '/seleccionar'}>{sectionText.Button}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="coustom-wave"></div>
        </>
    )
}
