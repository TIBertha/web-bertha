import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";

export default function VisualizarImagen({ url, imagen }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <a
                className="btn btn-lg button-verificación"
                onClick={() => setShow(true)}
            >
                Ver verificación<i className="fas fa-file-image ms-3"></i>
            </a>

            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                centered={true}
            >
                <ModalHeader
                    className="border-0 modal-compartir modal-header pb-0 pt-2"
                    closeButton
                ></ModalHeader>
                <ModalBody className="row mx-0 justify-content-center modal-compartir py-2">
                    <img src={imagen} className="img-verificacion" />
                </ModalBody>
            </Modal>
        </>
    );
}
