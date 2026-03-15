import axios from "axios";

export function ajaxReclamosNew(data) {
    return axios.post('/ajax-reclamos-new', {data} )
        .then(res => {
            let r = res.data;
            return r;
        });
}

export function ajaxGetDataReclamos() {

    return axios.post('/ajax-get-data-reclamos', {} )
        .then(res => {
            let r = res.data;
            return r;
        });
}
