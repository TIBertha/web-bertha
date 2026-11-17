import React, { useState } from 'react';

const cookieText = {
    es: {
        title: 'Personaliza tu experiencia',
        description1:
            'Utilizamos cookies para mejorar tu experiencia, recordar tu idioma y mostrarte información según el país desde el que nos visitas, ya que recibimos visitas de diferentes países.',
        description2:
            'Si lo prefieres, puedes deshabilitarlas desde la configuración de tu navegador y continuar navegando en nuestro sitio.',
        country: 'País',
        language: 'Idioma',
        accept: 'Aceptar y recordar',
        decline: 'Continuar sin guardar',
        saving: 'Guardando...',
    },
    en: {
        title: 'Make yourself at home',
        description1:
            'We use cookies to improve your experience, remember your language, and show you information relevant to the country you’re visiting from, as we welcome visitors from around the world.',
        description2:
            'If you prefer, you can disable cookies in your browser settings and continue browsing our website.',
        country: 'Country',
        language: 'Language',
        accept: 'Accept and remember',
        decline: 'Continue without saving',
        saving: 'Saving...',
    },
};

export default function CookiePreferences({
  show,
  country = 'pe',
  lang = 'es',
  countries = {},
  languages = {},
  onContinue,
  saving = false,
  error = '',
}) {
    const [selectedCountry, setSelectedCountry] = useState(country);
    const [selectedLang, setSelectedLang] = useState(lang);

    const text = cookieText[selectedLang] ?? cookieText.es;

    const continuar = (remember) => {
        onContinue({
            country: selectedCountry,
            lang: selectedLang,
            remember,
        });
    };

    if (!show) return null;

    return (
        <section
            className="cookie-preferences"
            role="region"
            aria-labelledby="cookie-preferences-title"
            aria-busy={saving}
        >
            <div className="container-fluid cookie-preferences-container">
                <div className="row align-items-center g-3">

                    <div className="col-12 col-xl-5">
                        <p
                            id="cookie-preferences-title"
                            className="cookie-preferences-title"
                        >
                            {text.title}
                        </p>

                        <p className="cookie-preferences-description">
                            {text.description1}
                        </p>

                        <p className="cookie-preferences-description mt-2">
                            {text.description2}
                        </p>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                        <div className="row g-2">

                            <div className="col-6">
                                <label
                                    htmlFor="preference-country"
                                    className="form-label"
                                >
                                    {text.country}
                                </label>

                                <select
                                    id="preference-country"
                                    className="form-select form-select-sm"
                                    value={selectedCountry}
                                    onChange={(e) =>
                                        setSelectedCountry(e.target.value)
                                    }
                                    disabled={saving}
                                >
                                    {Object.entries(countries).map(
                                        ([code, item]) => (
                                            <option key={code} value={code}>
                                                {item.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="col-6">
                                <label
                                    htmlFor="preference-language"
                                    className="form-label"
                                >
                                    {text.language}
                                </label>

                                <select
                                    id="preference-language"
                                    className="form-select form-select-sm"
                                    value={selectedLang}
                                    onChange={(e) =>
                                        setSelectedLang(e.target.value)
                                    }
                                    disabled={saving}
                                >
                                    {Object.entries(languages).map(
                                        ([code, name]) => (
                                            <option key={code} value={code}>
                                                {name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="cookie-preferences-actions">
                            <button
                                type="button"
                                className="btn cookie-preferences-accept"
                                onClick={() => continuar(true)}
                                disabled={saving}
                            >
                                {saving ? text.saving : text.accept}
                            </button>

                            <button
                                type="button"
                                className="btn cookie-preferences-decline"
                                onClick={() => continuar(false)}
                                disabled={saving}
                            >
                                {text.decline}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="col-12">
                            <p
                                className="cookie-preferences-error"
                                role="alert"
                            >
                                {error}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
