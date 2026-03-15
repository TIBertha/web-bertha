import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalTitle, ModalHeader} from "react-bootstrap";

export default function VerAdjunto({url, adjunto, nombreAdjunto}) {
    const [show, setShow] = useState(false);

    return (
        <>
            <i className="fas fa-file-alt icono" onClick={() => setShow(true)}></i>

            <Modal size="lg" show={show} onHide={() => setShow(false)} centered={true}>
                <ModalHeader className="border-0 modal-compartir" closeButton>
                    <Modal.Title>
                        <div className="tittle-area text-center font-weight-bold"><i className="fas fa-file pe-2"></i>Ver {nombreAdjunto}</div>
                    </Modal.Title>
                </ModalHeader>
                <ModalBody className="row mx-0 justify-content-center modal-compartir">
                    <div className="tc-modal-document text-center col-12 col-md-11 px-0 m-0">
                        <img className='w-75 h-auto' src={adjunto} />
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}
