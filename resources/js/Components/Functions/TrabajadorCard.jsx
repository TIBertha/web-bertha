export function getDisponibilidad(disponibilidad, lang = 'es') {
    let result = { text: '', tooltip: '', class: '' };

    const textoES = {
        alta: {
            text: 'Probabilidad alta de Disponibilidad',
            tooltip: 'Buscó trabajo en los últimos 15 días'
        },
        media: {
            text: 'Probabilidad media de Disponibilidad',
            tooltip: 'Buscó trabajo hace más de 15 y menos de 30 días'
        },
        baja: {
            text: 'Probabilidad baja de Disponibilidad',
            tooltip: 'Buscó trabajo hace más de 30 días'
        }
    };

    const textoEN = {
        alta: {
            text: 'High availability probability',
            tooltip: 'Searched for work within the last 15 days'
        },
        media: {
            text: 'Medium availability probability',
            tooltip: 'Searched for work more than 15 but less than 30 days ago'
        },
        baja: {
            text: 'Low availability probability',
            tooltip: 'Searched for work more than 30 days ago'
        }
    };

    const dict = lang === 'es' ? textoES : textoEN;

    if (disponibilidad === 'A') {
        result.text = dict.alta.text;
        result.tooltip = dict.alta.tooltip;
        result.class = 'pt-3 badge-seleccion-disponibilidad badge-alta';
    } else if (disponibilidad === 'M') {
        result.text = dict.media.text;
        result.tooltip = dict.media.tooltip;
        result.class = 'pt-3 badge-seleccion-disponibilidad badge-media';
    } else if (disponibilidad === 'B') {
        result.text = dict.baja.text;
        result.tooltip = dict.baja.tooltip;
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
