import axios from 'axios';

export function ajaxProcesarSeleccion(filtros = null, url = false, isMobile = false) {

    return axios.post('/ajax-procesar-seleccion', {filtros, url, isMobile} )
        .then(res => {
            return res.data;
        });

}

export function ajaxIniciarRegistroRequerimiento(telefono) {

    return axios.post('/ajax-iniciar-registro-requerimiento', {telefono} )
        .then(res => {
            return res.data;
        });

}

export function ajaxRegistrarEmpleadorRequerimiento(nombres, apellidos, celular, politica, tipousuario, codeOperacion) {

    return axios.post('/ajax-registrar-empleador-requerimiento', {nombres, apellidos, celular, politica, tipousuario, codeOperacion} )
        .then(res => {
            return res.data;
        });

}

export function ajaxSaveCartSeleccion(cart) {

    return axios.post('/ajax-save-cart-seleccion', {cart} )
        .then(res => {
            return res.data;
        });

}

export function ajaxFinalizarSeleccion(cart, filtros, country) {

    return axios.post('/ajax-finalizar-seleccion', {cart, filtros, country} )
        .then(res => {
            return res.data;
        });

}

export function ajaxGetCartSeleccion() {

    return axios.post('/ajax-get-cart-seleccion')
        .then(res => {
            return res.data;
        });

}

export function ajaxDeleteCartSeleccion() {

    return axios.post('/ajax-delete-cart-seleccion')
        .then(res => {
            return res.data;
        });

}

export function ajaxContinuarCartSeleccion(country) {
    return axios.post('/ajax-continuar-cart-seleccion', {country})
        .then(res => {
            return res.data;
        });
}

export const checkInCart = (cart, id) => {
    if(cart){
        return cart.some( e => e.id === id);
    }
}

export function getSeleccionCardTrabajadores(limit = 3) {

    return axios.post('/ajax-get-seleccion-card-trabajadores', {limit} )
        .then(res => {
            return res.data;
        });

}
