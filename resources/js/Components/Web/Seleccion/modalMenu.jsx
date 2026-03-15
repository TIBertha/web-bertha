import React, { useState } from "react";
import {
    Modal,
    ModalBody,
    ModalTitle,
    ModalHeader,
    ModalFooter,
} from "react-bootstrap";
import FiltrosMobile from "./filtrosMobile.jsx";

export default function ModalMenu({
    filtrosSelected,
    addFilter,
    removeFilter,
    actividades,
    modalidades,
}) {
    const [show, setShow] = useState(false);

    function actionClose() {
        setShow(false);
    }

    function actionShow() {
        setShow(true);
    }

    const handleShow = () => actionShow();
    const handleClose = () => actionClose();

    let isNotFiltroPage = filtrosSelected.some((e) => e.filtro !== "page");
    let cantidadFiltros = filtrosSelected.filter(
        (e) => e.filtro !== "page",
    ).length;

    return (
        <>
            <div className="d-block d-md-none mb-4 mx-2 mx-md-0">
                <div
                    className="openModalLinkFiltro"
                    onClick={() => handleShow()}
                >
                    <div>
                        <i className="fas fa-sliders-h me-2"></i>Filtros{" "}
                        {isNotFiltroPage ? (
                            <span className="ms-2 badge bgb-pink">
                                {cantidadFiltros}
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                {filtrosSelected.length > 0 && (
                    <div className="text-start pt-3">
                        {filtrosSelected.map((data, key) => {
                            if (data.filtro !== "page") {
                                return (
                                    <span key={key}>
                                        <button
                                            type="button"
                                            className="filtro-tag"
                                        >
                                            {data.label}{" "}
                                            <i
                                                className="fas fa-times icon-close-filtro-tag"
                                                onClick={() =>
                                                    removeFilter(data.filtro)
                                                }
                                            ></i>
                                        </button>
                                    </span>
                                );
                            }
                        })}
                    </div>
                )}
            </div>

            <Modal size="lg" show={show} onHide={actionClose} centered={true}>
                <ModalHeader className="border-0 modal-compartir" closeButton>
                    <ModalTitle>
                        <div className="tittle-area text-center font-weight-bold">
                            <i className="fas fa-sliders-h me-2"></i>Filtros{" "}
                            {isNotFiltroPage ? (
                                <span className="ms-2 badge badge-secondary badge-pink-bertha">
                                    {cantidadFiltros}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody className="row mx-0 justify-content-center modal-compartir">
                    <div className="tc-modal-document text-center col-12 px-0 m-0">
                        <FiltrosMobile
                            filtrosSelected={filtrosSelected}
                            add={addFilter}
                            remove={removeFilter}
                            actividades={actividades}
                            modalidades={modalidades}
                        />
                    </div>
                </ModalBody>
                <ModalFooter className="">
                    <section className="w-100">
                        <div className="" onClick={() => handleClose()}>
                            <button
                                className="filtro-pink-button btn-lg btn-block btn"
                                type="button"
                            >
                                Ver resultados
                            </button>
                        </div>
                    </section>
                </ModalFooter>
            </Modal>
        </>
    );
}
