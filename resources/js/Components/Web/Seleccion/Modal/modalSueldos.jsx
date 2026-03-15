import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { getCountryData } from "../../../Functions/General.jsx";

export default function ModalSueldos({ country }) {
    const [show, setShow] = useState(false);

    let arrayTCPe = [
        {
            label: "Cama adentro sale sábados 1pm, retorna lunes 7am",
            cost: "1700",
        },
        {
            label: "Cama adentro sale viernes 7pm, retorna lunes 7am",
            cost: "1650",
        },
        {
            label: "Cama afuera de lunes a viernes de 8am a 7pm, sábados de 8am a 1pm",
            cost: "1650",
        },
        { label: "Cama afuera de lunes a viernes de 8am a 7pm", cost: "1550" },
        {
            label: "Cama afuera de lunes a viernes de 8am a 6pm, sábados de 8am a 1pm",
            cost: "1500",
        },
        {
            label: "Cama afuera de lunes a viernes de 8am a 5pm, sábados de 8am a 1pm",
            cost: "1400",
        },
        { label: "Cama afuera de lunes a viernes de 8am a 6pm", cost: "1400" },
        {
            label: "Cama afuera de lunes a viernes de 8am a 4pm, sábados de 8am a 1pm",
            cost: "1350",
        },
        { label: "Cama afuera de lunes a viernes de 8am a 5pm", cost: "1350" },
    ];

    let arrayMTPe = [
        {
            label: "Cama afuera medio turno, lunes a sábado de 8am a 1pm",
            cost: "1350",
        },
        {
            label: "(Más solicitado) Cama afuera medio turno, lunes a viernes de 8am a 3pm",
            cost: "1350",
        },
        {
            label: "(Más solicitado) Cama afuera medio turno, lunes a viernes de 8am a 2pm o de 12pm a 6pm",
            cost: "1250",
        },
        {
            label: "4 veces por semana de 8am a 5pm",
            cost: "80 el día o 1280 el mes",
        },
        {
            label: "3 veces por semana lun/mie/vie o mar/jue/sab de 8am a 5pm",
            cost: "80 el día o 960 el mes",
        },
        {
            label: "2 veces por semana martes y jueves de 8am a 5pm",
            cost: "80 el día o 640 el mes",
        },
        {
            label: "1 vez por semana martes o jueves de 8am a 5pm",
            cost: "80 el día o 320 el mes",
        },
    ];

    let arrayTCCl = [
        {
            label: "Puertas adentro salida viernes 5pm y retorno lunes 7am",
            cost: "650,000 + Imposiciones",
        },
        {
            label: "lunes a viernes de 8am a 5pm",
            cost: "500,000 + Imposiciones",
        },
    ];

    let arrayMTCl = [
        {
            label: "(Modalidad más solicitada) Puertas afuera medio tiempo, lunes a viernes de 8am a 2pm",
            cost: "450,000 (no paga imposiciones)",
        },
        {
            label: "(Modalidad más solicitada) Puertas afuera medio tiempo, lunes a viernes de 8am a 1pm",
            cost: "400,000 (no paga imposiciones)",
        },
        {
            label: "4 veces por semana de 8am a 5pm",
            cost: "30,000 el día o 480,000 el mes (no paga imposiciones)",
        },
        {
            label: "3 veces por semana lun/mie/vie o mar/jue/sab de 8am a 5pm",
            cost: "30,000 el día o 360,000 el mes (no paga imposiciones)",
        },
        {
            label: "2 veces por semana martes y jueves de 8am a 5pm",
            cost: "30,000 el día o 240,000 el mes (no paga imposiciones)",
        },
        {
            label: "1 vez por semana martes o jueves de 8am a 5pm",
            cost: "30,000 el día o 120,000 el mes (no paga imposiciones)",
        },
    ];

    let arrayTCMx = [
        {
            label: "De Planta: sale sábados 1pm, retorna lunes 8am",
            cost: "12,000",
        },
        {
            label: "De Planta: sale viernes 7pm, retorna lunes 8am",
            cost: "11,000 (Aceptan trabajar un máximo de 12 horas al día)",
        },
        {
            label: "Entrada por salida de lunes a viernes de 8am a 7pm, sábados de 8am a 1pm",
            cost: "10,500",
        },
        {
            label: "Entrada por salida de lunes a viernes de 8am a 7pm",
            cost: "9,500",
        },
        {
            label: "Entrada por salida de Lunes a viernes 8am - 6pm, sábados 8am - 1pm",
            cost: "9,000",
        },
        {
            label: "Entrada por salida de lunes a viernes de 8am a 5pm, sábados de 8am a 1pm",
            cost: "8,500",
        },
        {
            label: "Entrada por salida de lunes a viernes de 8am a 6pm",
            cost: "8,500",
        },
        {
            label: "Entrada por salida de lunes a viernes de 8am a 3.30pm, sábados de 8am a 1pm",
            cost: "8,000",
        },
        {
            label: "Entrada por salida de lunes a viernes de 8am a 5pm",
            cost: "8,000",
        },
    ];

    let arrayMTMx = [
        {
            label: "Cama afuera medio turno, lunes a sábado de 8am a 1pm o de 12pm a 5pm",
            cost: "7,500",
        },
        {
            label: "(Más solicitado) Cama afuera medio turno, lunes a viernes de 8am a 3pm o de 10am a 5pm",
            cost: "7,500",
        },
        {
            label: "(Más solicitado) Cama afuera medio turno, lunes a viernes de 8am a 2pm o de 12pm a 6pm",
            cost: "7,000",
        },
        {
            label: "4 veces por semana de 8am a 5pm de lunes a jueves o lun/mie/vie/sab",
            cost: "500 el día o 8,000 el mes",
        },
        {
            label: "3 veces por semana lun/mie/vie o mar/jue/sab de 8am a 5pm",
            cost: "500 el día o 6,000 el mes",
        },
        {
            label: "2 veces por semana martes y jueves de 8am a 5pm",
            cost: "500 el día o 4,000 el mes",
        },
        {
            label: "1 vez por semana martes o jueves de 8am a 5pm",
            cost: "500 el día o 2,000 el mes",
        },
    ];

    let countryData = getCountryData(country);
    let divisa = countryData.divisa;
    let sueldoLista = {
        lista1: null,
        lista2: null,
    };

    if (country == "pe") {
        sueldoLista = {
            lista1: arrayTCPe,
            lista2: arrayMTPe,
        };
    } else if (country == "cl") {
        sueldoLista = {
            lista1: arrayTCCl,
            lista2: arrayMTCl,
        };
    } else if (country == "mx") {
        sueldoLista = {
            lista1: arrayTCMx,
            lista2: arrayMTMx,
        };
    }

    return (
        <>
            <a
                className={
                    "twi enlace-referidos referidos-link font-weight-bold"
                }
                role="button"
                onClick={(e) => setShow(true)}
            >
                <u>aquí</u>
            </a>

            <Modal
                className={"bertha-modal-aviso"}
                size="xl"
                show={show}
                onHide={(e) => setShow(false)}
                centered={true}
            >
                <ModalHeader
                    className={"bertha-content-aviso"}
                    closeButton
                ></ModalHeader>
                <ModalBody className={"row mx-0 justify-content-center"}>
                    <div
                        className={
                            "tc-modal-document col-12 col-md-11 px-0 mb-3"
                        }
                    >
                        <div className="titulo-seccion py-2 mb-3">
                            <h3 className="display-5 titulo texto-morado responsive-title-size">
                                Sueldos del mercado
                            </h3>
                        </div>

                        <p className={"font-weight-bold"}>
                            {"Modalidades a tiempo completo (" +
                                divisa +
                                " desde):"}
                        </p>

                        <div className={"ps-2 pb-2"}>
                            {sueldoLista.lista1.map((d, key) => {
                                return (
                                    <p className={"pb-2"}>
                                        {d.label + ": " + d.cost}
                                    </p>
                                );
                            })}
                        </div>

                        <p className={"font-weight-bold"}>
                            {"Modalidades de medio tiempo (" +
                                divisa +
                                " desde):"}
                        </p>

                        <div className={"ps-2"}>
                            {sueldoLista.lista2.map((d, key) => {
                                return (
                                    <p className={"pb-2"}>
                                        {d.label + ": " + d.cost}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="center-button-modal">
                    <a
                        className="btn bertha-pink-button full-size font-weight-bold text-white"
                        onClick={(e) => setShow(false)}
                    >
                        Ver trabajadoras
                    </a>
                </ModalFooter>
            </Modal>
        </>
    );
}
