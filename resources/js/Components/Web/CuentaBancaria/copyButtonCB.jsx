import React, {useState} from "react";

const copyTextBtn = {
    es: {
        copy: "Copiar",
        copied: "Copiado",
    },
    en: {
        copy: "Copy",
        copied: "Copied",
    }
};

export default function CopyButtonCB({titulo, cuenta, bold, lang = 'es'}) {

    const t = copyTextBtn[lang]; // ← textos multilanguage

    const [textoBotonCopiar, setTextoBtnCopiar] = useState(t.copy);

    function copyText(e) {
        navigator.clipboard.writeText(cuenta); // ← corregido

        setTextoBtnCopiar(t.copied);

        setTimeout(function () {
            setTextoBtnCopiar(t.copy);
        }, 1000);
    }

    return(
        <>
            <span className='me-2'>
                <span className={Boolean(bold) ? 'font-weight-bold' : ''}>{titulo}</span>
                {': ' + cuenta}
            </span>

            <span onClick={copyText} className="link-copiar-cuenta">
                {textoBotonCopiar}
            </span>
        </>
    )
}

