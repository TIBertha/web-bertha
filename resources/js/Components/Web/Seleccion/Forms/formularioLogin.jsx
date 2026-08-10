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
    lang = 'es'
}) {

    const textTitle = {
        es: "Ingresa tu número de celular",
        en: "Enter your mobile number"
    };

    const textSubtitle = {
        es: "Ahora más dinámico, menos procesos, misma calidad",
        en: "Now more dynamic, fewer steps, same quality"
    };

    const textPlaceholder = {
        es: "Ingresar celular",
        en: "Enter mobile number"
    };

    const textLogin = {
        es: "Iniciar sesión",
        en: "Log in"
    };

    const textNewHere = {
        es: "¿Eres nuevo?",
        en: "New here?"
    };

    const textRegister = {
        es: "Regístrate",
        en: "Sign up"
    };

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
                <h1 className="title-form">{textTitle[lang]}</h1>
                <p className={'pb-3'}>{textSubtitle[lang]}</p>

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
                            placeholder={textPlaceholder[lang]}
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
                        {textLogin[lang]}
                    </button>

                    <div className="text-center mt-4">
                        <div>
                            {textNewHere[lang]}{" "}
                            <a
                                className="link-tc"
                                onClick={() => changeVista()}
                            >
                                {textRegister[lang]}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
