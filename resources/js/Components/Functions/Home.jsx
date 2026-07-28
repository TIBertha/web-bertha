import axios from "axios";

export function disableSeleccionModal() {

    return axios.post('/ajax-disable-modal-seleccion', {} )
        .then(res => {
            return res.data;
        });
}

export function ajaxVerifyDisableModalSeleccion() {

    return axios.post('/ajax-verify-disable-modal-seleccion', {} )
        .then(res => {
            return res.data;
        });
}

export function ajaxGetDataPrensa() {

    return axios.post('/ajax-get-data-prensa', {} )
        .then(res => {
            return res.data;
        });
}

export function ajaxGetTestimonialesEmpleador() {

    return axios.post('/ajax-get-testimoniales-empleador', {} )
        .then(res => {
            return res.data;
        });
}

export function ajaxGetTestimonialesTrabajador() {

    return axios.post('/ajax-get-testimoniales-trabajador', {} )
        .then(res => {
            return res.data;
        });
}

export function ajaxGetPostulantesSlider() {

    return axios.post('/ajax-get-postulantes-slider', {} )
        .then(res => {
            return res.data;
        });
}
