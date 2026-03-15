import React from "react";

export default function ButtonPrevious({step, prev}) {
    if( step.current !== step.first){
        return (
            <button className="btn btn-anterior button-registro" type="button" onClick={ () => prev() }>
                <b>Anterior</b>
            </button>
        );
    }
    return null;
}
