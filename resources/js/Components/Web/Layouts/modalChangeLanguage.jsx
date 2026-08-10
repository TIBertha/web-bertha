import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalTitle, ModalHeader } from "react-bootstrap";

export default function ModalChangeLanguage({url, path, countryTooltip, lang}){
    const [show, setShow] = useState(false);

    const chngLangText = {
        es: {
            title: 'Bertha esta disponible para todo el Perú',
            sub: 'Seleccione un idioma:',
            esOpt: 'Español',
            enOpt: 'Inglés',
        },
        en: {
            title: 'Bertha is available throughout Peru',
            sub: 'Select a language:',
            esOpt: 'Spanish',
            enOpt: 'English',
        }
    }

    function switchLang(langSelected) {

        // Detectar si el path contiene idioma
        const hasLangSegment = path.includes('es-pe') || path.includes('en-pe');

        if (hasLangSegment) {
            // Caso 1: ruta con idioma
            const currentLangSegment = path.includes('es-pe') ? 'es-pe' : 'en-pe';
            const newLangSegment = langSelected + '-pe';
            const newPath = path.replace(currentLangSegment, newLangSegment);

            window.location.href = '/' + newPath;
            return;
        }

        // Caso 2: ruta SIN idioma → cambiar idioma en Laravel
        window.location.href = `/change-lang/${langSelected}`;
    }

    return (
        <>
            <a
                role="button"
                onClick={(e) => setShow(true)}
                className={"langModal-button "}
            >
                <div className={'langModal-div'}>
                    <span
                        className="flag-icon flag-icon-pe flag-icon-squared flag-style flag"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title={countryTooltip}
                    ></span>
                    <span className={'lang ms-2'}>{lang.toUpperCase()}</span>
                </div>
            </a>
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                centered={true}
                dialogClassName={"custom-modal"}
            >
                <ModalHeader className="border-0 modal-compartir modal-header pb-0 pt-2" closeButton ></ModalHeader>
                <ModalBody className="py-20 text-center selectLangModal">
                    <p className={'title'}>{chngLangText[lang].title}</p>
                    <p className={'sub'}>{chngLangText[lang].sub}</p>

                    <div className={'langOptions'}>
                        <ul>
                            <li className={lang === 'es' ? 'selected' : ''} onClick={lang === 'es' ? null : () => switchLang('es')} >
                                {chngLangText[lang].esOpt}
                            </li>

                            <li className={lang === 'en' ? 'selected' : ''} onClick={lang === 'en' ? null : () => switchLang('en')} >
                                {chngLangText[lang].enOpt}
                            </li>
                        </ul>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
