import Swal from "sweetalert2";

export function showAlert(type, msj) {

    let icon = '';

    if(type === 'exito'){
        icon = '<i class="fas fa-check-circle"></i>';
    }else{
        icon = '<i class="fas fa-exclamation-circle"></i>';
    }

    Swal.fire({
        title: icon,
        text: msj,
        confirmButtonColor: '#513675',
        confirmButtonText: 'Ok'
    });

}

export function showAlertConfirmRedirectReactRouter(type, msj, ruta, navigate) {

    let icon = '<i class="fas fa-' + (type === 'exito' ? 'check' : 'exclamation') + '-circle"></i>';

    Swal.fire({
        title: icon,
        text: msj,
        showCancelButton: false,
        confirmButtonColor: '#513675',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.value && ruta) {
            navigate(ruta);
        }
    });

}

export function showAlertConfirmRedirectReactRouter2(type, msj, ruta) {

    let icon = '<i class="fas fa-' + (type === 'exito' ? 'check' : 'exclamation') + '-circle"></i>';

    Swal.fire({
        title: icon,
        text: msj,
        showCancelButton: false,
        confirmButtonColor: '#513675',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.value && ruta) {
            window.location.href = ruta;
        }
    });

}
