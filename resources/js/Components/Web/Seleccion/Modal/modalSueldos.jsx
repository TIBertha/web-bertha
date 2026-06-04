import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { getCountryData } from "../../../Functions/General.jsx";

export default function ModalSueldos({ country }) {
    const [show, setShow] = useState(false);

    let arrayTCPe = [
        {
            label: "Cama adentro sale sábados 1pm, retorna lunes 7am",
            cost: "1750",
        },
        {
            label: "Cama adentro sale viernes 7pm, retorna domingo 7pm",
            cost: "1750",
        },
        {
            label: "Cama adentro sale sale viernes 7pm, retorna lunes 7am",
            cost: "1700",
        },
        { label: "Cama afuera de lunes a viernes de 8am a 7pm", cost: "1700" },
        {
            label: "Cama afuera de lunes a viernes de 8am a 6pm, sábados de 8am a 1pm",
            cost: "1550",
        },
        {
            label: "Cama afuera de lunes a viernes de 8am a 5pm, sábados de 8am a 1pm",
            cost: "1450",
        },
        { label: "Cama afuera de lunes a viernes de 8am a 6pm", cost: "1450" },
        {
            label: "Cama afuera de lunes a viernes de 8am a 4pm, sábados de 8am a 1pm",
            cost: "1400",
        },
        { label: "Cama afuera de lunes a viernes de 8am a 5pm", cost: "1400" },
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

    let countryData = getCountryData(country);
    let divisa = countryData.divisa;
    let sueldoLista = {
        lista1: null,
        lista2: null,
    };

    if (country === "pe") {
        sueldoLista = {
            lista1: arrayTCPe,
            lista2: arrayMTPe,
        };
    }

    return (
        <>
            <a
                className={
                    "twi enlace-referidos referidos-link font-weight-bold"
                }
                role="button"
                onClick={() => setShow(true)}
            >
                <u>aquí</u>
            </a>

            <Modal
                className={"bertha-modal-aviso"}
                size="xl"
                show={show}
                onHide={() => setShow(false)}
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
                            {sueldoLista.lista1.map((d) => {
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
                            {sueldoLista.lista2.map((d) => {
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
                        onClick={() => setShow(false)}
                    >
                        Ver trabajadoras
                    </a>
                </ModalFooter>
            </Modal>
        </>
    );
}
