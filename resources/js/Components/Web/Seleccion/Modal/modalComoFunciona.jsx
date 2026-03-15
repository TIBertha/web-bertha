import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import FrameComoFunciona from "../../Home/frameComoFunciona.jsx";

export default function ModalComoFunciona({url, showModal, setShowModal, closeModal, country}) {
    return (
        <Modal className={'bertha-modal-aviso'} size="xl" scrollable={true} show={showModal} onHide={() => setShowModal(false)} centered={true} backdrop="static" keyboard={false}>

            <ModalHeader className="bertha-content-aviso" closeButton></ModalHeader>

            <ModalBody className={'no-select-text'}>
                <FrameComoFunciona url={url} showButton={false} country={country}/>
            </ModalBody>

            <ModalFooter className="center-button-modal">
                <a className="btn btn-lg bertha-pink-button w-100 font-weight-bold text-white" onClick={()=>closeModal()} >Ver trabajadoras</a>
            </ModalFooter>

        </Modal>
    )
}
