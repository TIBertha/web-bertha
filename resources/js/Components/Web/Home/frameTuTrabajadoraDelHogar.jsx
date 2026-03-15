import React from "react";
import CircledHr from "../Components/circledHr.jsx";
import imgHuella from "../../../../../public/img/icons/huella.png";
import imgTable from "../../../../../public/img/icons/table.png";
import imgCarnetCovid from "../../../../../public/img/icons/carnet-covid.png"
import imgReemplazos from "../../../../../public/img/icons/reemplazos.png";
import imgGirl from "../../../../../public/img/new_version/bertha_girl_img.png";

export default function FrameTuTrabajadoraDelHogar({url, country}) {
    let frameText = {
        title : 'Tu trabajadora del hogar como nunca antes',
        s1: 'Sin antecedentes policiales, judiciales ni penales',
        su1: 'Validamos que las trabajadoras no tengan antecedentes ni denuncias.',
    };

    return(
        <section className="page-100">

            <div className="p-3 px-md-5 m-0">

                <div className="titulo-seccion titulo-seccion py-2">
                    <h3 className="display-5 titulo text-pink d-none d-xl-block responsive-title-size">{frameText.title}</h3>
                    <h3 className="display-5 titulo d-block d-xl-none responsive-title-size">Seguridad y confianza</h3>
                    <CircledHr num={15}/>
                </div>

                <div className="container-fluid mx-auto text-center p-0">
                    <div className="row justify-content-md-center m-0">

                        <div className="col-12 col-lg-4 description-column">

                            <div className="col-12 description-activity-item row">

                                <div className="col-4 p-0">
                                    <img className="description-activity-icon" src={imgHuella} alt="Trabajadoras del hogar sin antecedentes"/>
                                </div>

                                <div className="col-8 px-lg-0">
                                    <h5 className="responsive-description-size">{frameText.s1}</h5>
                                    <p className="responsive-content-size">{frameText.su1}</p>
                                </div>

                            </div>

                            <div className="col-12 description-activity-item row">

                                <div className="col-4 p-0">
                                    <img className="description-activity-icon" src={imgTable} alt="Trabajadoras del hogar con recomendaciones"/>
                                </div>

                                <div className="col-8 px-lg-0">
                                    <h5 className="responsive-description-size">Con recomendaciones</h5>
                                    <p className="responsive-content-size">Verificamos su experiencia con sus empleadores anteriores. Si deseas, puedes validarlas durante la entrevista.</p>
                                </div>

                            </div>

                        </div>

                        <img className="col-auto d-none d-lg-block description-activity-image" src={imgGirl} alt="Trabajador del hogar"/>

                        <div className="col-12 col-lg-4 description-column">

                            <div className="col-12 description-activity-item row">

                                <div className="col-4 p-0">
                                    <img className="description-activity-icon" src={imgCarnetCovid} alt="Con vacunación COVID"/>
                                </div>

                                <div className="col-8 px-lg-0">
                                    <h5 className="responsive-description-size">Con vacunación COVID</h5>
                                    <p className="responsive-content-size">Solicitamos que las trabajadoras informen sobre su vacunación COVID.</p>
                                </div>

                            </div>

                            <div className="col-12 description-activity-item row">

                                <div className="col-4 p-0">
                                    <img className="description-activity-icon" src={imgReemplazos} alt="Periodo de prueba para el trabajador del hogar"/>
                                </div>

                                <div className="col-8 px-lg-0">
                                    <h5 className="responsive-description-size">Con reemplazos</h5>
                                    <p className="responsive-content-size">Durante este tiempo evalúa a tu trabajadora del hogar. Si no estás conforme, solicita los reemplazos que necesites.</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-12 pt-md-3 pb-md-4 text-center">
                    <a className="bertha-purplepink-button font-weight-bold btn btn-lg mt-3 btn-size no-box-shadow" href={url + '/es-' + country + '/seleccionar'}>Solicitar</a>
                </div>

            </div>

        </section>
    )
}
