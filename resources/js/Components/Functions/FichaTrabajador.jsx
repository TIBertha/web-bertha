import axios from "axios";
import React from "react";

export function ajaxGetDataFichaRestringida(token, accessverif, usuario) {
    return axios.post('/ajax-get-data-ficha-restringida', {token, accessverif, usuario})
        .then(res => {
            return res.data;
        });
}

export function ajaxGetLikesAndViews(token) {
    return axios.post('/ajax-get-likes-and-views', {token})
        .then(res => {
            return res.data;
        });
}

export function ajaxAddLikeFicha(token, ipAddress) {
    return axios.post('/ajax-add-like-ficha', {token, ipAddress})
        .then(res => {
            return res.data;
        });
}

export function ajaxRemoveLikeFicha(token, ipAddress) {
    return axios.post('/ajax-remove-like-ficha', {token, ipAddress})
        .then(res => {
            return res.data;
        });
}

export function getTieneDosisVacuna(numeroDosis) {
    const labels = [
        "1ra dosis",
        "2da dosis",
        "3ra dosis",
        "4ta dosis",
        "5ta dosis"
    ];

    const result = {};

    labels.forEach((label, index) => {
        const key = [
            "primeraDosis",
            "segundaDosis",
            "terceraDosis",
            "cuartaDosis",
            "quintaDosis"
        ][index];

        const hasDose = numeroDosis >= index + 1;

        result[key] = (
            <p>
                {label}: {hasDose ? "SI REGISTRA" : "NO REGISTRA"}
            </p>
        );
    });

    return result;
}
