import React from "react";

export default function MobileSeeDetails({data, tipo, isSelectedOption, add}) {
    return(
        <section className={'row mx-0 pb-1'}>
            <div className="col-auto" >
                <i className={'fas fa-info-circle icon-purple'}></i>
            </div>

            <div className="col">
                <span className={`${isSelectedOption(tipo, data.value) + (data.total ? '' : ' filtro-empty') }` } onClick={() => data.total ? add(tipo, data.value, data.name) : ''}>
                    {(data.name) + (data.total ? ('(' + data.total + ')') : '')}
                </span>
            </div>

            <div className="col-12 text-gray-2">
                {data.tooltipContent}
            </div>

        </section>
    )
}
