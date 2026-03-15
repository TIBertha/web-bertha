import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalTitle, ModalHeader} from "react-bootstrap";

export default function VerCompromiso({}) {
    const [show, setShow] = useState(false);

    return(
        <>
            <a className="btn btn-lg button-verificación" role="button" onClick={() => setShow(true)} >Ver compromiso<i className="fas fa-file-signature ms-3"></i></a>

            <Modal size="lg" scrollable={false} backdrop="static" keyboard={false} show={show} onHide={() => setShow(false)} centered={true}>
                <ModalHeader className="border-0 modal-compartir modal-header pb-0 pt-2" closeButton>
                </ModalHeader>
                <ModalBody className="mx-0 modal-compartir py-2 compromiso-ficha-web">

                    <section className="container titulo text-center mt-4 mb-5">
                        <h3 className="font-weight-bold">Compromiso</h3>
                    </section>

                    <section className="container pb-4 px-0 px-md-2">
                        <div className="mb-2">
                            <p className="subtitulo">Acepto:</p>
                        </div>
                        <div>
                            <ol className="lista-compromiso">
                                <li>La verificación de mis antecedentes policiales, judiciales y penales.</li>
                                <li>La verificación de mis recomendaciones.</li>
                                <li>La agencia mostrará mi información a los empleadores.</li>
                                <li>Si no asisto a mi primer día de labores, la agencia no me presentará más empleadores.</li>
                                <li>Esperar 15 días para que consigan mi reemplazo, sino se considerará abandono de trabajo.</li>
                            </ol>
                        </div>
                    </section>
                </ModalBody>
            </Modal>
        </>
    )
}
