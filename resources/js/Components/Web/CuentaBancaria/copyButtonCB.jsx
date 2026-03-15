import React, {useState} from "react";

export default function CopyButtonCB({titulo, cuenta, bold}) {
    const [textoBotonCopiar, setTextoBtnCopiar] = useState('Copiar');

    function copyText(e) {
        navigator.clipboard.writeText(copyText);
        setTextoBtnCopiar('Copiado');

        setTimeout(function () {
            setTextoBtnCopiar('Copiar');
        }, 1000);
    }

    return(
        <>
            <span className='me-2'>
                <span className={Boolean(bold) ? 'font-weight-bold' : ''}>{titulo}</span>
                {': ' + cuenta}
            </span>
            <span onClick={(e) => copyText(e)} className="link-copiar-cuenta">{textoBotonCopiar}</span>
        </>
    )
}

