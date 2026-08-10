import React from "react";

export default function BotonCompartir({url, token, name, lang = 'es'}) {

    const textShareIntro = {
        es: `Hola! Te comparto la ficha de ${name}, para acceder, ingresa a:`,
        en: `Hi! I'm sharing the profile of ${name}, to access it, go to:`
    };

    const textTitleShare = {
        es: `Bertha | Ficha ${name}`,
        en: `Bertha | Profile ${name}`
    };

    let linkShare = `${url}/ficha-postulante/${token}`;
    let textShare = `${textShareIntro[lang]} ${linkShare}`;
    let titleShare = textTitleShare[lang];

    const handleOnClick = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: titleShare,
                    text: textShare,
                    url: linkShare,
                })
                .catch(error => {
                    console.error('Error sharing', error);
                });
        }
    };

    return (
        <a
            className="btn white-button align-middle"
            role="button"
            onClick={handleOnClick}
        >
            <i className="fas fa-share-alt"></i>
        </a>
    );
}
