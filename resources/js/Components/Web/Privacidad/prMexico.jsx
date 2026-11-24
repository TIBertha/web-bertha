import { PrPeru } from "./prPeru.jsx";

export const PrMexico = {
    es: {
        ...PrPeru.es,

        resume: [
            PrPeru.es.resume[0],

            `Los datos del Usuario o Cliente serán tratados de conformidad con la legislación mexicana vigente en materia de protección de datos personales, la cual establece principios, derechos y obligaciones aplicables al tratamiento, uso, resguardo y protección de la información personal.`,
        ],

        items: PrPeru.es.items.map((item) =>
            item.title === "Banco de Datos."
                ? {
                    ...item,
                    paragraphs: [
                        `La Plataforma mantiene los Datos Personales e Información de Uso suministrados por los Usuarios en un banco de datos de su titularidad, destinados a la prestación y gestión de sus servicios, conforme a la presente Política de Privacidad.`,
                    ],
                }
                : item
        ),
    },

    en: {
        ...PrPeru.en,

        resume: [
            PrPeru.en.resume[0],

            `User and Client personal data will be processed in accordance with applicable Mexican personal data protection legislation, which establishes the principles, rights, and obligations governing the processing, use, safekeeping, and protection of personal information.`,
        ],

        items: PrPeru.en.items.map((item) =>
            item.title === "Data Storage"
                ? {
                    ...item,
                    paragraphs: [
                        `The Platform maintains the Personal Data and Usage Information provided by Users in a database under its ownership for the provision and management of its services, in accordance with this Privacy Policy.`,
                    ],
                }
                : item
        ),
    },
};
