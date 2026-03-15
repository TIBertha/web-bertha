import {useState} from 'react';
import imageCompression from 'browser-image-compression';
import {ajaxUploadFile} from "../../../Functions/General.jsx";

export default function (initialState = {}, version , paisPostulando) {
    const [value, setValue] = useState(initialState);

    const reset = () => {
        setValue( initialState );
    };

    const forceInputUppercase = (e) => {
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        e.target.value = e.target.value.toUpperCase();
        e.target.setSelectionRange(start, end);
    };

    const handleChange = (valor, nombrecampo, tipo = 'text') => {

        if(tipo === 'text'){

            setValue({...value, [ nombrecampo ]: valor.target.value.toUpperCase() });

            forceInputUppercase(valor);

        }else if(tipo == 'firma'){

            setValue({...value, firma: valor });

        }else if(tipo == 'videoyoutube'){

            setValue({...value, video_introduccion: valor });

        }else if(tipo == 'event'){

            if (nombrecampo == 'genero_id'){
                setValue({...value,
                    [ nombrecampo ]: valor,
                    actividad_id: '',
                });
            }if (nombrecampo == 'departamentonacimiento_id'){
                setValue({...value,
                    [ nombrecampo ]: valor,
                    lugar_nacimiento: valor.label,
                });
            }else{
                setValue({...value, [ nombrecampo ]: valor});
            }

        }else if(tipo == 'pais'){
            let v = {nacionalidad: 2, tipoDocumento: ''};

            if (paisPostulando == 54){
                if (valor.value == 54){
                    v.nacionalidad = 1;
                    v.tipoDocumento = {value:'1', label: 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)'};
                }
            }else if (paisPostulando == 11){
                if (valor.value == 11){
                    v.nacionalidad = 1;
                    v.tipoDocumento = {value:'10', label: 'ROL UNICO NACIONAL (RUN)'};
                }
            }

            setFields({
                pais_id: valor,
                nacionalidad_id: v.nacionalidad,
                departamentonacimiento_id: null,
                lugar_nacimiento: null,
                tipodocumento_id: v.tipoDocumento,
                numero_documento: ''
            })

        }else if(tipo == 'imagen' || tipo == 'imagenpdf') {

            let file = valor.target.files[0];
            let tipoFile = file.type;

            if(tipo == 'imagen'){

                let options = {
                    maxSizeMB: 4,
                    maxWidthOrHeight: 800,
                    useWebWorker: true
                };

                imageCompression(file, options).then( function(compressedFile){

                    let reader = new FileReader();

                    reader.readAsDataURL(compressedFile);

                    reader.onload = (e) => {
                        actionUploadFile(reader.result, nombrecampo, null, null);
                    };

                });

            }else if(tipo == 'imagenpdf'){

                let tiposFilePermitidos = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];

                if(tiposFilePermitidos.includes(tipoFile)){

                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = (e) => {
                        actionUploadFile(reader.result, campo, tipoFile);
                    }

                }else{
                    showAlert('error', 'Tipo de archivo no permitido');
                }

            }

        }else{

            setValue({...value, [ nombrecampo ]: valor});

        }

    };

    const actionUploadFile = (file, campo, tipoarchivo = null, llave = null) => {

        ajaxUploadFile(file, campo, tipoarchivo).then(r => {
            if(campo == 'certificadoantecedente'){
                this.setState({
                    [key]: false,
                    certificadoantecedente: r.result.image,
                    certificadoantecedentepdf: r.result.pdf
                });
            }else if(campo == 'recibos'){
                const data = this.state.fotorecibo.map((recibo, sidx) => {
                    if (llave !== sidx){
                        return recibo;
                    }
                    return { ...recibo, fotorecibo: r.result };
                });
                this.setState({ [key]: false, fotorecibo: data});
            }else{
                setValue({...value, [ campo ]: r.result});
            }

            if(r.code === 500){
                showAlert('error', r.msj)
            }
        });
    };

    const setFields = (target) => {
        setValue({...value, ...target});
    };

    return [ value, handleChange, setFields, reset ];

}
