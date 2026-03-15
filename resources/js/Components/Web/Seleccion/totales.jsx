import React from "react";

export default function Totales({ total, cart, finalizar, country }) {
    return (
        <>
            <div className="row pb-3 mx-2">
                <div className="col-6 px-0">
                    <div className="text-start text-muted text-result">
                        {total ? total : 0} trabajadoras disponibles
                    </div>
                </div>

                <div className="col-6 px-0">
                    <div className="text-end text-muted text-result">
                        {"Entrevista hasta 2 trabajadoras"}
                        {cart.length > 0 ? (
                            <button
                                className="btn bertha-green-button btn-sm ms-3 font-weight-bold btn-finalizar-seleccion"
                                onClick={() => finalizar()}
                            >
                                Continuar
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
