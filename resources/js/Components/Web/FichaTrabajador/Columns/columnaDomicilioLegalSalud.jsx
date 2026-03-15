import React from "react";
import parse from "html-react-parser";

import DeclaracionDomicilio from "../../../../../../public/img/ficha/declaracion-domicilio.jpg";

import { getTieneDosisVacuna } from "../../../Functions/FichaTrabajador.jsx";

import InputTelefono from "../Components/inputTelefono.jsx";
import Tooltips from "../../Components/tooltips.jsx";
import SwitchTooltip from "../../Components/switchTooltip.jsx";

import DeclaracionJuradaSalud from "../../../../../../public/img/ficha/declaracion-salud.jpg";
import ReciboServicio from "../../../../../../public/img/ficha/recibo-servicio.png";
import Antecedentes from "../../../../../../public/img/ficha/reporte-antecedentes.jpg";
import AntecedentesCl from "../../../../../../public/img/ficha/reporte-antecedentes-cl.jpg";

export default function ColumnaDomicilioLegalSalud({
    url,
    country = 54,
    domicilio,
    salud,
    legal,
    redesContacto,
    iconFile,
    dataseleccion,
    privado,
    contactosEmergencia,
}) {
    let tieneVacuna = getTieneDosisVacuna(parseInt(salud.tieneVacuna));

    return (
        <section className="map p-3">
            <div className="py-3">
                <p className="titulo-seccions m-0">Contacto</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10">
                        <div className="mb-2 redes-contacto iconos-contacto">
                            {redesContacto.telefono &&
                            redesContacto.whatsapp &&
                            redesContacto.telefono ===
                                redesContacto.whatsapp ? (
                                <InputTelefono
                                    labelTitle="Teléfono / WhatsApp"
                                    codedPhone={redesContacto.formatTel}
                                    phone={redesContacto.telefono}
                                />
                            ) : (
                                <>
                                    {redesContacto.telefono && (
                                        <InputTelefono
                                            labelTitle="Teléfono"
                                            codedPhone={redesContacto.formatTel}
                                            phone={redesContacto.telefono}
                                        />
                                    )}

                                    {redesContacto.whatsapp && (
                                        <InputTelefono
                                            labelTitle="WhatsApp"
                                            codedPhone={redesContacto.formatWA}
                                            phone={redesContacto.whatsapp}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">Domicilio</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 px-0 pb-3">
                        <div className="row mx-0">
                            <div className="col-12 my-auto">
                                <p>Ubicación: {domicilio.ubicacion}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-10 px-0 pb-3">
                        <div className="row mx-0">
                            <div className="col-12 my-auto">
                                <span>
                                    Dirección exacta y referencia:
                                    <div className="row mx-0">
                                        <div className="col-auto px-0">
                                            <p className="text-brake text-brake-2">
                                                {domicilio.direccion}
                                            </p>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>

                    {domicilio.declaracionJurada && (
                        <div className="col-12 col-xl-10 px-0 pb-3">
                            <div className="row mx-0">
                                <div className="col-10 my-auto">
                                    <p>Declaración Jurada de Domicilio</p>
                                </div>
                                <div className="col-2 my-auto">
                                    <Tooltips
                                        text={parse(
                                            '<img class="icon-documento-identidad" src="' +
                                                DeclaracionDomicilio +
                                                '"/>',
                                        )}
                                        iconclass={iconFile}
                                        estilo={"tooltip-perfil"}
                                        placement={"bottom"}
                                        icon={"fas fa-file-alt"}
                                        additionalIconClass={"icono"}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {domicilio.recibo && (
                        <div className="col-12 col-xl-10 px-0">
                            <div className="row mx-0">
                                <div className="col-10 my-auto">
                                    <p>Recibo Agua o Luz</p>
                                </div>
                                <div className="col-2 my-auto">
                                    <Tooltips
                                        text={parse(
                                            '<img class="icon-documento-identidad" src="' +
                                                ReciboServicio +
                                                '"/>',
                                        )}
                                        iconclass={iconFile}
                                        estilo={"tooltip-perfil"}
                                        placement={"bottom"}
                                        icon={"fas fa-file-alt"}
                                        additionalIconClass={"icono"}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">Antecedentes</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 px-0">
                        <div className="row mx-0">
                            {Number(country) === 11 && (
                                <>
                                    <div className="col-10 my-auto">
                                        <p>
                                            Registro Nacional de Condenas:{" "}
                                            <span className="d-inline-block">
                                                {"SIN ANTECEDENTES"}
                                            </span>
                                        </p>
                                        <p>
                                            Registro Especial de Condenas por
                                            Actos de Violencia Intrafamiliar:{" "}
                                            <span className="d-inline-block">
                                                {"SIN ANOTACIONES"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-2 my-auto">
                                        <Tooltips
                                            text={parse(
                                                '<img class="icon-documento-identidad" src="' +
                                                    AntecedentesCl +
                                                    '"/>',
                                            )}
                                            iconclass={iconFile}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                            icon={"fas fa-file-alt"}
                                            additionalIconClass={"icono"}
                                        />
                                    </div>
                                </>
                            )}
                            {Number(country) === 49 && (
                                <>
                                    <div className="col-10 my-auto">
                                        <p>
                                            Constancia de Antecedentes Penales
                                            Federales:{" "}
                                            <span className="d-inline-block">
                                                {"SIN ANTECEDENTES"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-2 my-auto">
                                        <Tooltips
                                            text={parse(
                                                '<img class="icon-documento-identidad" src="' +
                                                    AntecedentesCl +
                                                    '"/>',
                                            )}
                                            iconclass={iconFile}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                            icon={"fas fa-file-alt"}
                                            additionalIconClass={"icono"}
                                        />
                                    </div>
                                </>
                            )}
                            {Number(country) === 54 && (
                                <>
                                    <div className="col-10 my-auto">
                                        <p>
                                            Policiales:{" "}
                                            <span className="d-inline-block">
                                                {legal.antecedetesPoliciales
                                                    ? legal.antecedetesPoliciales
                                                    : "-"}
                                            </span>
                                        </p>
                                        <p>
                                            Judiciales:{" "}
                                            <span className="d-inline-block">
                                                {legal.antecedetesJudiciales
                                                    ? legal.antecedetesJudiciales
                                                    : "-"}
                                            </span>
                                        </p>
                                        <p>
                                            Penales:{" "}
                                            <span className="d-inline-block">
                                                {legal.antecedetesPenales
                                                    ? legal.antecedetesPenales
                                                    : "-"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-2 my-auto">
                                        {legal.antecedetesPoliciales &&
                                            legal.antecedetesJudiciales &&
                                            legal.antecedetesPenales && (
                                                <Tooltips
                                                    text={parse(
                                                        '<img class="icon-documento-identidad" src="' +
                                                            Antecedentes +
                                                            '"/>',
                                                    )}
                                                    iconclass={iconFile}
                                                    estilo={"tooltip-perfil"}
                                                    placement={"bottom"}
                                                    icon={"fas fa-file-alt"}
                                                    additionalIconClass={
                                                        "icono"
                                                    }
                                                />
                                            )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">Vacuna COVID</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 px-0 pb-3">
                        <div className="row mx-0">
                            <div className="col-10 my-auto">
                                {tieneVacuna.primeraDosis}
                                {tieneVacuna.segundaDosis}
                                {tieneVacuna.terceraDosis}
                                {tieneVacuna.cuartaDosis}
                            </div>
                            <div className="col-2 my-auto">
                                {salud.tieneVacuna &&
                                    Number(salud.tieneVacuna) !== 0 &&
                                    salud.adjuntoCartillaVacuna && (
                                        <>
                                            {
                                                <Tooltips
                                                    text={parse(
                                                        '<img class="icon-documento-identidad" src="' +
                                                            salud.adjuntoCartillaVacuna +
                                                            '"/>',
                                                    )}
                                                    iconclass={
                                                        iconFile + " my-1"
                                                    }
                                                    estilo={"tooltip-perfil"}
                                                    placement={"bottom"}
                                                    icon={"fas fa-file-alt"}
                                                    additionalIconClass={
                                                        "icono"
                                                    }
                                                />
                                            }
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">Salud</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 p-0">
                        <div className="row mx-0">
                            <div className="col-10 my-auto">
                                <p>Declaración Jurada de Gozar Buena Salud</p>
                            </div>
                            <div className="col-2 my-auto">
                                <Tooltips
                                    text={parse(
                                        '<img class="icon-documento-identidad" src="' +
                                            DeclaracionJuradaSalud +
                                            '"/>',
                                    )}
                                    iconclass={iconFile}
                                    estilo={"tooltip-perfil"}
                                    placement={"bottom"}
                                    icon={"fas fa-file-alt"}
                                    additionalIconClass={"icono"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-10 py-4 evaluacion-psicologica">
                        <div className="row mx-0">
                            <div className="col-12 px-0 constructos">
                                <p>
                                    <span className="pe-2">1.-</span>Buena salud
                                    física
                                </p>
                                <div className="row mx-0">
                                    <div className="col-2 text-end">
                                        <p>Sí</p>
                                    </div>
                                    <div className="col-8 my-auto">
                                        <SwitchTooltip
                                            text={parse(
                                                "Declara que sí goza de buena salud física",
                                            )}
                                            switch={"L"}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                            icon={"fas fa-file-alt"}
                                            additionalIconClass={"icono"}
                                        />
                                    </div>
                                    <div className="col-2 text-start">
                                        <p>No</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 px-0 constructos">
                                <p>
                                    <span className="pe-2">2.-</span>Buena salud
                                    mental
                                </p>
                                <div className="row mx-0">
                                    <div className="col-2 text-end">
                                        <p>Sí</p>
                                    </div>
                                    <div className="col-8 my-auto">
                                        <SwitchTooltip
                                            text={parse(
                                                "Declara que sí goza de buena salud mental",
                                            )}
                                            switch={"L"}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                            icon={"fas fa-file-alt"}
                                            additionalIconClass={"icono"}
                                        />
                                    </div>
                                    <div className="col-2 text-start">
                                        <p>No</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
