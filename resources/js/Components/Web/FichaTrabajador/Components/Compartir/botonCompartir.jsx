import React from "react";

export default function BotonCompartir({url, token, name}) {
    let linkShare = url + '/ficha-postulante/' + token;
    let textoWhatsapp2 = 'Hola! Te comparto la ficha de '+ name +', para acceder, ingresa a:';
    let textShare = textoWhatsapp2 + ' '+ linkShare;
    let titleShare = 'Bertha | Ficha Melchora R.';
    const shareDetails = { linkShare, titleShare, textShare };

    const handleOnClick = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: titleShare,
                    text: textShare,
                    url: linkShare,
                })
                .then(() => {
                    console.log('Successfully shared');
                })
                .catch(error => {
                    console.error('Something went wrong sharing the blog', error);
                });
        }
    };
    return (
        <a className="btn white-button align-middle" role="button" onClick={handleOnClick}>
            <i className="fas fa-share-alt"></i>
        </a>
    );
}
