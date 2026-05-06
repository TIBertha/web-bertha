import React, { useEffect, useState } from "react";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import {
    ajaxGetRedesSociales,
    getCountryData,
} from "../../Functions/General.jsx";
import { getLink } from "../../Functions/Functions.jsx";
import WhatsAppPlugin from "../Components/Plugins/whatsAppPlugin.jsx";
import ViewsPlugin from "../Components/Plugins/viewsPlugin.jsx";

export default function Footer({ url, country = "pe" }) {
    const links = [
        "/",
        "/ficha/",
        "/ficha-postulante/",
        "/condiciones/",
        "/confirmar-seleccion",
    ];
    const footerBorder = links.includes(getLink(window.location.pathname));
    const year = moment().format("YYYY");
    const countryData = getCountryData(country);

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

    const [loading, setLoading] = useState(true);
    const [redesSociales, setRedesSociales] = useState(null);

    console.log(url);
    const list1 = [
        { url: url + "/condiciones", title: "Términos y condiciones" },
        { url: url + "/privacidad", title: "Política de privacidad" },
        { url: url + "/reclamos", title: "Libro de reclamaciones" },
    ];

    useEffect(() => {
        ajaxGetRedesSociales().then((r) => {
            setRedesSociales(r.redessociales);
        });
    }, []);

    return (
        <>
            <section className="footer-links">
                <div className="container-fluid px-0 mx-0">
                    <footer
                        className={
                            "px-3 px-md-5 my-md-3 my-lg-0 pb-4 pt-5" +
                            (footerBorder ? " footer-border" : "")
                        }
                    >
                        <div className="row justify-content-center mx-0 px-0 new-footer">
                            <div className="col-12 col-lg-9 px-0">
                                <div className="row mx-0 justify-content-center justify-content-md-between">
                                    <div
                                        className="px-0 fit-height col-12 col-md-5 order-1 text-center text-lg-start pt-md-0 new-col-footer pt-0"
                                        id="p5"
                                    >
                                        <span className="nav-link-footer-title">
                                            <a className="link-tc un-select-text no-cursor">
                                                Propósito
                                            </a>
                                        </span>

                                        <div
                                            className={
                                                "text mt-4 mb-0 px-5 px-sm-0 pe-sm-3"
                                            }
                                        >
                                            Generamos nuevas dinámicas
                                            económicas impulsadas por la{" "}
                                            <b>revalorización de los oficios</b>{" "}
                                            y{" "}
                                            <b>potenciadas por la tecnología</b>
                                            ; aportando a la{" "}
                                            <b>competitividad</b> de los
                                            mercados y rompiendo{" "}
                                            <b>paradigmas sociales</b> en la{" "}
                                            <u>región</u>.
                                        </div>
                                    </div>

                                    <div
                                        className="px-5 px-md-0 fit-height col-12 col-sm-6 col-md-3 order-2 text-center text-lg-start pt-4 pt-md-0"
                                        id="p2"
                                    >
                                        <div>
                                            <span className="nav-link-footer-title">
                                                <a className="link-tc un-select-text no-cursor">
                                                    Sobre Bertha
                                                </a>
                                            </span>

                                            <ul className="list-unstyled text-small ul-spaceless contact-links text-center text-md-start mt-4 mb-0 px-1 px-md-0">
                                                {list1.map((l, key) => {
                                                    return (
                                                        <li>
                                                            <a
                                                                className="nav-link-footer"
                                                                href={l.url}
                                                            >
                                                                <i className="fas fa-circle text-pink"></i>{" "}
                                                                {l.title}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>

                                        {redesSociales && (
                                            <>
                                                {redesSociales.map(
                                                    (rs, key) => (
                                                        <div className={"pt-2"}>
                                                            <a
                                                                className="nav-link-footer"
                                                                href={rs.link}
                                                                target="_blank"
                                                            >
                                                                <i
                                                                    className={
                                                                        rs.icon +
                                                                        " text-pink pe-2"
                                                                    }
                                                                ></i>
                                                                {rs.user_name}
                                                            </a>
                                                        </div>
                                                    ),
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div
                                        className="fit-height col-12 col-sm-6 col-md-4 order-3 text-center text-lg-start pt-4 pt-md-0"
                                        id="p3"
                                    >
                                        <span className="nav-link-footer-title">
                                            <a className="link-tc un-select-text no-cursor">
                                                Contáctanos
                                            </a>
                                        </span>

                                        <ul className="list-unstyled text-small contact-links disabled-effect-link mt-4 mb-1">
                                            <li className="mt-2 mt-sm-0">
                                                <a
                                                    className="nav-link-footer"
                                                    href={
                                                        "https://api.whatsapp.com/send?phone=" +
                                                        countryData.whatsAppLink
                                                    }
                                                    target="_blank"
                                                >
                                                    <i className="fab fa-whatsapp text-pink"></i>{" "}
                                                    {countryData.whatsApp}
                                                </a>
                                            </li>
                                        </ul>

                                        <div className={"pt-1 horario"}>
                                            De lunes a viernes de 8 a 6
                                            <br />
                                            Sábados hasta la 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </section>

            <section className="footer-mid-border text-muted">
                <div className="px-3 px-md-5 mx-auto text-start pt-4 pb-5">
                    <div className="row justify-content-center mx-0 px-0">
                        <div className="col-12 col-lg-8 px-0">
                            <div className="row justify-content-center justify-content-md-between mx-0 px-0">
                                <div className="px-0 col-12 col-md-auto link-direccion-emp">
                                    <p className="mb-0 footer-title-text text-center text-md-start">
                                        Bertha disponible en <b>Perú</b>
                                    </p>
                                </div>

                                <div className="px-0 col-12 col-md-auto link-direccion-emp">
                                    <p className="mb-0 footer-title-text text-center text-md-right">
                                        <i className="far fa-copyright me-2"></i>
                                        {year +
                                            " Empleos Residencial La Molina E.I.R.L."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <WhatsAppPlugin url={url} countryData={countryData} />

            <ViewsPlugin url={url} />
        </>
    );
}
