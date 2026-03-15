import React from "react";
import { checkInCart } from "../../Functions/Seleccion.jsx";
import {
    getDisponibilidad,
    getTieneVacuna,
} from "../../Functions/TrabajadorCard.jsx";
import TooltipDisponibilidad from "./Components/tooltipDisponibilidad.jsx";

export default function TrabajadorCard({
    data,
    cart,
    addCart,
    removeCart,
    openVideoYoutube,
    openDrawer,
    extension,
    country,
}) {
    let classCard = "card card-seleccion shadow-sm m-2";
    let classCardSize = "col-6 col-sm-6 col-md-4 px-0";
    let isInCart = checkInCart(cart, data.id);
    let disponibilidad = data.disponibilidad;

    if (isInCart) {
        classCard =
            "card card-seleccion card-trabajador-selected shadow-sm m-2";
    }

    if (extension) {
        classCardSize = "";
    }

    let disponibilidadCSS = getDisponibilidad(disponibilidad);

    return (
        <div className={classCardSize}>
            <div className={classCard}>
                <div className="card-body text-center">
                    {isInCart && (
                        <div className="card-ribbon">
                            <span>Seleccionado</span>
                        </div>
                    )}

                    <img
                        src={data.foto}
                        className="mb-2 img-thumbnail rounded-circle card-seleccion-foto-trabajador"
                        alt="Foto de Trabajadora │ Bertha Experta en Casa"
                    />
                    <div className="card-seleccion-nombre-trabajador">
                        {data.nombre}{" "}
                        {data.videointroduccionyoutube && (
                            <i
                                className="fas fa-play-circle icon-play-card-seleccion ms-1"
                                onClick={() =>
                                    openVideoYoutube(
                                        data.videointroduccionyoutube,
                                    )
                                }
                            ></i>
                        )}
                    </div>
                    <div className="card-text card-seleccion-text">
                        {data.nacionalidad}
                    </div>
                    <div className="card-text card-seleccion-text">
                        {data.modalidades}
                    </div>
                    <div className="card-text card-seleccion-text">
                        {data.actividades}
                    </div>
                    <div className="card-text card-seleccion-text">
                        {data.direccion}
                    </div>
                    <div className="card-text card-seleccion-text">
                        {data.edad} años
                    </div>
                    <div className={disponibilidadCSS.class}>
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

                    <div className="row mx-0 justify-content-center">
                        <div className="col-12 col-md-auto">
                            <button
                                className="btn btn-sm btn-outline-purple font-weight-bold mt-3"
                                onClick={() =>
                                    openDrawer(data.token, data.usuario)
                                }
                            >
                                Ver Ficha
                            </button>
                        </div>

                        {!extension && (
                            <div className="col-12 col-md-auto">
                                <button
                                    className="btn btn-sm btn-outline-purple font-weight-bold mt-3"
                                    onClick={() =>
                                        isInCart
                                            ? removeCart(data.id)
                                            : addCart(data)
                                    }
                                >
                                    {isInCart
                                        ? "Quitar"
                                        : country == "cl"
                                          ? "Escoger"
                                          : "Entrevistar"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
