import React from "react";
import MobileSeeDetails from "./mobileSeeDetails.jsx";

export default function FiltrosMobile({
    filtrosSelected,
    add,
    remove,
    actividades,
    modalidades,
}) {
    let classFilterOption = "seleccion-filter-option font-weight-bold";

    const isSelectedOption = (filtro, valor) => {
        let isExist = filtrosSelected.some(
            (e) => e.filtro == filtro && e.valor == valor,
        );

        if (isExist) {
            return `${classFilterOption} filter-selected`;
        } else {
            return classFilterOption;
        }
    };

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
                        if (data.filtro != "page") {
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
                        <MobileSeeDetails
                            data={mod}
                            add={add}
                            isSelectedOption={isSelectedOption}
                            tipo={"modalidad"}
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
                            <MobileSeeDetails
                                data={act}
                                add={add}
                                isSelectedOption={isSelectedOption}
                                tipo={"actividad"}
                            />
                        );
                    }
                })}
            </div>
        </>
    );
}
