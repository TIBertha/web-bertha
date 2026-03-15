
export function str_limit(text, limit) {

    if(text.length > limit){
        return text.substring(0, limit) + '...';
    }else{
        return text;
    }
}

export function ucfirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function textLower(text) {

    if (text){
        return text.toLocaleLowerCase();
    }else{
        return '';
    }

}

export function detectErroresByStep(data, paso, errores = []) {

    const isEmpty = (v) =>
        v === null || v === undefined || v === "" || v === false;

    switch (paso) {

        case 2:
            if (isEmpty(data.nombres)) errores.push("Falta tu nombre.");
            if (isEmpty(data.apellidos)) errores.push("Falta tu apellido.");
            if (isEmpty(data.genero_id)) errores.push("Falta tu genero.");
            if (isEmpty(data.pais_id)) errores.push("Falta tu país de nacimiento.");
            if (isEmpty(data.tipodocumento_id)) errores.push("Falta el tipo de documento.");

            if (isEmpty(data.numero_documento)) {
                errores.push("Falta tu número de documento.");
            } else if (data.numero_documento.length < 8) {
                errores.push("Falta dígitos al número de documento.");
            }

            if (isEmpty(data.fechanacimiento)) errores.push("Falta tu fecha de nacimiento.");

            const hijos = data.numero_hijos?.value;
            if (hijos === undefined || hijos === null) {
                errores.push("Falta tu cantidad de hijos.");
            } else if (hijos > 0 && isEmpty(data.edad_hijos)) {
                errores.push("Falta la edad de tu(s) hijos(s).");
            }

            if (data.nacionalidad_id == 2) {
                if (isEmpty(data.lugar_nacimiento)) errores.push("Falta tu lugar de nacimiento.");
            } else {
                if (isEmpty(data.departamentonacimiento_id)) errores.push("Falta tu departamento de nacimiento.");
            }

            if (isEmpty(data.estadocivil_id)) errores.push("Falta tu estado civil.");
            break;

        case 3:
            if (isEmpty(data.distrito_id)) errores.push("Falta el distrito donde vives.");
            if (isEmpty(data.direccion)) errores.push("Falta la dirección donde vives.");
            if (isEmpty(data.tiene_vacuna)) errores.push("Falta la cantidad de vacunas.");
            break;

        case 5:
            if (isEmpty(data.niveleducativo_id)) errores.push("Falta agregar tu nivel educativo.");
            break;

        case 6:
            if (isEmpty(data.foto_documento_delantera))
                errores.push("Falta la foto delantera de tu documento de identidad.");
            break;

        case 7:
            if (isEmpty(data.video_introduccion))
                errores.push("Falta subir tu video.");
            break;
    }

    return errores;
}

export function getNombreCorto(nombre, apellido){

    if(nombre && apellido){

        let n = nombre.split(' ');
        let a = apellido.split(' ');
        let ape = '';

        if(a.length > 1){

            if(a[0].length <= 3){

                if(a[1].length <= 3){

                    if(a.length > 2){
                        ape = a[0] + ' ' + a[1] + ' ' + a[2];
                    }else{
                        ape = a[0] + ' ' + a[1];
                    }
                }else{
                    ape = a[0] + ' ' + a[1];
                }

            }else{
                ape = a[0];
            }

        }else{
            ape = a[0];
        }

        return ucfirst(textLower(n[0])) + ' ' + ucfirst(textLower(ape));
    }

    return '';
}
