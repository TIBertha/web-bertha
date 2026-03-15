import axios from 'axios';

export function ajaxCheckPhone(phone, tipousuario) {

    return axios.post('/ajax-check-phone', {phone, tipousuario} )
        .then(res => {
            return res.data;
        });

}
