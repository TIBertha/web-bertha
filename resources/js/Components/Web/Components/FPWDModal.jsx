import React, {useState} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import fpWebDesignsLogo from "../../../../../public/img/fp-web-designs-logo-black.svg";

export default function FPWDModal({labelText, lang = 'es'}) {
    const [showModal, setShowModal] = useState(false);

    const frameText = {
        es: {
            slogan: "¿Creamos tu próxima web?",
        },
        en: {
            slogan: "Let’s build your next website.",
        },
    };

    const text = frameText[lang] ?? frameText.en;

    const contactMessage = {
        es: "¡Hola! Vi tu trabajo en la web de Bertha y me interesa crear una página web contigo. ¿Podrías darme más información?",
        en: "Hi! I saw your work on the Bertha website and I’m interested in having you build a website for me. Could you share more information?",
    };

    const encodedMessage = encodeURIComponent(
        contactMessage[lang] ?? contactMessage.en
    );

    const fpLinks = [
        {
            id: 1,
            media: 'WEB',
            button: {
                es: 'Visita mi web',
                en: 'Visit my website'
            },
            icon: 'fa-solid fa-globe',
            link: 'https://fp-webdesigns.com'
        },
        {
            id: 2,
            media: 'WhatsApp',
            button: {
                es: 'Hablemos por WhatsApp',
                en: 'Let’s chat on WhatsApp'
            },
            icon: 'fa-brands fa-whatsapp',
            link: `https://wa.me/18134010513?text=${encodedMessage}`
        },
        {
            id: 3,
            media: 'SMS',
            button: {
                es: 'Envíame un mensaje de texto',
                en: 'Send me a text'
            },
            icon: 'fa-solid fa-comment-sms',
            link: `sms:+18134010513?body=${encodedMessage}`
        },
    ];

    return(
        <>
            <div className="fp-web-designs-label">
                    <span>
                        {labelText.fpLabel1}
                        <i className="fa-solid fa-heart text-pink" aria-hidden="true" />
                        {labelText.fpLabel2}
                    </span>

                <a
                    onClick={() => setShowModal(true)}
                >
                    <img
                        src={fpWebDesignsLogo}
                        alt="FP Web Designs"
                        className="fp-web-designs-logo"
                    />
                </a>
            </div>

            <Modal
                size="md"
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                scrollable
                className="fp-web-designs--modal"
            >
                <ModalHeader className="border-0" closeButton></ModalHeader>
                <ModalBody>
                    <div className={'logo-div'}>
                        <img src={fpWebDesignsLogo} alt="FP Web Designs" className={'w-75'}/>
                    </div>
                    <div className={'slogan-div'}>{text.slogan}</div>

                    <div className={'links-div'}>
                        {fpLinks.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target={item.media === 'SMS' ? undefined : '_blank'}
                                rel={item.media === 'SMS' ? undefined : 'noopener noreferrer'}
                                className={`fp-link-button btn ${
                                    item.media === 'SMS' ? 'd-md-none' : ''
                                }`}
                            >
                                <i className={`${item.icon} me-2`} aria-hidden="true" />
                                <span>{item.button[lang] ?? item.button.en}</span>
                            </a>
                        ))}
                    </div>
                </ModalBody>
            </Modal>
        </>
    )

}
