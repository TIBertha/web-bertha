import React, { useState } from "react";
import parse from "html-react-parser";

import { checkInCart } from "../../../Functions/Seleccion.jsx";
import { getDisponibilidad } from "../../../Functions/TrabajadorCard.jsx";

import Tooltips from "../../Components/tooltips.jsx";
import TooltipDisponibilidad from "../../Seleccion/Components/tooltipDisponibilidad.jsx";

export default function ColumnaInformacionBasica({
    url,
    addCart,
    country = 54,
    closeDrawer,
    removeCart,
    privado,
    retrato,
    nombreTrabajador,
    video,
    actividad,
    modalidad,
    informacionBasica,
    identificacion,
    idioma,
    iconDocumentoIdentidad,
    openModalVideo,
    dataseleccion,
    isSeleccion,
    cart,
    disponibilidad,
}) {
    const [force, setForce] = useState(null);
    let isInCart = checkInCart(cart, dataseleccion.id);

    const add = (data) => {
        addCart(data);
        closeDrawer();
        setForce(1);
    };

    const remove = (id) => {
        removeCart(id);
        setForce(2);
    };

    let disponibilidadCSS = getDisponibilidad(disponibilidad);

    console.log(disponibilidadCSS);

    return (
        <section className="map p-3">
            <div className="py-3 text-center">
                {retrato &&
                    <img className="retrato align-middle" src={retrato} />
                }
                <p className="mb-0 nombre-trabajador py-2">
                    {nombreTrabajador}
                    <i className="fas fa-check-circle check ms-2"></i>
                </p>

                {(video || isSeleccion || (video && isSeleccion)) && (
                    <div className={"row justify-content-center mx-0"}>
                        {video && (
                            <div className="col-12 col-lg-auto p-2">
                                <div
                                    className="btn bertha-pink-button font-weight-bold"
                                    role="button"
                                    onClick={() => openModalVideo(video)}
                                >
                                    <i className="fab fa-youtube me-1"></i>Ver video
                                </div>
                            </div>
                        )}

                        {isSeleccion && (
                            <div className="col-12 col-lg-auto p-2">
                                <div
                                    className="btn btn-outline-purple font-weight-bold"
                                    onClick={() => {
                                        isInCart
                                            ? remove(dataseleccion.id)
                                            : add(dataseleccion);
                                    }}
                                >
                                    {isInCart
                                        ? "Quitar"
                                        : country === 11
                                          ? "Escoger"
                                          : "Entrevistar"}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className={"row justify-content-center mx-0 py-2"}>
                    <div className="col-12">
                        <div className={disponibilidadCSS.class + " font-1rem"}>
                            <TooltipDisponibilidad
                                additionalIconClass={disponibilidadCSS.class}
                                text={disponibilidadCSS.tooltip}
                                estilo={"tooltip-disponibilidad-alta"}
                                placement={"top"}
                            >
                            <span>
                                <i className="fas fa-info-circle me-2"></i>
                                {disponibilidadCSS.text}
                            </span>
                            </TooltipDisponibilidad>
                        </div>
                    </div>
                    <div className="col-12 text-disponiblidad">
                        <span>{disponibilidadCSS.tooltip}</span>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">Aspecto Laboral</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10">
                        {actividad && (
                            <>
                                <p>Actividades:</p>
                                <div className="mb-2 actividad-modalidad-idioma">
                                    {actividad.map((data, index) => {
                                        return (
                                            <span key={index}>
                                                {data.nombre}
                                            </span>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        <p>Modalidades:</p>

                        <div className="mb-2 actividad-modalidad-idioma">
                            {modalidad.camaAdentro ? (
                                <span>
                                    {country === 49
                                        ? "De Planta"
                                        : "Cama Adentro"}
                                </span>
                            ) : (
                                ""
                            )}
                            {modalidad.camaAfuera ? (
                                <span>
                                    {country === 49
                                        ? "Entrada por Salida"
                                        : "Cama Afuera"}
                                </span>
                            ) : (
                                ""
                            )}
                            {modalidad.porDias ? <span>Por Días</span> : ""}
                        </div>

                        <p>Mascotas:</p>

                        <div className="mb-2 actividad-modalidad-idioma">
                            <span>
                                {informacionBasica.aceptamascotas === true
                                    ? "Si Acepta"
                                    : "No Acepta"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">Información Básica</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10">
                        <p>
                            Lugar de Nacimiento: {informacionBasica.procedencia}
                        </p>
                        <p>
                            País de Nacimiento:{" "}
                            {informacionBasica.pais_procedencia}
                        </p>
                        <p>
                            Fecha de Nacimiento:{" "}
                            {informacionBasica.fechaNacimiento}
                        </p>
                        <p>Edad: {informacionBasica.edad}</p>
                        <p>Estado Civil: {informacionBasica.estadoCivil}</p>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">Identificación</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 px-0">
                        <div className="row mx-0">
                            <div className="col-10 my-auto">
                                <p>
                                    Tipo Documento:{" "}
                                    {identificacion.tipoDocumento}
                                </p>
                                <p>
                                    Número Documento:{" "}
                                    {identificacion.numeroDocumento}
                                </p>
                            </div>
                            <div className="col-2 my-auto text-center">
                                {
                                    <>
                                        {identificacion.fotoDocumentoDelantera &&
                                            identificacion.fotoDocumentoPosterior && (
                                                <Tooltips
                                                    text={parse(
                                                        '<img class="icon-documento-identidad" src="' +
                                                            identificacion.fotoDocumentoDelantera +
                                                            '"/><br><img class="icon-documento-identidad pt-2" src="' +
                                                            identificacion.fotoDocumentoPosterior +
                                                            '"/>',
                                                    )}
                                                    iconclass={
                                                        iconDocumentoIdentidad
                                                    }
                                                    estilo={"tooltip-perfil"}
                                                    placement={"bottom"}
                                                    icon={'fas fa-id-card'}
                                                    additionalIconClass={'icono'}
                                                />
                                            )}

                                        {identificacion.fotoDocumentoDelantera &&
                                            identificacion.fotoDocumentoPosterior ==
                                                null && (
                                                <Tooltips
                                                    text={parse(
                                                        '<img class="icon-documento-identidad" src="' +
                                                            identificacion.fotoDocumentoDelantera +
                                                            '"/>',
                                                    )}
                                                    iconclass={
                                                        iconDocumentoIdentidad
                                                    }
                                                    estilo={"tooltip-perfil"}
                                                    placement={"bottom"}
                                                    icon={'fas fa-id-card'}
                                                    additionalIconClass={'icono'}
                                                />
                                            )}

                                        {identificacion.fotoDocumentoDelantera ==
                                            null &&
                                            identificacion.fotoDocumentoPosterior && (
                                                <Tooltips
                                                    text={parse(
                                                        '<img class="icon-documento-identidad" src="' +
                                                            identificacion.fotoDocumentoPosterior +
                                                            '"/>',
                                                    )}
                                                    iconclass={
                                                        iconDocumentoIdentidad
                                                    }
                                                    estilo={"tooltip-perfil"}
                                                    placement={"bottom"}
                                                    icon={'fas fa-id-card'}
                                                    additionalIconClass={'icono'}
                                                />
                                            )}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {idioma.length > 0 && (
                <>
                    <hr />

                    <div className="py-3">
                        <p className="titulo-seccions m-0">Idiomas</p>
                        <div className="row mx-0 justify-content-end detalles mt-2">
                            <div className="col-12 col-xl-10">
                                <div className="mb-2 actividad-modalidad-idioma">
                                    {idioma.map((data, index) => {
                                        return (
                                            <span key={index}>
                                                {data.nombre}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
