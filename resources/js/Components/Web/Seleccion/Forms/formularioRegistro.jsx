import React from 'react';
import AlertError from "../Components/alertError.jsx";

import PhoneInput from "react-phone-input-2";
import esp from 'react-phone-input-2/lang/es.json';

export default function FormularioRegistro({url, country, isLoading, closeAlert, alertErrorCredenciales, alertErrorMensaje, typeError, politica, setPolitica, nombres, setNombres, apellidos, setApellidos, celular, setCelular, correo, setCorreo, password, setPassword, handleRegister, changeVista}){
    let urlPolitica = url + '/privacidad';

    return(
        <section className="login-form">

            <div className="login-form-content">

                <h1 className="title-form">Crea tu cuenta con tu celular</h1>

                {alertErrorCredenciales &&
                    <AlertError typeError={typeError} mensaje={alertErrorMensaje} closeAlert={closeAlert} />
                }

                <form method="POST" onSubmit={ (e) => handleRegister(e)} className="form">

                    <div className="form-group">
                        <input type="text" className="form-control" name="nombres" value={nombres} onChange={(e) => setNombres(e.target.value.toUpperCase()) } placeholder="Nombres completos" />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" name="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value.toUpperCase()) } placeholder="Apellidos completos" />
                    </div>

                    <div className="form-group">

                        <PhoneInput
                            localization={esp}
                            country={country}
                            value={celular.indexOf(' ') >= 0 ? celular.split(" ").join("") : celular}
                            placeholder={'Ingresar celular'}
                            onChange={(e) => setCelular(e)}
                            preferredCountries={['pe', 'us', 'cl', 'co', 've']}
                            inputClass='w-100 form-control no-box-shadow'
                            containerClass='input-countrycode'
                            enableLongNumbers={true}
                        />
                    </div>

                    <div className="form__options mt-4">
                        <input type="checkbox" name="politica" id="politica" checked={politica} onChange={(e) => setPolitica(!politica)} />
                        <label htmlFor="remember" className='ms-2'>Acepto las<a href={urlPolitica} target="_blank" className='mx-1'>Políticas de privacidad.</a></label>
                    </div>

                    <button className="btn bertha-pink-button full-size" type="submit">
                        { isLoading && <i className="fas fa-sync fa-spin me-2"></i>}
                        Crear mi cuenta
                    </button>

                    <div className="text-center mt-4">
                        <div>¿Tienes cuenta? <a className="link-tc" onClick={() => changeVista()}>Inicia Sesión</a></div>
                    </div>

                </form>

            </div>

        </section>
    )
}
