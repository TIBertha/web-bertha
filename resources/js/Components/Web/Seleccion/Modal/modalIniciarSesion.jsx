import React, {useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "react-bootstrap";

import {
    ajaxIniciarRegistroRequerimiento,
    ajaxRegistrarEmpleadorRequerimiento
} from "../../../Functions/Seleccion.jsx";
import {ajaxCheckPhone} from "../../../Functions/Registro.jsx";

import FormularioRegistro from "../Forms/formularioRegistro.jsx";
import FormularioLogin from "../Forms/formularioLogin.jsx";

export default function ModalIniciarSesion({url, showModal, setShowModal, country}) {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipousuario, setTipousuario] = useState('cli');
    const [alertErrorCredenciales, setAlertErrorCredenciales] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vistaRegistro, setVistaRegistro] = useState('login');

    /*-Registro Empleador-*/
    const [alertErrorMensaje, setAlertErrorMensaje] = useState('');
    const [typeError, setTypeError] = useState('danger');
    const [politica, setPolitica] = useState(false);
    const [codeOperacion, setCodeOperacion] = useState('300');


    const changeVista = () => {
        setVistaRegistro(vistaRegistro === 'login' ? 'registro' : 'login');
        setNombres('');
        setApellidos('');
        setCelular('');
        setPassword('');
        setAlertErrorCredenciales(false);
    };

    const handleLogin = (e) =>{

        e.preventDefault();
        setIsLoading(true);

        ajaxIniciarRegistroRequerimiento(celular).then(r =>{
            setIsLoading(false);
            if(r.code === 200){
                window.location.href = url + '/confirmar-seleccion';
            }else if(r.code === 500){
                setAlertErrorCredenciales(true);
                setTypeError('danger');
                setAlertErrorMensaje(r.msj);
            }
        }).catch( function (error){
            setIsLoading(false);
            if (error.response.status == 422){
                setAlertErrorCredenciales(true);
                setTypeError('danger');
                setAlertErrorMensaje(error.response.data);
            }
        });
    };
    const save = (nombres, apellidos, celular, politica, tipousuario, codeOperacion) => {
        ajaxRegistrarEmpleadorRequerimiento(nombres, apellidos, celular, politica, tipousuario, codeOperacion).then(r => {

            setIsLoading(false);

            if(r.code === 200){

                window.location.href = url + '/confirmar-seleccion';

            }else if(r.code === 500){
                setIsLoading(false);
                setAlertErrorCredenciales(true);
                setTypeError('danger');
                setAlertErrorMensaje(r.msj);
            }


        }).catch(function (error){

            if (error.response.status === 422){
                setIsLoading(false);
                setAlertErrorCredenciales(true);
                setTypeError('danger');
                setAlertErrorMensaje(error.response.data);
            }

        });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (celular){
            if(celular.length >= 9){

                setIsLoading(true);

                ajaxCheckPhone(celular, tipousuario).then(r => {

                    if(r.code === 100) {

                        setCodeOperacion('100');
                        setAlertErrorCredenciales(true);
                        setTypeError('secondary');
                        setAlertErrorMensaje('El número de teléfono ingresado ya tiene cuenta de cliente registrada.');
                        setIsLoading(false);

                    }else{
                        setCodeOperacion('200');
                        save(nombres, apellidos, celular, politica, tipousuario, codeOperacion);

                    }

                }).catch(function (error){
                    setAlertErrorCredenciales(true);
                    setTypeError('danger');
                    setAlertErrorMensaje('Ha ocurrido un error. Consulte al administrador.');
                });

            }else{
                setAlertErrorCredenciales(true);
                setTypeError('danger');
                setAlertErrorMensaje('El número de teléfono debe tener 9 digitos.');
            }
        }else{
            setAlertErrorMensaje(true);
            setTypeError('danger');
            setAlertErrorMensaje('Ingrese el numero de teléfono');
        }
    };

    return (

        <div>

            <Modal className={'bertha-modal-aviso'} size="md" scrollable={true} show={showModal} onHide={() => setShowModal(false)} centered={true} backdrop="static" keyboard={false}>

                <ModalHeader className="bertha-content-aviso" closeButton></ModalHeader>

                <ModalBody className={'no-select-text'}>

                    {vistaRegistro === 'login' &&
                        <FormularioLogin
                            url={url}
                            country={country}
                            isLoading={isLoading}
                            closeAlert={() => setAlertErrorCredenciales(false)}
                            alertErrorCredenciales={alertErrorCredenciales}
                            alertErrorMensaje={alertErrorMensaje}
                            celular={celular}
                            setCelular={setCelular}
                            password={password}
                            setPassword={setPassword}
                            changeVista={changeVista}
                            handleLogin={handleLogin}/>
                    }

                    {vistaRegistro === 'registro' &&
                        <FormularioRegistro
                            url={url}
                            country={country}
                            isLoading={isLoading}
                            closeAlert={() => setAlertErrorCredenciales(false)}
                            alertErrorCredenciales={alertErrorCredenciales}
                            alertErrorMensaje={alertErrorMensaje}
                            typeError={typeError}
                            politica={politica}
                            setPolitica={setPolitica}
                            nombres={nombres}
                            setNombres={setNombres}
                            apellidos={apellidos}
                            setApellidos={setApellidos}
                            celular={celular}
                            setCelular={setCelular}
                            correo={correo}
                            setCorreo={setCorreo}
                            password={password}
                            setPassword={setPassword}
                            changeVista={changeVista}
                            handleRegister={handleRegister} />
                    }

                </ModalBody>
            </Modal>

        </div>

    )

}
