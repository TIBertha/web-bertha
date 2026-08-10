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
    iconDocumentoIdentidad,
    openModalVideo,
    dataseleccion,
    isSeleccion,
    cart,
    disponibilidad,
    lang = 'es',
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

    let disponibilidadCSS = getDisponibilidad(disponibilidad, lang);

    const colText = {
        es: {
            verVideoButton: 'Ver video',
            quitarButton: 'Quitar',
            entrevistarButton: 'Entrevistar',
            sec1: 'Aspecto Laboral',
            actTitle: 'Actividades:',
            modTitle: 'Modalidades:',
            ca: 'Cama Adentro',
            cf: 'Cama Afuera',
            pd: 'Por Días',
            petTitle: 'Mascotas:',
            petY: 'Si Acepta',
            petN: 'No Acepta',
            sec2: 'Información Básica',
            birthPlace: 'Lugar de Nacimiento:',
            birthCountry: 'País de Nacimiento:',
            birthDate: 'Fecha de Nacimiento:',
            age: 'Edad:',
            sec3: 'Identificación',
            idType: 'Tipo Documento:',
            idNum: 'Número Documento:',


        },
        en: {
            verVideoButton: 'Watch video',
            quitarButton: 'Remove',
            entrevistarButton: 'Interview',
            sec1: 'Work Information',
            actTitle: 'Activities:',
            modTitle: 'Work Modalities:',
            ca: 'Live-in',
            cf: 'Live-out',
            pd: 'Per Day',
            petTitle: 'Pets:',
            petY: 'Accepts',
            petN: 'Does not accept',
            sec2: 'Basic Information',
            birthPlace: 'Place of Birth:',
            birthCountry: 'Country of Birth:',
            birthDate: 'Date of Birth:',
            age: 'Age:',
            sec3: 'Identification',
            idType: 'ID Type:',
            idNum: 'ID Number:',
        }
    }

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
                                    <i className="fab fa-youtube me-1"></i>{colText[lang].verVideoButton}
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
                                        ? colText[lang].quitarButton
                                        : colText[lang].entrevistarButton}
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
                <p className="titulo-seccions m-0">{colText[lang].sec1}</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10">
                        {actividad && (
                            <>
                                <p>{colText[lang].actTitle}</p>
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

                        <p>{colText[lang].modTitle}</p>

                        <div className="mb-2 actividad-modalidad-idioma">
                            {modalidad.camaAdentro ? <span>{colText[lang].ca}</span> : ''}
                            {modalidad.camaAfuera ? <span>{colText[lang].cf}</span> : ''}
                            {modalidad.porDias ? <span>{colText[lang].pd}</span> : ""}
                        </div>

                        <p>{colText[lang].petTitle}</p>

                        <div className="mb-2 actividad-modalidad-idioma">
                            <span>
                                {informacionBasica.aceptamascotas === true
                                    ? colText[lang].petY
                                    : colText[lang].petN}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">{colText[lang].sec2}</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10">
                        <p>{colText[lang].birthPlace + ' ' + informacionBasica.procedencia}</p>
                        <p>{colText[lang].birthCountry + ' ' + informacionBasica.pais_procedencia}</p>
                        <p>{colText[lang].birthDate + ' ' + informacionBasica.fechaNacimiento}</p>
                        <p>{colText[lang].age + ' ' + informacionBasica.edad}</p>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">{colText[lang].sec3}</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 px-0">
                        <div className="row mx-0">
                            <div className="col-10 my-auto">
                                <p>{colText[lang].idType + ' ' + identificacion.tipoDocumento}</p>
                                <p>{colText[lang].idNum + ' ' + identificacion.numeroDocumento}</p>
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
                                                    iconclass={iconDocumentoIdentidad}
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
                                                    iconclass={iconDocumentoIdentidad}
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
                                                    iconclass={iconDocumentoIdentidad}
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


        </section>
    );
}
