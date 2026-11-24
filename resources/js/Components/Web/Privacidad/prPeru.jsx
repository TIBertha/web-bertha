import React from "react";

export const PrPeru = {
    es: {
        title: "Política de Privacidad",

        resume: [
            `A través de este documento Bertha (la "Plataforma" o "Nosotros") regula el tratamiento de los datos personales facilitados por los Usuarios a la Plataforma. El Usuario, al visitar nuestra plataforma acepta y consiente las prácticas dispuestas en el presente documento.`,

            `Los datos del Usuario o Cliente serán tratados en conformidad con la Ley de Protección de Datos Personales (Ley N.º 29733) y el Decreto Supremo N.º 003-2013-JUS que aprobó su Reglamento, de la siguiente manera:`,
        ],

        items: [
            {
                title: "Qué información se recopila.",
                paragraphs: [
                    `Bertha recopila información proporcionada por sus Usuarios con la finalidad de gestionar sus servicios, así como mejorar la Plataforma, el soporte técnico o logístico, entre otras funciones.`,

                    `Los tipos de información del Usuario recopilados son:`,

                    <ul>
                        <li>
                            <span>Información facilitada libremente por el Usuario:</span>{" "}
                            consiste en los datos personales y toda información
                            recibida y almacenada a consecuencia del registro y
                            creación de una cuenta que realiza el Usuario, a
                            través de la Plataforma, entre ellos se encuentran
                            los nombres, apellidos, dirección de domicilio,
                            fecha de nacimiento, número de documento de
                            identidad, correo electrónico y número de teléfono
                            (en adelante los "Datos Personales"). Bertha, no
                            retiene directamente la información de la tarjeta
                            de pago o la información de pago, pero utiliza
                            proveedores de servicios de pago de terceros para
                            facilitar el procesamiento de la tarjeta de pago.
                        </li>

                        <li>
                            <span>Información automáticamente recolectada por uso de la Plataforma:</span>{" "}
                            consiste en la información recaudada producto de la
                            interacción y utilización que hace el Usuario en la
                            Plataforma, en esta se toma en cuenta: (i) fecha y
                            hora en la que el Usuario solicita el servicio, a
                            través de la Plataforma; (ii) historial de
                            solicitudes de servicio; (iii) Direcciones IP,
                            entre otros (en adelante la "Información de Uso").
                        </li>
                    </ul>,
                ],
            },
            {
                title: "Veracidad de los Datos Personales.",
                paragraphs: [
                    `El Usuario se compromete y admite proporcionar Datos Personales válidos, veraces, completos y exactos; de modo que el Usuario asume toda responsabilidad por la vigencia, validez, exactitud y veracidad de dichos Datos Personales otorgados y se compromete a mantener la debida actualización de los mismos.`,
                ],
            },
            {
                title: "Banco de Datos.",
                paragraphs: [
                    `La Plataforma mantiene todos los Datos Personales e Información de Uso suministrada por los Usuarios en un banco de datos de su titularidad. El cual se encuentra registrado ante la Autoridad Nacional de Protección de Datos Personales.`,
                ],
            },
            {
                title: "Uso de Datos Personales.",
                paragraphs: [
                    `El Tratamiento de los Datos Personales e información proporcionada por el Usuario está destinado a:`,

                    <ul>
                        <li>Registro del Usuario</li>
                        <li>Verificar la identidad del Usuario</li>
                        <li>Brindar soporte técnico al Usuario</li>
                        <li>
                            Ponerse en contacto o enviar notificaciones al
                            Usuario (vía email, SMS, WhatsApp o llamada).
                        </li>
                        <li>
                            Evaluar el servicio que brinda la Plataforma, así
                            como el servicio brindado por los Proveedores.
                        </li>
                        <li>
                            Poder atender los reclamos o sugerencias de los
                            Proveedores y/o Usuarios.
                        </li>
                        <li>Envío de publicidad y promociones comerciales.</li>
                        <li>
                            Transferir la Información del Usuario a empresas
                            que brinden servicios basados en infraestructura
                            en la nube en el extranjero, Estados Unidos.
                        </li>
                    </ul>,

                    `El Usuario declara expresamente que ha sido propiamente informado de las finalidades mencionadas sobre el tratamiento de sus Datos Personales e Información de Uso; así como reconoce que ni para dicho tratamiento ni para la ejecución de la relación contractual será necesario su consentimiento.`,

                    `Por tanto, mediante la aceptación de la presente Política de Privacidad el Usuario otorga su consentimiento de manera previa, libre, expresa, inequívoca e informada para el uso y tratamiento de su información proporcionada según las finalidades mencionadas.`,
                ],
            },
            {
                title: "Seguridad de los Datos Personales.",
                paragraphs: [
                    `Bertha reconoce la importancia de los Datos Personales proporcionados por el Usuario por lo que adopta medidas de seguridad adecuadas para garantizar la protección de dicha información, tales como el uso de estándares de la industria en materia de protección de confidencialidad de la Información del Usuario.`,
                ],
            },
            {
                title: "Información requerida por Autoridades Públicas.",
                paragraphs: [
                    `Bertha no compartirá Información del Usuario sin que haya constancia de su consentimiento, salvo los siguientes casos: (i) solicitudes de información de autoridades públicas en ejercicio de sus funciones y el ámbito de sus competencias; (ii) solicitudes de información en virtud de órdenes judiciales; y, (iii) solicitudes de información en virtud de disposiciones legales.`,
                ],
            },
            {
                title: "Derechos del Usuario.",

                paragraphs: ({ whatsapp, whatsappLink }) => [
                    <>
                        Bertha presenta el siguiente número WhatsApp{" "}
                        <a
                            className="link-ph font-weight-bold"
                            href={`https://wa.me/${whatsappLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {whatsapp}
                        </a>{" "}
                        para que el usuario dirija solicitudes o peticiones
                        vinculadas a su derecho de acceso, información,
                        actualización, rectificación, inclusión, supresión o
                        cancelación y oposición de sus datos personales. No
                        obstante, sin perjuicio de lo anteriormente dispuesto,
                        la plataforma se reserva la facultad de conservar
                        determinada información a fin de que sirva de prueba
                        ante una eventual reclamación contra nuestra empresa
                        por responsabilidades derivadas del tratamiento de la
                        información suministrada por el usuario.
                    </>,
                ],
            },
            {
                title: "Modificación de la Política de Privacidad.",
                paragraphs: [
                    `Bertha se reserva el derecho a realizar, en el momento que crea conveniente y a su sola discreción, cualquier tipo de modificación, actualización o ampliación de la presente Política de Privacidad. Cualquier modificación o actualización será inmediatamente publicada y siendo responsabilidad del Usuario revisar los términos vigentes al momento de utilizar la Plataforma. En caso de que el Usuario no estuviera de acuerdo con las modificaciones mencionadas, podrá optar por no hacer uso de la Plataforma.`,
                ],
            },
        ],
    },

    en: {
        title: "Privacy Policy",

        resume: [
            `Through this document, Bertha (the “Platform” or “We”) explains how we process the personal data provided by Users. By accessing or using our Platform, the User accepts and agrees to the practices described in this Privacy Policy.`,

            `User and Client information is processed in accordance with the Personal Data Protection Law (Law No. 29733) and Supreme Decree No. 003-2013-JUS, under the following terms:`,
        ],

        items: [
            {
                title: "Information We Collect",
                paragraphs: [
                    `Bertha collects information provided by Users to manage services, improve the Platform, and provide technical or logistical support, among other functions.`,

                    `We collect the following types of User information:`,

                    <ul>
                        <li>
                            <span>Information voluntarily provided by the User:</span>{" "}
                            This includes personal data submitted during
                            account creation, such as first name, last name,
                            home address, date of birth, identification
                            number, email, and phone number (“Personal Data”).
                            Bertha does not store payment card details
                            directly; instead, we rely on third-party payment
                            processors.
                        </li>

                        <li>
                            <span>Information automatically collected through Platform usage:</span>{" "}
                            This includes data generated through User
                            interaction, such as: (i) date and time of service
                            requests; (ii) service request history; (iii) IP
                            addresses; and other usage-related information
                            (“Usage Information”).
                        </li>
                    </ul>,
                ],
            },
            {
                title: "Accuracy of Personal Data",
                paragraphs: [
                    `The User agrees to provide valid, truthful, complete, and accurate Personal Data and is responsible for keeping such information updated.`,
                ],
            },
            {
                title: "Data Storage",
                paragraphs: [
                    `The Platform stores all Personal Data and Usage Information in a proprietary data bank registered with the National Authority for Personal Data Protection.`,
                ],
            },
            {
                title: "Use of Personal Data",
                paragraphs: [
                    `Personal Data and Usage Information are processed for the following purposes:`,

                    <ul>
                        <li>User registration</li>
                        <li>Identity verification</li>
                        <li>Technical support</li>
                        <li>
                            Contacting the User (email, SMS, WhatsApp, or
                            phone call)
                        </li>
                        <li>Evaluating Platform and Provider performance</li>
                        <li>Handling complaints or suggestions</li>
                        <li>Sending commercial promotions and advertising</li>
                        <li>
                            Transferring User information to cloud-based
                            services abroad (United States)
                        </li>
                    </ul>,

                    `By accepting this Privacy Policy, the User provides free, informed, express, and unequivocal consent for the processing of their Personal Data and Usage Information.`,
                ],
            },
            {
                title: "Security of Personal Data",
                paragraphs: [
                    `Bertha implements appropriate security measures, including industry-standard confidentiality and data protection practices.`,
                ],
            },
            {
                title: "Information Required by Public Authorities",
                paragraphs: [
                    `Bertha will not share User information without consent, except in the following cases: (i) requests from public authorities acting within their legal powers; (ii) judicial orders; (iii) legal mandates requiring disclosure.`,
                ],
            },
            {
                title: "User Rights",

                paragraphs: ({ whatsapp, whatsappLink }) => [
                    <>
                        Bertha provides the following WhatsApp number:{" "}
                        <a
                            className="link-ph font-weight-bold"
                            href={`https://wa.me/${whatsappLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {whatsapp}
                        </a>
                        , so Users may submit requests related to their
                        rights of access, information, updating, rectification,
                        inclusion, deletion, cancellation, or opposition
                        regarding their Personal Data.
                    </>,
                ],
            },
            {
                title: "Modifications to the Privacy Policy",
                paragraphs: [
                    `Bertha may modify this Privacy Policy at any time. Updates will be published immediately, and it is the User’s responsibility to review the current terms.`,
                ],
            },
        ],
    },
};
