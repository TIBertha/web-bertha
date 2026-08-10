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
    country = 54,
    domicilio,
    salud,
    legal,
    redesContacto,
    iconFile,
    idioma,
    lang = 'es',
}) {

    const colText = {
        es: {
            sec1: 'Idiomas',
            sec2: 'Contacto',
            phoneTitle1: 'Teléfono / WhatsApp',
            phoneTitle2: 'Teléfono',
            phoneTitle3: 'WhatsApp',
            sec3: 'Domicilio',
            locationTitle: 'Ubicación:',
            addresTitle: 'Dirección exacta y referencia:',
            djTitle: 'Declaración Jurada de Domicilio',
            antTitle: 'Antecedentes',
            polTitle: 'Policiales: ',
            judTitle: 'Judiciales: ',
            penTitle: 'Penales: ',
            sec4: 'Salud',
            djSadTitle: 'Declaración Jurada de Gozar Buena Salud',
            sad1: 'Buena salud física',
            sad1Tooltip: 'Declara que sí goza de buena salud física',
            Y: 'Sí',
            N: 'No',
            sad2: 'Buena salud mental',
            sad2Tooltip: 'Declara que sí goza de buena salud mental',
        },

        en: {
            sec1: 'Languages',
            sec2: 'Contact',
            phoneTitle1: 'Phone / WhatsApp',
            phoneTitle2: 'Phone',
            phoneTitle3: 'WhatsApp',
            sec3: 'Address',
            locationTitle: 'Location:',
            addresTitle: 'Exact address and reference:',
            djTitle: 'Affidavit of Residence',
            antTitle: 'Background Checks',
            polTitle: 'Police background: ',
            judTitle: 'Judicial background: ',
            penTitle: 'Criminal background: ',
            sec4: 'Health',
            djSadTitle: 'Affidavit of Good Health',
            sad1: 'Good physical health',
            sad1Tooltip: 'Declares that she is in good physical health',
            Y: 'Yes',
            N: 'No',
            sad2: 'Good mental health',
            sad2Tooltip: 'Declares that she is in good mental health',
        }
    };

    return (
        <section className="map p-3">

            {idioma.length > 0 && (
                <>
                    <div className="py-3">
                        <p className="titulo-seccions m-0">{colText[lang].sec1}</p>
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

                    <hr />
                </>
            )}

            <div className="py-3">
                <p className="titulo-seccions m-0">{colText[lang].sec2}</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10">
                        <div className="mb-2 redes-contacto iconos-contacto">
                            {redesContacto.telefono &&
                            redesContacto.whatsapp &&
                            redesContacto.telefono ===
                                redesContacto.whatsapp ? (
                                <InputTelefono
                                    labelTitle={colText[lang].phoneTitle1}
                                    codedPhone={redesContacto.formatTel}
                                    phone={redesContacto.telefono}
                                />
                            ) : (
                                <>
                                    {redesContacto.telefono && (
                                        <InputTelefono
                                            labelTitle={colText[lang].phoneTitle2}
                                            codedPhone={redesContacto.formatTel}
                                            phone={redesContacto.telefono}
                                        />
                                    )}

                                    {redesContacto.whatsapp && (
                                        <InputTelefono
                                            labelTitle={colText[lang].phoneTitle3}
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
                <p className="titulo-seccions m-0">{colText[lang].sec3}</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 px-0 pb-3">
                        <div className="row mx-0">
                            <div className="col-12 my-auto">
                                <p>{colText[lang].locationTitle + ' ' + domicilio.ubicacion}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-10 px-0 pb-3">
                        <div className="row mx-0">
                            <div className="col-12 my-auto">
                                <span>
                                    {colText[lang].addresTitle}
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
                                    <p>{colText[lang].djTitle}</p>
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
                </div>
            </div>

            <hr />

            <div className="py-3">
                <p className="titulo-seccions m-0">{colText[lang].antTitle}</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 px-0">
                        <div className="row mx-0">
                            {Number(country) === 54 && (
                                <>
                                    <div className="col-10 my-auto">
                                        <p>
                                            {colText[lang].polTitle}
                                            <span className="d-inline-block">
                                                {legal.antecedetesPoliciales
                                                    ? legal.antecedetesPoliciales
                                                    : "-"}
                                            </span>
                                        </p>
                                        <p>
                                            {colText[lang].judTitle}
                                            <span className="d-inline-block">
                                                {legal.antecedetesJudiciales
                                                    ? legal.antecedetesJudiciales
                                                    : "-"}
                                            </span>
                                        </p>
                                        <p>
                                            {colText[lang].penTitle}
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

            {/*
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
            */}

            <div className="py-3">
                <p className="titulo-seccions m-0">{colText[lang].sec4}</p>
                <div className="row mx-0 justify-content-end detalles mt-2">
                    <div className="col-12 col-xl-10 p-0">
                        <div className="row mx-0">
                            <div className="col-10 my-auto">
                                <p>{colText[lang].djSadTitle}</p>
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
                                    <span className="pe-2">1.-</span>{colText[lang].sad1}
                                </p>
                                <div className="row mx-0">
                                    <div className="col-2 text-end">
                                        <p>{colText[lang].Y}</p>
                                    </div>
                                    <div className="col-8 my-auto">
                                        <SwitchTooltip
                                            text={parse(
                                                colText[lang].sad1Tooltip,
                                            )}
                                            switch={"L"}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                            icon={"fas fa-file-alt"}
                                            additionalIconClass={"icono"}
                                        />
                                    </div>
                                    <div className="col-2 text-start">
                                        <p>{colText[lang].N}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 px-0 constructos">
                                <p>
                                    <span className="pe-2">2.-</span>{colText[lang].sad2}
                                </p>
                                <div className="row mx-0">
                                    <div className="col-2 text-end">
                                        <p>{colText[lang].Y}</p>
                                    </div>
                                    <div className="col-8 my-auto">
                                        <SwitchTooltip
                                            text={parse(
                                                colText[lang].sad2Tooltip,
                                            )}
                                            switch={"L"}
                                            estilo={"tooltip-perfil"}
                                            placement={"bottom"}
                                            icon={"fas fa-file-alt"}
                                            additionalIconClass={"icono"}
                                        />
                                    </div>
                                    <div className="col-2 text-start">
                                        <p>{colText[lang].N}</p>
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
