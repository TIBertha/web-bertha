import React, { useState, useEffect, useCallback } from "react";
import {showAlert} from "../../../Helpers/alerts.jsx";

import {ajaxGetDataFichaRestringida} from "../../../Functions/FichaTrabajador.jsx";
import UpperLabel from "../Components/upperLabel.jsx";

import LoadingScreen from "../../Components/loadingScreen.jsx";

import ColumnaExperienciaEstudios from "../Columns/columnaExperienciaEstudios.jsx";
import ColumnaDomicilioLegalSalud from "../Columns/columnaDomicilioLegalSalud.jsx";
import ColumnaInformacionBasica from "../Columns/columnaInformacionBasica.jsx";
import ColumnaFirmaCompromiso from "../Columns/columnaFirmaCompromiso.jsx";
import ColumnaEstudios from "../Columns/columnaEstudios.jsx";

export default function FichaRestringidaTrabajadorIndex({ url, token, isSeleccion = false, usuario, country, extension = false, cart = [], closeDrawer = () => {}, addCart = () => {}, removeCart = () => {}}) {

    const [state, setState] = useState({
        dataseleccion: [],
        disponibilidad: "",
        accessverif: true,
        name: "",
        nombreTrabajador: "",
        informacionBasica: "",
        identificacion: "",
        licencia: "",
        retrato: "",
        experiencia: "",
        listaudio: [],
        numExperiencia: "",
        estudio: "",
        nivelEducativo: "",
        numEstudio: "",
        actividad: "",
        modalidad: "",
        idioma: "",
        redesContacto: "",
        contactosEmergencia: "",
        domicilio: "",
        legal: "",
        salud: "",
        testPsicologico: "",
        isOpenModalVideo: false,
        video: "",
        videoAmazon: "",
        sueldopromedio: "",
        firma: "",
        isLoading: false
    });

    const {
        dataseleccion,
        disponibilidad,
        accessverif,
        name,
        nombreTrabajador,
        informacionBasica,
        identificacion,
        retrato,
        experiencia,
        listaudio,
        numExperiencia,
        estudio,
        nivelEducativo,
        numEstudio,
        actividad,
        modalidad,
        idioma,
        redesContacto,
        contactosEmergencia,
        domicilio,
        legal,
        salud,
        isOpenModalVideo,
        video,
        videoAmazon,
        sueldopromedio,
        firma,
        isLoading
    } = state;

    const openModalVideo = useCallback((video) => {
        setState((s) => ({ ...s, isOpenModalVideo: true, video }));
    }, []);

    const closeModalVideo = useCallback(() => {
        setState((s) => ({ ...s, isOpenModalVideo: false }));
    }, []);

    const getData = useCallback(() => {
        setState((s) => ({ ...s, isLoading: true }));

        ajaxGetDataFichaRestringida(token, accessverif, usuario).then((r) => {
            if (r.code === 200) {
                setState((s) => ({
                    ...s,
                    dataseleccion: r.dataseleccion,
                    name: r.name,
                    disponibilidad: r.disponibilidad,
                    nombreTrabajador: r.nombreTrabajador,
                    informacionBasica: r.informacionBasica,
                    identificacion: r.identificacion,
                    licencia: r.licencia,
                    retrato: r.retrato,
                    experiencia: r.experiencia,
                    listaudio: r.listaudio,
                    numExperiencia: r.numExperiencia,
                    estudio: r.estudio,
                    nivelEducativo: r.nivelEducativo,
                    numEstudio: r.numEstudio,
                    actividad: r.actividad,
                    modalidad: r.modalidad,
                    idioma: r.idioma,
                    redesContacto: r.redesContacto,
                    contactosEmergencia: r.contactosEmergencia,
                    domicilio: r.domicilio,
                    legal: r.legal,
                    salud: r.salud,
                    testPsicologico: r.testPsicologico,
                    video: r.video,
                    videoAmazon: r.video_amazon,
                    sueldopromedio: r.sueldo_promedio,
                    firma: r.firma,
                    isLoading: false
                }));
            } else {
                setState((s) => ({ ...s, isLoading: false }));
                showAlert("error", r.msj);
            }
        });
    }, [token, accessverif, usuario]);

    useEffect(() => {
        getData();
    }, [getData]);

    if (isLoading) return <LoadingScreen load={isLoading} height={'100vh'} />;

    const iconTelefono = "fas fa-phone-alt";
    const iconWhatsapp = "fab fa-whatsapp font-weight-bold";
    const iconDocumentoIdentidad = "fas fa-id-card icono";
    const iconFile = "fas fa-file-alt icono";
    const iconShield = "fas fa-shield-alt icono-shield";
    const defaultMessage = "Accederás a los datos una vez que hayas coordinado con la agencia";

    return (
        <section className="perfil-trabajador">

            <UpperLabel
                url={url}
                token={token}
                retrato={retrato}
                closeModalVideo={closeModalVideo}
                isOpenModalVideo={isOpenModalVideo}
                closeDrawer={closeDrawer}
                video={video}
                openModalVideo={openModalVideo}
                name={name}
                extension={extension}
                isSeleccion={isSeleccion}
            />

            <div className="row px-3 px-md-5 my-md-3 my-lg-0 pb-lg-4 justify-content-center mx-0 curriculum-area pb-5">

                <div className="col-12 col-md-8 col-lg-4 ret-a my-0 px-0 px-md-3">
                    <ColumnaInformacionBasica
                        country={country}
                        dataseleccion={dataseleccion}
                        openModalVideo={openModalVideo}
                        privado={false}
                        url={url}
                        retrato={retrato}
                        nombreTrabajador={nombreTrabajador}
                        video={video}
                        videoAmazon={videoAmazon}
                        actividad={actividad}
                        modalidad={modalidad}
                        informacionBasica={informacionBasica}
                        identificacion={identificacion}
                        idioma={idioma}
                        defaultMessageTelefono={defaultMessage}
                        defaultMessageWhatsapp={defaultMessage}
                        iconTelefono={iconTelefono}
                        iconWhatsapp={iconWhatsapp}
                        iconDocumentoIdentidad={iconDocumentoIdentidad}
                        isSeleccion={isSeleccion}
                        cart={cart}
                        addCart={addCart}
                        removeCart={removeCart}
                        closeDrawer={closeDrawer}
                        sueldopromedio={sueldopromedio}
                        disponibilidad={disponibilidad}
                    />
                </div>

                <div className="col-12 col-md-8 col-lg-4 ret-a my-0 pt-4 pt-lg-0 px-0 px-md-3">
                    <ColumnaDomicilioLegalSalud
                        country={country}
                        dataseleccion={dataseleccion}
                        privado={false}
                        url={url}
                        redesContacto={redesContacto}
                        contactosEmergencia={contactosEmergencia}
                        domicilio={domicilio}
                        salud={salud}
                        legal={legal}
                        iconFile={iconFile}
                    />
                </div>

                <div className="col-12 col-md-8 col-lg-4 ret-a my-0 pt-4 pt-lg-0 px-0 px-md-3">

                    {numExperiencia > 0 && (
                        <ColumnaExperienciaEstudios
                            dataseleccion={dataseleccion}
                            privado={false}
                            url={url}
                            accessverif={accessverif}
                            numExperiencia={numExperiencia}
                            experiencia={experiencia}
                            listaudio={listaudio}
                            iconShield={iconShield}
                            iconFile={iconFile}
                        />
                    )}

                    <ColumnaEstudios
                        dataseleccion={dataseleccion}
                        margin={numExperiencia > 0 ? "mt-3" : "mt-0"}
                        privado={false}
                        url={url}
                        numEstudio={numEstudio}
                        estudio={estudio}
                        iconFile={iconFile}
                        nivelEducativo={nivelEducativo}
                    />

                    {firma && <ColumnaFirmaCompromiso firmaImg={firma} />}
                </div>

            </div>
        </section>
    );
}
