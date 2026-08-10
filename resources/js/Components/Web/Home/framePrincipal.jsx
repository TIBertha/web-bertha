import React, { useState, useEffect, useRef } from "react";
import { getCountryData, mobileDesktop } from "../../Functions/General.jsx";
import principalImg from "../../../../../public/img/new_version/bertha_principal_frame_img.png";

export default function FramePrincipal({ url, country, lang = 'es'}) {
    let countryData = getCountryData(country);
    let display = mobileDesktop();

    const frameTitle = {
        es: {
            main: "Consigue a trabajadoras del hogar cama adentro, cama afuera y por días en Perú.",
            second: "Selecciona a trabajadoras del hogar sin antecedentes y con experiencia.",
        },
        en: {
            main: "Hire live-in, live-out, and scheduled days only domestic workers in Peru.",
            second: "Select domestic workers with experience and no criminal record.",
        },
    };

    const buttonText = {
        es: {
            desktop: "Seleccionar",
            mobile: "Empezar",
        },
        en: {
            desktop: "Select",
            mobile: "Start",
        },
    };

    const purpleLabelText = {
        es: "Solicita también a tu trabajadora del hogar vía WhatsApp, escribiendo al ",
        en: "You can also request your domestic worker via WhatsApp by messaging to ",
    };

    function button() {
        return (
            <a
                className={ display === 'desktop' ?
                    "bertha-yellow-button2 my-3 btn btn-lg yellow-fixed-button btn-size"
                    :
                    'bertha-purplepink-button font-weight-bold btn btn-lg mt-3 btn-size no-box-shadow'
                }
                href={url + '/' + lang + '-' + country + "/seleccionar"}
            >
                <b>{display === 'desktop' ? buttonText[lang].desktop : buttonText[lang].mobile}</b>
            </a>
        );
    }

    return (
        <div className="section-index-1 row mx-0 h-100 pt-5">
            <div className="col-12 col-lg-5 text-start div1 bertha-section-padding align-self-center">
                <h2 className="mb-2 mb-lg-4 subdiv1">
                    {frameTitle[lang].main}
                </h2>

                <p className="mb-0 mb-lg-3 subdiv2">{frameTitle[lang].second}</p>

                {button()}
            </div>

            {display === "desktop" && (
                <>
                    <div className="col-12 col-lg-7 px-0 align-self-end div2">
                        <img
                            className="pi-conf mx-auto w-75 w-lg-100"
                            src={principalImg}
                            alt="Bertha | Trabajadoras del Hogar"
                        />
                    </div>

                    <div className={"col-12 purple-label div3"}>
                        <p className={"m-0 py-2 text"}>
                            {purpleLabelText[lang]}
                            <a
                                className="tlf-whatsapp-lg"
                                href={
                                    "https://api.whatsapp.com/send?phone=" +
                                    countryData.whatsAppLink
                                }
                                target="_blank"
                            >
                                {countryData.whatsApp}
                            </a>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
