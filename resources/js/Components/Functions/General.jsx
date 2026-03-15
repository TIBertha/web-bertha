import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export function ajaxGetCountryCode() {

    return axios.post('/ajax-get-country-code', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function ajaxGetViews() {

    return axios.post('/ajax-get-views', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function ajaxGetRedesSociales() {
    return axios.post('/ajax-get-redes-sociales', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

export function mobileDesktop() {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return windowSize.innerWidth <= 768 ? "mobile" : "desktop";
}

export function isResponsive(width = 768) {
    const getWindowSize = () => ({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
    });

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        const handleResize = () => setWindowSize(getWindowSize());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize.innerWidth <= width;
}

export function getCountryData(country) {
    let result = {
        nombre: '',
        divisa: '',
        code: '',
        ca: '',
        cf: '',
        whatsApp: '',
        whatsAppLink: '',
    };

    if (country == 'pe'){
        result.nombre = 'Perú';
        result.divisa = 'S/';
        result.code = 54;
        result.ca = 'Cama Adentro';
        result.cf = 'Cama Afuera';
        result.whatsApp = '+51 999 256 807';
        result.whatsAppLink = '51999256807';
    }else if (country == 'cl'){
        result.nombre = 'Chile';
        result.divisa = 'CLP $';
        result.code = 11;
        result.ca = 'Puerta Adentro';
        result.cf = 'Puerta Afuera';
        result.whatsApp = '+51 999 256 807';
        result.whatsAppLink = '51999256807';
    }else if (country == 'mx'){
        result.nombre = 'México';
        result.divisa = 'MXN $';
        result.code = 49;
        result.ca = 'De Planta';
        result.cf = 'Entrada por Salida';
        result.whatsApp = '+52 55 2091 2182';
        result.whatsAppLink = '525520912182';
    }

    return result;
}

export function ajaxUploadFile(file, campo, tipoarchivo) {
    return axios.post('/ajax-upload-file', {file, campo, tipoarchivo} )
        .then(res => {
            let r = res.data;
            return r;
        });
}
