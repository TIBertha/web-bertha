import React from "react";
import imgIniciarSesion from "../../../../../../public/img/new_version/bertha_fr_1_img.png";
import AlertError from "../Components/alertError.jsx";

import PhoneInput from "react-phone-input-2";
import esp from "react-phone-input-2/lang/es.json";

export default function FormularioLogin({
    url,
    country,
    isLoading,
    closeAlert,
    alertErrorCredenciales,
    alertErrorMensaje,
    celular,
    setCelular,
    password,
    setPassword,
    changeVista,
    handleLogin,
}) {
    return (
        <section className="login-form">
            <div className="text-center">
                <img
                    src={imgIniciarSesion}
                    className="b-login-img"
                    alt="Foto sesión │ holabertha.com"
                />
            </div>

            <div className="login-form-content mt-0">
                <h1 className="title-form">Ingresa tu número de celular</h1>
                <p className={'pb-3'}>Ahora más dinámico, menos procesos, misma calidad</p>

                {alertErrorCredenciales && (
                    <AlertError
                        typeError={"danger"}
                        mensaje={alertErrorMensaje}
                        closeAlert={closeAlert}
                    />
                )}

                <form
                    method="POST"
                    onSubmit={(e) => handleLogin(e)}
                    className="form"
                >
                    <div className="input-group mb-3">
                        <PhoneInput
                            localization={esp}
                            country={country}
                            value={
                                celular.indexOf(" ") >= 0
                                    ? celular.split(" ").join("")
                                    : celular
                            }
                            placeholder={"Ingresar celular"}
                            onChange={(e) => setCelular(e)}
                            preferredCountries={["pe", "us", "cl", "co", "ve"]}
                            inputClass="w-100 form-control no-box-shadow"
                            containerClass="input-countrycode"
                            enableLongNumbers={true}
                        />
                    </div>

                    <button
                        className="btn bertha-pink-button full-size"
                        type="submit"
                    >
                        {isLoading && (
                            <i className="fas fa-sync fa-spin me-2"></i>
                        )}
                        Iniciar sesión
                    </button>

                    <div className="text-center mt-4">
                        <div>
                            ¿Eres nuevo?{" "}
                            <a
                                className="link-tc"
                                onClick={() => changeVista()}
                            >
                                Regístrate
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
