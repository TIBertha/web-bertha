import React from "react";
import imgLogo from "../../../../../public/img/logo.png";

const frameText = {
    es: {
        title: "¿Dónde necesitas el servicio?",
        description:
            "Selecciona la ciudad donde buscas una trabajadora del hogar.",
        button: "Seleccionar",
        footer: "Hogares más tranquilos en cada ciudad",
    },
    en: {
        title: "Where do you need our services?",
        description:
            "Choose the city where you’re looking for a domestic worker.",
        button: "Select",
        footer: "Peace of mind for your home, in every city",
    },
};

const countryText = {
    pe: {
        es: "Lima, Perú",
        en: "Lima, Peru",
    },
    mx: {
        es: "Ciudad de México, México",
        en: "Mexico City, Mexico",
    },
};

export default function SeleccionPais({
                                          url,
                                          lang = "es",
                                          countries = {},
                                      }) {
    const currentLang = frameText[lang] ? lang : "es";
    const text = frameText[currentLang];

    return (
        <main className="seleccion-pais">
            <div className="row mx-0 seleccion-pais-row">

                <div className="col-12 col-xl-5 seleccion-pais-content">
                    <img
                        src={imgLogo}
                        className="seleccion-pais-logo"
                        alt="Bertha"
                    />

                    <div className="seleccion-pais-body">

                        <div className="seleccion-pais-intro">
                            <h1>{text.title}</h1>

                            <p className="seleccion-pais-description">
                                {text.description}
                            </p>
                        </div>

                        <div className="seleccion-pais-options">
                            {Object.entries(countries).map(([code, item]) => {
                                const name =
                                    countryText[code]?.[currentLang]
                                    ?? item.name;

                                return (
                                    <a
                                        key={code}
                                        href={`${url}/${code}`}
                                        className="seleccion-pais-card"
                                        aria-label={`${text.button}: ${name}`}
                                    >
                                        <span className={`flag-icon flag-icon-${code} seleccion-pais-flag`} aria-hidden="true" ></span>

                                        <div className="seleccion-pais-card-content">
                                            <h2>{name}</h2>

                                            <span className="btn bertha-pink-button seleccion-pais-button">
                                            <span>{text.button}</span>

                                            <i className="fa-solid fa-arrow-right" aria-hidden="true" ></i>
                                            </span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <p className="seleccion-pais-footer">
                            {text.footer}

                            <i
                                className="fa-regular fa-heart"
                                aria-hidden="true"
                            ></i>
                        </p>
                    </div>
                </div>

                <div
                    className="col-12 col-xl-7 seleccion-pais-image"
                    aria-hidden="true"
                ></div>

            </div>
        </main>
    );
}
