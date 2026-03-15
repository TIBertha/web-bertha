import React from "react";

export default function CampoFiltro({valorActividad, total, handleAdd, tipo, actividad, nameActividad, filtrosSelected, textDescription}) {
    let classFilterOption = 'seleccion-filter-option font-weight-bold';

    const isSelectedOption = (filtro, valor) => {
        const isExist = filtrosSelected.some(f =>
            f.filtro === filtro && f.valor === valor
        );

        return isExist
            ? `${classFilterOption} filter-selected`
            : classFilterOption;
    };


    return(
        <div>
            <div className={`${isSelectedOption(tipo, valorActividad) + (total ? '' : ' filtro-empty') }`} onClick={() => total ? handleAdd(tipo, valorActividad, actividad) : ''}>
                <i className={'fas fa-info-circle text-purple'} ></i> {nameActividad +' ' + (total ? ('(' + total + ')') : '')}
            </div>
            <div className={'info-hover-seleccion text-gray-2'}>
                {textDescription}
            </div>
        </div>
    )
}
