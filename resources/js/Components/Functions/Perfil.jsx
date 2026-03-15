import axios from 'axios';

export function ajaxPostLogin(correo, password, tipousuario) {
    return axios.post('/ajax-post-login', {correo, password, tipousuario} )
        .then(res => {
            return res.data;
        });
}

export function ajaxCambiarPerfil(data) {
    return axios.post('/ajax-cambiar-perfil', {data} )
        .then(res => {
            return res.data;
        });
}

export function ajaxGetPerfil() {
    return axios.post('/ajax-get-perfil', {} )
        .then(res => {
            return res.data;
        });
}

export function ajaxCambiarPassword(data) {
    return axios.post('/ajax-cambiar-password', {data} )
        .then(res => {
            return res.data;
        });
}
