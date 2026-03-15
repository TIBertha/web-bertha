import React, {useEffect, useState} from 'react';
import {showAlert} from "../../Helpers/alerts.jsx";
import {
    ajaxContinuarCartSeleccion,
    ajaxDeleteCartSeleccion,
    ajaxGetCartSeleccion
} from "../../Functions/Seleccion.jsx";
import LoadingScreen from "../Components/loadingScreen.jsx";

export default function SeleccionConfirmar({url}) {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [cart, setCart] = useState([]);
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    let urlSeleccion = url + '/es-' + country + '/seleccionar';

    const deleteCart = () => {
        ajaxDeleteCartSeleccion().then(result => {
            if(result.code === 200){
                window.location.href = urlSeleccion;
            }else if(result.code === 500){
                window.location.href = urlSeleccion;
            }
        });
    }

    const modificarCart = () => {
        window.location.href = urlSeleccion;
    }

    const continuar = () => {

        setIsLoading(true);

        ajaxContinuarCartSeleccion(country).then(result => {
            setIsLoading(false);
            if(result.code === 200){
                window.location.href = url + '/requerimiento/' + result.token;
            }else if(result.code === 500){
                showAlert('error', result.msj);
            }
        });

    }

    useEffect(() => {
        ajaxGetCartSeleccion().then(r => {
            setLoading(false);
            setNombreUsuario(r.nombreusuario);
            setCart(r.cart);
            setCountry(r.country)
        });
    }, []);

    return (
        <section className="confirmar-requerimiento-form">
            {loading ?
                <div className="d-flex align-items-center align-self-centeralign-self-center">
                    <LoadingScreen load={loading} />
                </div>
                :
                <div className="confirmar-requerimiento-form-content">
                    <div>
                        <h5 className="confirmar-requerimiento-hello mt-4">{nombreUsuario}</h5>
                        <p className="mb-5">Has seleccionado a las siguientes trabajadoras:</p>

                        {cart.map((data, key) =>
                            <div key={key} className="row mx-0 mb-4">
                                <div className={'col-auto px-1'}>
                                    <img src={data.foto} className="img-thumbnail rounded-circle img-pedido-trabajador me-3" />
                                </div>
                                <div className={'col-auto px-1'}>
                                    <div className="media-body">
                                        <h5 className="mt-0 modal-ficha-title">{data.nombre}</h5>
                                        <p className="modal-ficha-text">{data.modalidad}</p>
                                        <p className="modal-ficha-text">{data.actividad}</p>
                                        <p className="modal-ficha-text">{data.edad} años</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <p className="mb-3 mt-5">Para continuar, cuéntanos tu requerimiento, asi sabrás si la trabajadora que escogiste acepta tu oferta laboral. Si no la acepta, nosotros buscaremos su reemplazo.</p>


                        <hr className="divider-pink" />

                        <div className="row">
                            <div className="col-12 col-md-4">
                                <button className="btn btn-outline-pink full-size mb-3" type="button" onClick={ () => deleteCart() } disabled={isLoading ? true : false}>
                                    Descartar
                                </button>
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-outline-pink full-size mb-3" type="button" onClick={ () => modificarCart() } disabled={isLoading ? true : false}>
                                    Modificar
                                </button>
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn bertha-green-button full-size" type="button" onClick={ () => continuar() } disabled={isLoading ? true : false}>
                                    { isLoading && <i className="fas fa-sync fa-spin me-2"></i>}
                                    Continuar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </section>
    )
}
