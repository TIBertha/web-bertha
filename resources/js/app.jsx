import "./bootstrap.js";
import React from "react";
import ReactDOM from "react-dom/client";
import 'aos/dist/aos.css';
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import 'rc-drawer/assets/index.css';
import "bootstrap";

/*Due the use of Laravel 12 and ReactJSX with vite, this is the new nomenclature*/

/*---header.jsx---*/
import HeaderJSX from "./Components/Web/Layouts/header.jsx";
const headerJSX = document.getElementById("header");
if (headerJSX) {
    const { url, path} = headerJSX.dataset;
    ReactDOM.createRoot(headerJSX).render(
        <HeaderJSX
            url={url}
            path={path}
        />,
    );
}


/*---footer.jsx---*/
import FooterJSX from "./Components/Web/Layouts/footer.jsx";
const footerJSX = document.getElementById("footer");
if (footerJSX) {
    const { url } = footerJSX.dataset;
    ReactDOM.createRoot(footerJSX).render(
        <FooterJSX
            url={url}
        />,
    );
}

/*---index.jsx---*/
import IndexJSX from "./Components/Web/Home/index.jsx";
const indexJSX = document.getElementById("index");
if (indexJSX) {
    const { url, num, country} = indexJSX.dataset;
    ReactDOM.createRoot(indexJSX).render(
        <IndexJSX
            url={url}
            num={num}
            country={country}
        />,
    );
}

/*---contactLabel.jsx---*/
import ContactLabelJSX from "./Components/Web/Layouts/contactLabel.jsx";
const contactLabelJSX = document.getElementById("contact-label");
if (contactLabelJSX) {
    const { url, path} = contactLabelJSX.dataset;
    ReactDOM.createRoot(contactLabelJSX).render(
        <ContactLabelJSX
            url={url}
            path={path}
        />,
    );
}

/*---terminosCondiciones.jsx---*/
import TerminosCondicionesJSX from "./Components/Web/TerminosCondiciones/terminosCondiciones.jsx";
const terminosCondicionesJSX = document.getElementById("terminos-condiciones");
if (terminosCondicionesJSX) {
    const { url, country} = terminosCondicionesJSX.dataset;
    ReactDOM.createRoot(terminosCondicionesJSX).render(
        <TerminosCondicionesJSX
            url={url}
            country={country}
        />,
    );
}

/*---privacidad.jsx---*/
import PrivacidadJSX from "./Components/Web/privacidad.jsx";
const privacidadJSX = document.getElementById("privacidad");
if (privacidadJSX) {
    const { url} = privacidadJSX.dataset;
    ReactDOM.createRoot(privacidadJSX).render(
        <PrivacidadJSX
            url={url}
        />,
    );
}

/*---libroReclamos.jsx---*/
import LibroReclamosJSX from "./Components/Web/LibroReclamos/libroReclamos.jsx";
const libroReclamosJSX = document.getElementById("libro-reclamos");
if (libroReclamosJSX) {
    const props = Object.assign({}, libroReclamosJSX.dataset);
    ReactDOM.createRoot(libroReclamosJSX).render(
        <LibroReclamosJSX {...props} />,
        libroReclamosJSX,
    );
}

/*---cuentaBancaria.jsx---*/
import CuentaBancariaJSX from "./Components/Web/CuentaBancaria/cuentaBancaria.jsx";
const cuentaBancariaJSX = document.getElementById("cuenta-bancaria");
if (cuentaBancariaJSX) {
    const url = cuentaBancariaJSX.dataset.url;
    ReactDOM.createRoot(cuentaBancariaJSX).render(
        <CuentaBancariaJSX
            url={url}
        />,
    );
}

/*---seleccion.jsx---*/
import SeleccionJSX from "./Components/Web/Seleccion/seleccion.jsx";
const seleccionJSX = document.getElementById("seleccion");
if (seleccionJSX) {
    const { url, country, session } = seleccionJSX.dataset;
    ReactDOM.createRoot(seleccionJSX).render(
        <SeleccionJSX
            url={url}
            country={country}
            session={session}
        />,
    );
}

/*---seleccionConfirmar.jsx---*/
import SeleccionConfirmarJSX from "./Components/Web/SeleccionConfirmar/seleccionConfirmar.jsx";
const seleccionConfirmarJSX = document.getElementById("seleccion-confirmar");
if (seleccionConfirmarJSX) {
    const { url} = seleccionConfirmarJSX.dataset;
    ReactDOM.createRoot(seleccionConfirmarJSX).render(
        <SeleccionConfirmarJSX
            url={url}
        />,
    );
}

/*---registroRequerimiento.jsx---*/
import RegistroRequerimientoJSX from "./Components/Web/RegistroRequerimiento/registroRequerimiento.jsx";
const registroRequerimientoJSX = document.getElementById("registro-requerimiento");
if (registroRequerimientoJSX) {
    const { url, token } = registroRequerimientoJSX.dataset;
    ReactDOM.createRoot(registroRequerimientoJSX).render(
        <RegistroRequerimientoJSX
            url={url}
            token={token}
        />,
    );
}

/*---registroPostulante.jsx---*/
import RegistroPostulanteJSX from "./Components/Web/RegistroPostulante/registroPostulante.jsx";
const registroPostulanteJSX = document.getElementById("registro-postulante");
if (registroPostulanteJSX) {
    const { url, token, usuario, typeform, version } = registroPostulanteJSX.dataset;
    ReactDOM.createRoot(registroPostulanteJSX).render(
        <RegistroPostulanteJSX
            url={url}
            token={token}
            usuario={usuario}
            typeform={typeform}
            version={version}
        />,
    );
}
