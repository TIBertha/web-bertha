import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalTitle, ModalHeader } from "react-bootstrap";
import {mobileDesktop, ajaxCountLangModalView} from "../../Functions/General.jsx";
import mapaPeru from "../../../../../public/img/mapa-peru.png";

export default function ModalChangeLanguage({url, path, countryTooltip, lang}){
    const [show, setShow] = useState(false);
    const display = mobileDesktop();

    const chngLangText = {
        es: {
            title: 'Bertha también atiende a familias extranjeras, turistas, ejecutivos y/o diplomáticos que necesitan apoyo en',
            location: 'Lima, Perú.',
            sub1: 'Más de ',
            ye: '50 años',
            sub2: ' conectando hogares en Perú.',
            esOpt: 'Español',
            eo1: 'Continuar en Español',
            enOpt: 'Inglés',
            eo2: 'Continuar en Inglés',
        },
        en: {
            title: 'Bertha also assists foreign families, tourists, executives and diplomats who need support in',
            location: 'Lima, Peru.',
            sub1: 'More than ',
            ye: '50 years',
            sub2: ' connecting households in Peru.',
            esOpt: 'Spanish',
            eo1: 'Continue in Spanish',
            enOpt: 'English',
            eo2: 'Continue in English',
        }
    }

    // ⭐ COMPONENTE INTERNO REUTILIZABLE
    function LangOption({ code, flag, title, subtitle }) {
        const isSelected = lang === code;

        return (
            <div
                className={'optionStyle' + (isSelected ? ' selected' : '')}
                onClick={isSelected ? null : () => switchLang(code)}
            >
                <div className={'row justify-content-between mx-0'}>
                    <div className={'col-auto px-1'}>
                        <span
                            className={`flag-icon flag-icon-${flag}`}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title={countryTooltip}
                        ></span>
                    </div>

                    <div className={'col px-1 option text-start'}>
                        <p className={'title'}>{title}</p>
                        <p className={'subtitle'}>{subtitle}</p>
                    </div>

                    <div className={'col-auto px-1'}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        );
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

    const flag = (lang === 'es' ? 'pe' : 'us');

    return (
        <>
            <a
                role="button"
                onClick={(e) => {
                    setShow(true);
                    ajaxCountLangModalView();
                }}
                className={"langModal-button "}
            >
                <div className={'langModal-div'}>
                    <span
                        className={"flag-icon flag-icon-" + flag + " flag-icon-squared flag-style flag my-1 my-md0"}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title={countryTooltip}
                    ></span>
                    <span className={'lang text-purple ms-' + (display === 'desktop' ? '2' : '1') }>{lang.toUpperCase()}</span>
                </div>
            </a>
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                centered={true}
                dialogClassName={"custom-modal"}
            >
                <ModalHeader className="border-0 modal-compartir modal-header pb-0 pt-3" closeButton ></ModalHeader>
                <ModalBody className="py-20 text-center selectLangModal">

                    <div className={'peruMap'}>
                        <img src={mapaPeru} />
                    </div>

                    <p className={'title pt-4'}>{chngLangText[lang].title} <span className={'text-pink'}>{chngLangText[lang].location}</span></p>

                    <div className={'container'}>
                        <hr/>
                    </div>

                    <div className={'row mx-0 justify-content-center'}>
                        <div className={'col-12 col-md-9'}>
                            <div className={'selectLang-Area'}>

                                <LangOption
                                    code="es"
                                    flag="pe"
                                    title={chngLangText[lang].esOpt}
                                    subtitle={chngLangText[lang].eo1}
                                />

                                <LangOption
                                    code="en"
                                    flag="us"
                                    title={chngLangText[lang].enOpt}
                                    subtitle={chngLangText[lang].eo2}
                                />

                            </div>
                        </div>
                    </div>

                    <div className={'container'}>
                        <hr/>
                    </div>


                    <div className={'title pb-3'}><i className="fa-solid fa-house-circle-check me-2"></i> {chngLangText[lang].sub1}<span className={'text-pink'}>{chngLangText[lang].ye}</span>{chngLangText[lang].sub2}</div>
                </ModalBody>
            </Modal>
        </>
    );
}
