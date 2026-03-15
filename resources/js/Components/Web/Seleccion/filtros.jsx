import React from "react";
import CampoFiltro from "./Components/campoFiltro.jsx";

export default function ({
    filtrosSelected,
    add,
    remove,
    actividades,
    modalidades,
}) {
    let isNotFiltroPage = filtrosSelected.some((e) => e.filtro !== "page");
    let cantidadFiltros = filtrosSelected.filter(
        (e) => e.filtro !== "page",
    ).length;

    return (
        <>
            <h5 className="d-none d-md-block">
                <i className="fas fa-sliders-h me-2"></i>Filtros{" "}
                {isNotFiltroPage ? (
                    <span className="ms-2 badge badge-secondary badge-pink-bertha">
                        {cantidadFiltros}
                    </span>
                ) : (
                    ""
                )}
            </h5>

            <hr className="d-none d-md-block" />

            {filtrosSelected.length > 0 && (
                <div className="text-start mx-2 mx-sm-3 mx-md-0">
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
                                            onClick={() => remove(data.filtro)}
                                        ></i>
                                    </button>
                                </span>
                            );
                        }
                    })}
                    {isNotFiltroPage && <hr />}
                </div>
            )}

            <div className="text-start mx-2 mx-sm-3 mx-md-0">
                <div className="seleccion-filter-title">Modalidad</div>
                {modalidades.map((mod, key) => {
                    return (
                        <CampoFiltro
                            valorActividad={mod.value}
                            total={mod.total}
                            handleAdd={add}
                            tipo={"modalidad"}
                            actividad={mod.name}
                            nameActividad={mod.name}
                            filtrosSelected={filtrosSelected}
                            textDescription={mod.tooltipContent}
                        />
                    );
                })}
            </div>

            <hr />

            <div className="text-start mx-2 mx-sm-3 mx-md-0">
                <div className="seleccion-filter-title">Actividad</div>

                {actividades.map((act, key) => {
                    if (act.total > 0) {
                        return (
                            <CampoFiltro
                                valorActividad={act.value}
                                total={act.total}
                                handleAdd={add}
                                tipo={"actividad"}
                                actividad={act.name}
                                nameActividad={act.name}
                                filtrosSelected={filtrosSelected}
                                textDescription={act.tooltipContent}
                            />
                        );
                    }
                })}
            </div>
        </>
    );
}
