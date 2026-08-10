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
            es: "Cama adentro sale sábados 1pm, retorna lunes 7am",
            en: "Live-in domestic worker: leaves Saturdays 1pm, returns Monday 7am",
            cost: "1750",
        },
        {
            es: "Cama adentro sale viernes 7pm, retorna domingo 7pm",
            en: "Live-in domestic worker: leaves Friday 7pm, returns Sunday 7pm",
            cost: "1750",
        },
        {
            es: "Cama adentro sale viernes 7pm, retorna lunes 7am",
            en: "Live-in domestic worker: leaves Friday 7pm, returns Monday 7am",
            cost: "1700",
        },
        {
            es: "Cama afuera de lunes a viernes de 8am a 7pm + sábados 8am a 1pm",
            en: "Live-out domestic worker: Mon–Fri 8am–7pm + Sat 8am–1pm",
            cost: "1700"
        },
        {
            es: "Cama afuera de lunes a viernes de 8am a 7pm",
            en: "Live-out domestic worker: Mon–Fri 8am–7pm",
            cost: "1600"
        },
        {
            es: "Cama afuera de lunes a viernes de 8am a 6pm + sábados 8am a 1pm",
            en: "Live-out domestic worker: Mon–Fri 8am–6pm + Sat 8am–1pm",
            cost: "1550",
        },
        {
            es: "Cama afuera de lunes a viernes de 8am a 5pm + sábados 8am a 1pm",
            en: "Live-out domestic worker: Mon–Fri 8am–5pm + Sat 8am–1pm",
            cost: "1450",
        },
        {
            es: "Cama afuera de lunes a viernes de 8am a 6pm",
            en: "Live-out domestic worker: Mon–Fri 8am–6pm",
            cost: "1450"
        },
        {
            es: "Cama afuera de lunes a viernes 8am a 3:30pm + sábados 8am a 1pm",
            en: "Live-out domestic worker: Mon–Fri 8am–3:30pm + Sat 8am–1pm",
            cost: "1400",
        },
        {
            es: "Cama afuera de lunes a viernes 8am a 5pm",
            en: "Live-out domestic worker: Mon–Fri 8am–5pm",
            cost: "1400",
        },
    ];

    let arrayMTPe = [
        {
            es: "Cama afuera lunes a sábado de 8am a 1pm",
            en: "Live-out domestic worker: Mon–Sat 8am–1pm",
            cost: "1350",
        },
        {
            es: "Cama afuera de lunes a viernes 8am a 3pm o 9am a 4pm",
            en: "Live-out domestic worker: Mon–Fri 8am–3pm or 9am–4pm",
            cost: "1350",
        },
        {
            es: "Cama afuera de lunes a viernes 8am a 2pm o 12am a 6pm",
            en: "Live-out domestic worker: Mon–Fri 8am–2pm or 12pm–6pm",
            cost: "1250",
        },
        {
            es: "Cama afuera de lunes a viernes 8am a 1pm",
            en: "Live-out domestic worker: Mon–Fri 8am–1pm",
            cost: "1150",
        },
        {
            es: "4 veces: (Entre lunes y viernes) 8am a 5pm",
            en: "4 days a week: Mon–Fri 8am–5pm",
            cost: "80 per day or 1280 monthly",
        },
        {
            es: "3 veces: (lunes-miércoles-viernes o martes-jueves-sábado) 8am a 5pm",
            en: "3 days a week: M-W-F or T-Th-Sat 8am–5pm",
            cost: "80 per day or 960 monthly",
        },
        {
            es: "2 veces: (martes-jueves) 8am a 5pm",
            en: "2 days a week: Tue–Thu 8am–5pm",
            cost: "80 per day or 640 monthly",
        },
        {
            es: "1 vez: (martes o jueves) 8am a 5pm",
            en: "1 day a week: Tue or Thu 8am–5pm",
            cost: "80 per day or 320 monthly",
        },
    ];

    let sueldoLista = {
        lista1: arrayTCPe,
        lista2: arrayMTPe,
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
                                    {d[lang] + ": " + d.cost}
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
