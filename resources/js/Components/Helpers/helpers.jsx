import moment from "moment";

export function isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
}

export function isHourIngresoEqualOrGreaterHourSalida(horaA, horaB) {

    let t1 = moment(horaA, "YYYY-MM-DD HH:mm:ss");
    let t2 = moment(horaB, "YYYY-MM-DD HH:mm:ss");

    if(t1.hour() > t2.hour()){
        return true;
    }

    return false;

}

export function mayorEdad() {
    let date = new Date();
    let year = new Date().getFullYear() - 18;
    return date.setUTCFullYear(year);
}
