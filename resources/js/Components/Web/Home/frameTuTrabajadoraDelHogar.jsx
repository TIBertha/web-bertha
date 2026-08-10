import React from "react";
import CircledHr from "../Components/circledHr.jsx";
import imgHuella from "../../../../../public/img/icons/huella.png";
import imgTable from "../../../../../public/img/icons/table.png";
import imgPeriodoPrueba from "../../../../../public/img/icons/periodo-prueba.png"
import imgReemplazos from "../../../../../public/img/icons/reemplazos.png";
import imgGirl from "../../../../../public/img/new_version/bertha_girl_img.png";
import {mobileDesktop} from "../../Functions/General.jsx";

export default function FrameTuTrabajadoraDelHogar({url, country, lang = 'es'}) {
    let display = mobileDesktop();

    const tuTrabajadoraText = {
        es: {
            desktop: "Tu trabajadora del hogar como nunca antes",
            mobile: "Seguridad y confianza",

            items: [
                {
                    title: "Sin antecedentes",
                    description: "Validamos que no tengan antecedentes policiales, judiciales y/o penales.",
                },
                {
                    title: "Con experiencia",
                    description: "Verificamos su experiencia. Si deseas, puedes validarlas durante la entrevista y/o período de prueba.",
                },
                {
                    title: "Con periodo de prueba",
                    description: "Durante este tiempo evalúa a tu trabajadora del hogar.",
                },
                {
                    title: "Con reemplazos",
                    description: "Si no estás conforme, solicita los reemplazos que necesites.",
                },
            ],

            button: "Solicitar",
        },

        en: {
            desktop: "Your domestic worker like never before",
            mobile: "Safety and trust",

            items: [
                {
                    title: "No criminal record",
                    description: "We verify that they have no police, judicial, or criminal records.",
                },
                {
                    title: "With experience",
                    description: "We verify their experience. If you wish, you can validate it during the interview and/or trial period.",
                },
                {
                    title: "With trial period",
                    description: "During this time, evaluate your domestic worker.",
                },
                {
                    title: "With replacements",
                    description: "If you're not satisfied, request as many replacements as needed.",
                },
            ],

            button: "Request",
        },
    };

    return(
        <section className="page-100">

            <div className="p-3 px-md-5 m-0">

                <div className="titulo-seccion titulo-seccion py-2">
                    <h3 className="display-5 titulo responsive-title-size text-pink">
                        {tuTrabajadoraText[lang][display]}
                    </h3>
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
                                    <h5 className="responsive-description-size">{tuTrabajadoraText[lang].items[0].title}</h5>
                                    <p className="responsive-content-size">{tuTrabajadoraText[lang].items[0].description}</p>
                                </div>

                            </div>

                            <div className="col-12 description-activity-item row">

                                <div className="col-4 p-0">
                                    <img className="description-activity-icon" src={imgTable} alt="Trabajadoras del hogar con recomendaciones"/>
                                </div>

                                <div className="col-8 px-lg-0">
                                    <h5 className="responsive-description-size">{tuTrabajadoraText[lang].items[1].title}</h5>
                                    <p className="responsive-content-size">{tuTrabajadoraText[lang].items[1].description}</p>
                                </div>

                            </div>

                        </div>

                        {display === 'desktop' &&
                            <img className="col-auto description-activity-image" src={imgGirl} alt="Trabajador del hogar"/>
                        }

                        <div className="col-12 col-lg-4 description-column">

                            <div className="col-12 description-activity-item row">

                                <div className="col-4 p-0">
                                    <img className="description-activity-icon" src={imgPeriodoPrueba} alt="Periodo de prueba"/>
                                </div>

                                <div className="col-8 px-lg-0">
                                    <h5 className="responsive-description-size">{tuTrabajadoraText[lang].items[2].title}</h5>
                                    <p className="responsive-content-size">{tuTrabajadoraText[lang].items[2].description}</p>
                                </div>

                            </div>

                            <div className="col-12 description-activity-item row">

                                <div className="col-4 p-0">
                                    <img className="description-activity-icon" src={imgReemplazos} alt="Periodo de prueba para el trabajador del hogar"/>
                                </div>

                                <div className="col-8 px-lg-0">
                                    <h5 className="responsive-description-size">{tuTrabajadoraText[lang].items[3].title}</h5>
                                    <p className="responsive-content-size">{tuTrabajadoraText[lang].items[3].description}</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-12 pt-md-3 pb-md-4 text-center">
                    <a className="bertha-purplepink-button font-weight-bold btn btn-lg mt-3 btn-size no-box-shadow" href={url + '/' + lang + '-' + country + '/seleccionar'}>{tuTrabajadoraText[lang].button}</a>
                </div>

            </div>

        </section>
    )
}
