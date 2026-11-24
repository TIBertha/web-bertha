import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { getCountryData } from "../../../Functions/General.jsx";

export default function ModalSueldos({country, lang = 'es' }) {
    const [show, setShow] = useState(false);

    // Traducciones multilanguage
    const textHere = { es: "aquí", en: "here" };
    const textTitle = { es: "Sueldos del mercado", en: "Market salaries" };
    const textFullTime = {
        es: `Modalidades a tiempo completo (${getCountryData(country).divisa} desde):`,
        en: `Full-time modalities (${getCountryData(country).divisa} from):`
    };
    const textPartTime = {
        es: `Modalidades de medio tiempo (${getCountryData(country).divisa} desde):`,
        en: `Scheduled days only modalities (${getCountryData(country).divisa} from):`
    };
    const textViewWorkers = {
        es: "Ver trabajadoras",
        en: "View domestic workers"
    };

    // Listas multilanguage
    let arrayTCPe = [
        {
            es: "Cama adentro sale sábados 12pm, retorna lunes 7am",
            en: "Live-in domestic worker: leaves Saturdays 12pm, returns Monday 7am",
            cost: "1750",
        },
        {
            es: "Cama adentro sale viernes 6pm, retorna domingo 9pm",
            en: "Live-in domestic worker: leaves Friday 6pm, returns Sunday 9pm",
            cost: "1750",
        },
        {
            es: "Cama adentro sale viernes 6pm, retorna lunes 7am",
            en: "Live-in domestic worker: leaves Friday 6pm, returns Monday 7am",
            cost: "1700",
        },
        {
            es: "Cama afuera lunes a viernes 8 a 6:30 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8–6:30 + Sat 8–1",
            cost: "1700"
        },
        {
            es: "Cama afuera lunes a viernes 8 a 6:30",
            en: "Live-out domestic worker: Mon–Fri 8–6:30",
            cost: "1600"
        },
        {
            es: "Cama afuera lunes a viernes 8 a 5:30 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8–5:30 + Sat 8–1",
            cost: "1550",
        },
        {
            es: "Cama afuera lunes a viernes 8 a 4:30 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8–4:30 + Sat 8–1",
            cost: "1450",
        },
        {
            es: "Cama afuera lunes a viernes 8 a 5:30",
            en: "Live-out domestic worker: Mon–Fri 8–5:30",
            cost: "1450"
        },
        {
            es: "Cama afuera lunes a viernes 8 a 3 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8–3 + Sat 8–1",
            cost: "1400",
        },
        {
            es: "Cama afuera lunes a viernes 8 a 4:30",
            en: "Live-out domestic worker: Mon–Fri 8–4:30",
            cost: "1400",
        },
    ];

    let arrayMTPe = [
        {
            es: "Cama afuera lunes a sábado de 8 a 1",
            en: "Live-out domestic worker: Mon–Sat 8–1",
            cost: {
                es: "1350",
                en: "1350",
            }
        },
        {
            es: "Cama afuera lunes a viernes 8 a 2:30 o 9 a 3:30",
            en: "Live-out domestic worker: Mon–Fri 8–2:30 or 9–3:30",
            cost: {
                es: "1350",
                en: "1350",
            }
        },
        {
            es: "Cama afuera lunes a viernes 8 a 2 o 12 a 6",
            en: "Live-out domestic worker: Mon–Fri 8–2 or 12–6",
            cost: {
                es: "1250",
                en: "1250",
            }
        },
        {
            es: "Cama afuera lunes a viernes 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8–1",
            cost: {
                es: "1150",
                en: "1150",
            }
        },
        {
            es: "4 veces: (Entre lunes y viernes) 8 a 4:30",
            en: "4 days a week: Mon–Fri 8–5",
            cost: {
                es: "80 por día o 1280 mensual",
                en: "80 per day or 1280 monthly",
            }
        },
        {
            es: "3 veces: (lu-mi-vi) 8 a 4:30",
            en: "3 days a week: M-W-F 8–4:30",
            cost: {
                es: "80 por día o 960 mensual",
                en: "80 per day or 960 monthly",
            }
        },
        {
            es: "2 veces: (ma-ju) 8am a 4:30pm",
            en: "2 days a week: Tue–Thu 8am–5pm",
            cost: {
                es: "80 por día o 640 mensual",
                en: "80 per day or 640 monthly",
            }
        },
        {
            es: "1 vez: (ma o ju) 8am a 4:30pm",
            en: "1 day a week: Tue or Thu 8am–5pm",
            cost: {
                es: "80 por día o 320 mensual",
                en: "80 per day or 320 monthly",
            }
        },
    ];

    let arrayTCMx = [
        {
            es: "De planta sale sábados 12 pm, retorna lunes 7 am",
            en: "Live-in domestic worker: leaves Saturday at noon, returns Monday at 7am",
            cost: "13,000",
        },
        {
            es: "De planta sale viernes 6 pm, retorna domingo 9 pm",
            en: "Live-in domestic worker: leaves Friday at 6pm, returns Sunday at 9pm",
            cost: "13,000",
        },
        {
            es: "De planta sale viernes 6 pm, retorna lunes 7 am",
            en: "Live-in domestic worker: leaves Friday at 6pm, returns Monday at 7am",
            cost: "12,500",
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 6:30 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8am–6:30pm + Sat 8am–1pm",
            cost: "12,500",
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 6:30",
            en: "Live-out domestic worker: Mon–Fri 8am–6:30pm",
            cost: "11,500",
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 5:30 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8am–5:30pm + Sat 8am–1pm",
            cost: "11,000",
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 4:30 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8am–4:30pm + Sat 8am–1pm",
            cost: "10,500",
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 5:30",
            en: "Live-out domestic worker: Mon–Fri 8am–5:30pm",
            cost: "10,000",
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 3 + sábados 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8am–3pm + Sat 8am–1pm",
            cost: "9,500",
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 4:30",
            en: "Live-out domestic worker: Mon–Fri 8am–4:30pm",
            cost: "9,500",
        },
    ];

    let arrayMTMx = [
        {
            es: "Entrada por salida lunes a sábado 8 a 1",
            en: "Live-out domestic worker: Mon–Sat 8am–1pm",
            cost: {
                es: "8,500",
                en: "8,500",
            },
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 2:30 o 9 a 3:30",
            en: "Live-out domestic worker: Mon–Fri 8am–2:30pm or 9am–3:30pm",
            cost: {
                es: "8,500",
                en: "8,500",
            },
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 2 o 12 a 6",
            en: "Live-out domestic worker: Mon–Fri 8am–2pm or noon–6pm",
            cost: {
                es: "7,500",
                en: "7,500",
            },
        },
        {
            es: "Entrada por salida lunes a viernes 8 a 1",
            en: "Live-out domestic worker: Mon–Fri 8am–1pm",
            cost: {
                es: "6,500",
                en: "6,500",
            },
        },
        {
            es: "Por días 4 veces: (entre lunes y viernes) 8 a 4:30",
            en: "4 days a week: selected days Mon–Fri, 8am–4:30pm",
            cost: {
                es: "500 por día o 8,000 mensual",
                en: "500 per day or 8,000 per month",
            },
        },
        {
            es: "Por días 3 veces: (lunes-miércoles-viernes) 8 a 4:30",
            en: "3 days a week: Mon, Wed and Fri, 8am–4:30pm",
            cost: {
                es: "500 por día o 6,000 mensual",
                en: "500 per day or 6,000 per month",
            },
        },
        {
            es: "Por días 2 veces: (martes-jueves) 8 a 4:30",
            en: "2 days a week: Tue and Thu, 8am–4:30pm",
            cost: {
                es: "500 por día o 4,000 mensual",
                en: "500 per day or 4,000 per month",
            },
        },
        {
            es: "Por días 1 vez: (martes o jueves) 8 a 4:30",
            en: "1 day a week: Tue or Thu, 8am–4:30pm",
            cost: {
                es: "500 por día o 2,000 mensual",
                en: "500 per day or 2,000 per month",
            },
        },
    ];

    let sueldoLista = {
        lista1: country === 'mx' ? arrayTCMx : arrayTCPe,
        lista2: country === 'mx' ? arrayMTMx : arrayMTPe,
    };

    return (
        <>
            <a
                className="twi enlace-referidos referidos-link font-weight-bold"
                role="button"
                onClick={() => setShow(true)}
            >
                <u>{textHere[lang]}</u>
            </a>

            <Modal
                className="bertha-modal-aviso"
                size="xl"
                show={show}
                onHide={() => setShow(false)}
                centered
            >
                <ModalHeader className="bertha-content-aviso" closeButton />

                <ModalBody className="row mx-0 justify-content-center">
                    <div className="tc-modal-document col-12 col-md-11 px-0 mb-3">

                        <div className="titulo-seccion py-2 mb-3">
                            <h3 className="display-5 titulo texto-morado responsive-title-size">
                                {textTitle[lang]}
                            </h3>
                        </div>

                        <p className="font-weight-bold">{textFullTime[lang]}</p>

                        <div className="ps-2 py-2">
                            {sueldoLista.lista1.map((d, i) => (
                                <p key={i} className="pb-2 fw-100">
                                    {d[lang] + ": " + d.cost}
                                </p>
                            ))}
                        </div>

                        <p className="font-weight-bold">{textPartTime[lang]}</p>

                        <div className="ps-2 py-2">
                            {sueldoLista.lista2.map((d, i) => (
                                <p key={i} className="pb-2 fw-100">
                                    {d[lang] + ": " + d.cost[lang]}
                                </p>
                            ))}
                        </div>

                    </div>
                </ModalBody>

                <ModalFooter className="center-button-modal">
                    <a
                        className="btn bertha-pink-button full-size font-weight-bold text-white"
                        onClick={() => setShow(false)}
                    >
                        {textViewWorkers[lang]}
                    </a>
                </ModalFooter>
            </Modal>
        </>
    );
}
