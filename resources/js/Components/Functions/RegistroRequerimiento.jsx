import axios from 'axios';
import moment from "moment";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

export function ajaxLoadDataRegistroRequerimiento(token) {

    return axios.post('/ajax-load-data-registro-requerimiento', {token} )
        .then(res => {
            return res.data;
        });

}

export function ajaxSaveRegistroRequerimiento(data, token, he, hi, hs) {
    return axios.post('/ajax-save-registro-requerimiento', {data, token, he, hi, hs} )
        .then(res => {
            return res.data;
        });

}

export function ajaxRefreshOptionsRegistroRequerimiento(modalidad, actividad, sueldoActividad){
    return axios.post('/ajax-refresh-options-registro-requerimiento', {modalidad, actividad, sueldoActividad} )
        .then(res => {
            return res.data;
        });
}

export function ajaxSendMailReq(data){
    return axios.post('/ajax-send-mail-req', {data})
        .then(res => {
            return res.data;
        })
}

export function armarhorarioCFPD(modalidad) {

    const hora = (h) => moment(setHours(setMinutes(new Date(), 0), h)).format();

    const ingreso = hora(8);
    const salida   = hora(17);
    const salidaPD = hora(13);
    const salidaCF = hora(13);

    const dias = [
        { id: 1, dia: 'Lunes',     diaC: 'Lu' },
        { id: 2, dia: 'Martes',    diaC: 'Ma' },
        { id: 3, dia: 'Miércoles', diaC: 'Mi' },
        { id: 4, dia: 'Jueves',    diaC: 'Ju' },
        { id: 5, dia: 'Viernes',   diaC: 'Vi' },
        { id: 6, dia: 'Sábado',    diaC: 'Sá' },
        { id: 7, dia: 'Domingo',   diaC: 'Do' },
    ];

    return dias.map((d) => ({
        id: d.id,
        dia: d.dia,
        diaC: d.diaC,
        horaingreso: ingreso,
        horasalida:
            d.id === 6
                ? (modalidad === 3 ? salidaPD : salidaCF)
                : salida,
        isDescanso: d.id === 7
    }));
}
