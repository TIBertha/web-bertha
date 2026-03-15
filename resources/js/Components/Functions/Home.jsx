import axios from "axios";

export function disableSeleccionModal() {

    return axios.post('/ajax-disable-modal-seleccion', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function ajaxVerifyDisableModalSeleccion() {

    return axios.post('/ajax-verify-disable-modal-seleccion', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function ajaxGetDataPrensa() {

    return axios.post('/ajax-get-data-prensa', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function ajaxGetTestimonialesEmpleador() {

    return axios.post('/ajax-get-testimoniales-empleador', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function ajaxGetTestimonialesTrabajador() {

    return axios.post('/ajax-get-testimoniales-trabajador', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}
