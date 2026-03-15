import React, {Component, useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader ,ModalTitle} from "react-bootstrap";
import global from "../../../../Helpers/constantes.jsx";

import Messenger from "../../../../../../../public/img/icons/Messenger.png";
import WhatsApp from "../../../../../../../public/img/icons/WhatsApp.png";

import {WhatsappShareButton} from "react-share";

export default function ModalCompartir({url, token, name}) {
    let linkFicha = url + '/ficha-postulante/' + token;
    let textoWhatsapp2 = 'Hola! Te comparto la ficha de '+ name +', para acceder, ingresa a:';
    let linkWhatsApp = textoWhatsapp2 + ' '+ linkFicha;
    let linkMessenger = 'fb-messenger://share/?' + 'app_id='+ global.FACEBOOKAPPID + '&link='+ linkFicha + '/';

    const [show, setShow] = useState(false);
    const [textoBotonCopiar, setTextoBtnCopiar] = useState('Copiar enlace');

    function changeTextoBtnCopiar(){
        navigator.clipboard.writeText(linkFicha);

        setTextoBtnCopiar('Enlace copiado');

        setTimeout(function () {
            setTextoBtnCopiar('Copiar enlace')
        }, 1500);
    }

    function facebookMessengerShare() {
        window.location.href = linkMessenger;
    }

    return (
        <>
            <a className="btn white-button align-middle" role="button" onClick={() => setShow(true)}><i className="fas fa-share-alt"></i></a>

            <Modal size="lg" show={show} onHide={() => setShow(false)} centered={true}>
                <ModalHeader className="border-0 modal-compartir" closeButton>
                    <ModalTitle>
                        <div className="tittle-area text-center font-weight-bold"><i className="fas fa-share-alt pe-2"></i>Compartir ficha</div>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody className="row mx-0 justify-content-center modal-compartir">
                    <div className="tc-modal-document text-center col-12 col-md-11 px-0 m-0">

                        <section className="copy-section">
                            <p className="text-start mb-2 font-weight-bold ms-2">Enlace<i className="fas fa-link ms-2"></i></p>
                            <div className="row mx-0 copy-bar">
                                <div className="col-12 col-lg-9 px-0 left-hatch my-auto pb-2 pb-lg-0 d-none d-lg-block">
                                    {linkFicha}
                                </div>
                                <div className="col-12 col-lg-3 px-0 side-hatch my-auto">
                                    <span className="font-weight-bold text-purple finger-action" onClick={() => changeTextoBtnCopiar()}>{textoBotonCopiar}</span>
                                </div>
                            </div>
                        </section>

                        <section className="">
                            <div className="row mx-0 mb-3 justify-content-center">

                                <div className="col-auto px-0 d-sm-block d-md-none d-lg-none">
                                    <img className="social-icons" src={Messenger} onClick={() => facebookMessengerShare() }/>
                                </div>
                                <div className="col-auto px-0">
                                    <WhatsappShareButton url={linkWhatsApp} >
                                        <img className="social-icons" src={WhatsApp}/>
                                    </WhatsappShareButton>
                                </div>

                            </div>
                        </section>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}
