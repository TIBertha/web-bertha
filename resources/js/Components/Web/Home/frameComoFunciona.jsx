import React, { useEffect } from "react";
import AOS from "aos";
import { disableSeleccionModal } from "../../Functions/Home.jsx";
import img1 from "../../../../../public/img/new_version/bertha_fcf_p1.png";
import img2 from "../../../../../public/img/new_version/bertha_fcf_p2.png";
import img3 from "../../../../../public/img/new_version/bertha_fcf_p3.png";

export default function FrameComoFunciona({ url, showButton, country = "pe" }) {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    function redirectSeleccion(e) {
        disableSeleccionModal().then((r) => {
            window.location.href = url + "/es-" + country + "/seleccionar";
        });
    }

    let elements = [
        {
            img: img1,
            title: "Requerimiento",
            description: "Llena tu solicitud detalladamente.",
        },
        {
            img: img2,
            title: "Selección",
            description:
                "Seleccionaremos al personal ideal para ti. Tienes 1 mes de prueba.",
        },
        {
            img: img3,
            title: "Inicio",
            description: "Recibe a la trabajadora el día y hora acordado.",
        },
    ];

    return (
        <section className="fondo-procesos-wh py-0 py-lg-4">
            <div className="titulo-seccion py-2">
                <h3 className="display-5 titulo text-purple responsive-title-size">
                    ¿Cómo funciona?
                </h3>
            </div>

            <div className="step-grid p-3 px-md-5">
                <div className="instruction container-fluid">
                    <div className="row justify-content-md-center mx-0">
                        {elements.map((e, index) => {
                            return (
                                <div
                                    className="p-0 my-3 my-lg-0 col-lg-4 btn-purplepink instruction-step"
                                    data-aos="zoom-in"
                                >
                                    <div className="row justify-content-center mx-0">
                                        <div className="col-auto px-0">
                                            <img
                                                src={e.img}
                                                alt="Busco Trabajo │ Tiempo Completo │ holabertha.com"
                                            />
                                        </div>
                                        <div className="col-9 col-sm-7 col-md-12 my-auto my-md-0 text-start text-md-center">
                                            <h4 className="text-pink">
                                                {e.title}
                                            </h4>
                                            <p className="mt-md-3 lead">
                                                {e.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {showButton == true && (
                        <div className="my-3 text-center">
                            <a
                                className="btn-size btn btn-lg bertha-pink-button font-weight-bold no-box-shadow"
                                onClick={(e) => redirectSeleccion(e)}
                            >
                                Seleccionar
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
