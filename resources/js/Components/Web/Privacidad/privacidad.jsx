import React from "react";
import PrPeruES from "./prPeruES.jsx";
import PrPeruEN from "./prPeruEN.jsx";

export default function Privacidad({url, lang = 'es'}) {
    return(
        <>
            {lang === 'es' ?
                <PrPeruES />
                :
                <PrPeruEN />
            }
        </>
    )
}
