import React, { useState, useEffect, useRef } from "react";
import { getCountryData, mobileDesktop } from "../../Functions/General.jsx";
import principalImg from "../../../../../public/img/new_version/bertha_principal_frame_img.png";

export default function FramePrincipal({ url, country }) {
    let countryData = getCountryData(country);
    let display = mobileDesktop();

    let frameTitle = {
        main: "Consigue a trabajadoras del hogar cama adentro, cama afuera y por días en ",
        second: "Selecciona a trabajadoras del hogar sin antecedentes y con recomendaciones.",
    };

    function button() {
        return (
            <a
                className={
                    "bertha-yellow-button2 my-3 btn btn-lg " +
                    (display === "desktop"
                        ? "yellow-fixed-button my-2 btn-size"
                        : "btn-block")
                }
                href={url + "/es-" + country + "/seleccionar"}
            >
                <b>Seleccionar</b>
            </a>
        );
    }

    return (
        <div className="section-index-1 row mx-0 h-100 pt-5">
            <div className="col-12 col-lg-5 text-start div1 bertha-section-padding align-self-center">
                <h2 className="mb-2 mb-lg-4 subdiv1">
                    {frameTitle.main + countryData.nombre + "."}
                </h2>

                <p className="mb-0 mb-lg-3 subdiv2">{frameTitle.second}</p>

                {button()}
            </div>

            <div className="col-12 col-lg-7 px-0 align-self-end div2">
                <img
                    className="pi-conf mx-auto w-75 w-lg-100"
                    src={principalImg}
                    alt="Bertha | Trabajadoras del Hogar"
                />
            </div>

            {display === "desktop" && (
                <div className={"col-12 purple-label div3"}>
                    <p className={"m-0 py-2 text"}>
                        Solicita también a tu trabajadora del hogar vía
                        WhatsApp, escribiendo al{" "}
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
            )}
        </div>
    );
}
