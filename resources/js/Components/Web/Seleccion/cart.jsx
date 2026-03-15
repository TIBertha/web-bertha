import React from "react";

export default function Cart({cart, removeCart}) {
    return(
        <div className="row mx-2">
            <div className="col-12 text-muted px-0">
                <div className="row mx-0">
                    <div className="text-start text-muted text-result col-12 col-md-4 d-flex align-items-center px-0 me-2 my-2">Postulantes seleccionados:</div>
                    {cart.map( (data, key) =>

                        <div key={key} className="card card-item-selected me-2 my-2">
                            <img src={data.foto} className="me-2 img-thumbnail rounded-circle card-trabajador-cart-foto" alt="trabajador"/>
                            <span className="card-trabajador-cart-nombre">{data.nombre}
                                <i className="fas fa-times icon-remove-item-cart-seleccion mx-2" onClick={() => removeCart(data.id) }></i>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
