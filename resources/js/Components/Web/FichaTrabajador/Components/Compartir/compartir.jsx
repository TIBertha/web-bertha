import React from "react";
import {isResponsive} from "../../../../Functions/General.jsx";
import ModalCompartir from "./modalCompartir.jsx";
import BotonCompartir from "./botonCompartir.jsx";

export default function Compartir({url, token, name}) {
    let responsive = isResponsive();

    return(
        <>{(responsive === true) ?
            <BotonCompartir url={url} token={token} name={name}/>
            :
            <ModalCompartir url={url} token={token} name={name}/>
        }</>
    )
}
