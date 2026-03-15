import axios from 'axios';

export function ajaxLoadDataRegistroPostulante(token, show, usuario) {

    return axios.post('/ajax-load-data-registro-postulante', {token, show, usuario} )
        .then(res => {
            return res.data;
        });

}

export function ajaxSaveRegistroPostulante(data, isChofer, finalizado = false) {

    return axios.post('/ajax-save-registro-postulante', {data, isChofer, finalizado} )
        .then(res => {
            return res.data;
        });

}

export function ajaxSearchDepartamentosList(paisID) {

    return axios.post('/ajax-search-departamentos-list', {paisID}).then(res => {
        return res.data;
    });

}
