export function getDisponibilidad(disponibilidad){
    let result = {text: '', tooltip: '', class: '' };

    const textoDisponibilidadAlta = 'Buscó trabajo en los últimos 15 días';
    const textoDisponibilidadMedia = 'Buscó trabajo hace más de 15 y menos de 30 días';
    const textoDisponibilidadBaja = 'Buscó trabajo hace más de 30 días';

    if(disponibilidad == 'A'){
        result.text = 'Probabilidad alta de Disponibilidad';
        result.tooltip = textoDisponibilidadAlta;
        result.class = 'pt-3 badge-seleccion-disponibilidad badge-alta';
    }else if(disponibilidad == 'M'){
        result.text = 'Probabilidad media de Disponibilidad';
        result.tooltip = textoDisponibilidadMedia;
        result.class = 'pt-3 badge-seleccion-disponibilidad badge-media';
    }else if(disponibilidad == 'B'){
        result.text = 'Probabilidad baja de Disponibilidad';
        result.tooltip = textoDisponibilidadBaja;
        result.class = 'pt-3 badge-seleccion-disponibilidad badge-baja';
    }

    return result;
}

export function getTieneVacuna(numeroDosis){
    let result = {colorStyle: 'danger', text:'NO'};

    if (numeroDosis){
        if (numeroDosis == 0){
            result.colorStyle = 'danger';
            result.text = 'NO';
        }else{
            result.text = (numeroDosis + ' DOSIS');
            if (numeroDosis == 1){
                result.colorStyle = 'secondary';
            }else if (numeroDosis == 2){
                result.colorStyle = 'warning';
            }else if (numeroDosis >= 3){
                result.colorStyle = 'success';
            }
        }
    }

    return result;
}
