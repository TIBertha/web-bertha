import React from 'react';
import AlertError from "../Components/alertError.jsx";
import PhoneInput from "react-phone-input-2";
import esp from 'react-phone-input-2/lang/es.json';

export default function FormularioRegistro({
   url,
   country,
   isLoading,
   closeAlert,
   alertErrorCredenciales,
   alertErrorMensaje,
   typeError,
   politica,
   setPolitica,
   nombres,
   setNombres,
   apellidos,
   setApellidos,
   celular,
   setCelular,
   correo,
   setCorreo,
   password,
   setPassword,
   handleRegister,
   changeVista,
   lang = 'es'
}) {

    const textTitle = {
        es: "Crea tu cuenta con tu celular",
        en: "Create your account using your mobile number"
    };

    const textNames = {
        es: "Nombres completos",
        en: "Full first name"
    };

    const textLastNames = {
        es: "Apellidos completos",
        en: "Full last name"
    };

    const textPhonePlaceholder = {
        es: "Ingresar celular",
        en: "Enter mobile number"
    };

    const textPrivacy = {
        es: "Acepto las",
        en: "I accept the"
    };

    const textPrivacyLink = {
        es: "Políticas de privacidad.",
        en: "Privacy Policy."
    };

    const textCreateAccount = {
        es: "Crear mi cuenta",
        en: "Create my account"
    };

    const textHaveAccount = {
        es: "¿Tienes cuenta?",
        en: "Already have an account?"
    };

    const textLogin = {
        es: "Inicia Sesión",
        en: "Log in"
    };

    let urlPolitica = url + '/privacidad';

    return(
        <section className="login-form">

            <div className="login-form-content">

                <h1 className="title-form">{textTitle[lang]}</h1>

                {alertErrorCredenciales &&
                    <AlertError
                        typeError={typeError}
                        mensaje={alertErrorMensaje}
                        closeAlert={closeAlert}
                    />
                }

                <form method="POST" onSubmit={(e) => handleRegister(e)} className="form">

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="nombres"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value.toUpperCase())}
                            placeholder={textNames[lang]}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="apellidos"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value.toUpperCase())}
                            placeholder={textLastNames[lang]}
                        />
                    </div>

                    <div className="form-group">
                        <PhoneInput
                            localization={esp}
                            country={country}
                            value={celular.indexOf(' ') >= 0 ? celular.split(" ").join("") : celular}
                            placeholder={textPhonePlaceholder[lang]}
                            onChange={(e) => setCelular(e)}
                            preferredCountries={['pe', 'us', 'cl', 'co', 've']}
                            inputClass='w-100 form-control no-box-shadow'
                            containerClass='input-countrycode'
                            enableLongNumbers={true}
                        />
                    </div>

                    <div className="form__options mt-4">
                        <input
                            type="checkbox"
                            name="politica"
                            id="politica"
                            checked={politica}
                            onChange={() => setPolitica(!politica)}
                        />
                        <label htmlFor="remember" className='ms-2'>
                            {textPrivacy[lang]}
                            <a href={urlPolitica} target="_blank" className='mx-1'>
                                {textPrivacyLink[lang]}
                            </a>
                        </label>
                    </div>

                    <button className="btn bertha-pink-button full-size" type="submit">
                        {isLoading && <i className="fas fa-sync fa-spin me-2"></i>}
                        {textCreateAccount[lang]}
                    </button>

                    <div className="text-center mt-4">
                        <div>
                            {textHaveAccount[lang]}{" "}
                            <a className="link-tc" onClick={() => changeVista()}>
                                {textLogin[lang]}
                            </a>
                        </div>
                    </div>

                </form>

            </div>

        </section>
    );
}
