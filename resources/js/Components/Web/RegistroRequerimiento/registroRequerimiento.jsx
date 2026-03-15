import React, {useEffect, useState} from 'react';
import moment from "moment";
import ProgressBar from 'react-bootstrap/ProgressBar';

import {showAlert} from "../../Helpers/alerts.jsx";

import UseFormRequerimiento from "./Functions/useFormRequerimiento.jsx";
import ButtonPrevious from "./Components/buttonPrevious.jsx";
import ButtonNext from "./Components/buttonNext.jsx";

import {
    ajaxLoadDataRegistroRequerimiento,
    ajaxSaveRegistroRequerimiento, ajaxSendMailReq, armarhorarioCFPD
} from "../../Functions/RegistroRequerimiento.jsx";

import StepOne from "./Steps/stepOne.jsx";
import StepTwo from "./Steps/stepTwo.jsx";
import StepThree from "./Steps/stepThree.jsx";
import SuccessMessage from "./Steps/successMessage.jsx";

function lastStepToFinish(req) {
    const modalidad = req.modalidad_id?.value;
    const descanso = req.tipoDescanso_id?.value;

    if (descanso === 7) return false;

    return match(modalidad, {
        1: !(req.diaSalida && req.horaSalida && req.diaIngreso && req.horaIngreso),
        2: !req.horarios,
        3: !(req.horarios && req.frecuencia),
        _: true
    });
}

function match(value, cases) {
    return cases[value] ?? cases._;
}

export default function RegistroRequerimiento({url, token}) {
    const initialStateRequerimiento = {
        id: '',
        empleador_id: '',
        nombres:'',
        apellidos:'',
        numeroCelular:'',
        actividad_id:'',
        modalidad_id:'',
        nacionalidad_id:'',
        rangominimo: '18',
        rangomaximo: '',
        ubicacion_id:'',
        sueldo:'',
        tipoVivienda_id:'',
        input_domicilio: '',
        numeroPisos:'',
        numeroBebes:'',
        numeroNinos:'',
        numeroAdultos:'',
        numeroMascotas:'',
        edadBebes:[],
        edadNinos:[],
        edadAdultos:[],
        tipoDescanso_id: {label: 'Semanal', value: 9},
        dias:[],
        diasI:[],
        diasS:[],
        diaIngreso: {label: "Lunes", value: 1},
        diaSalida: {label: "Sábado", value: 6},
        horaIngreso: {label: "07:00 am", value: 7},
        horaSalida: {label: "01:00 pm", value: 13},
        diaDescanso: '',
        diaDescansoCamaDentro: 'De sábado a domingo',
        frecuencia: '',
        frecuencias: [],
        diasFrecuencia: [],
        horasSalida: [],
        fechaEntrevista: '',
        horaEntrevista: '',
        diassemana: [],
        horarios: armarhorarioCFPD(),
        placeHolderSueldo: 'Ingresa Monto',
        setSueldoActividad: 0,
        tipoBeneficio_id:'',
        fechaInicioLabores: '',
    };

    const initialStep = {first: 1, last: 3, current: 1};

    const [loading, setLoading] = useState(false);
    const [msjExito, setMsjExito] = useState(false);
    const [step, setStep] = useState(initialStep);
    const [percentageProgressBar, setPercentageProgressBar] = useState(0);
    const [requerimiento, handleChange, handleDelete, handleAddition, handleDrag, handleChangeHorarios, setFields] = UseFormRequerimiento(initialStateRequerimiento);
    const [edades, setEdades] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [nacionalidades, setNacionalidades] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [tiposViviendas, setTiposViviendas] = useState([]);
    const [nombres, setNombres] = useState([]);
    const [procedencia, setProcedencia] = useState([]);
    const [apellidos, setApellidos] = useState([]);
    const [dias, setDias] = useState([]);
    const [diasI, setDiasI] = useState([]);
    const [diasS, setDiasS] = useState([]);
    const [diasSemana, setDiasSemana] = useState([]);
    const [frecuencias, setFrecuencias] = useState([]);
    const [horasLabor, setHorasLabor] = useState([]);
    const [tiposBeneficios, setTiposBeneficios] = useState([]);
    const [tiposBeneficiosSM, setTiposBeneficiosSM] = useState([]);

    const onChange = (e, nombreCampo, tipoCampo) => {
        handleChange(e, nombreCampo, tipoCampo);
    };

    const onDelete = (e, nombreCampo) => {
        handleDelete(e, nombreCampo);
    };

    const onAdittion = (e, nombreCampo) => {
        handleAddition(e, nombreCampo);
    };

    const onDrag = (tag, currPos, newPos, nombreCampo) => {
        handleDrag(tag, currPos, newPos, nombreCampo);
    };

    const onChangeHorarios = (valor, id, nombrecampo) => {
        handleChangeHorarios(valor, id, nombrecampo);
    };

    const onChangeSetFields = (data) => {
        setFields(data);
    };

    const next = () => {
        let paso = step.current + 1;
        let stepClone = {...step, current: paso};
        setStep(stepClone);
        calcularProgressBar(paso);
    };

    const prev = () => {
        let paso = step.current - 1;
        let stepClone = {...step, current: paso};
        setStep(stepClone);
        calcularProgressBar(paso);
    };

    const calcularProgressBar = (paso) => { setPercentageProgressBar(( paso * 100) / step.last ) };

    useEffect(() => {

        ajaxLoadDataRegistroRequerimiento(token).then(result => {

            let req = result.requerimiento;

            setFields(req);
            setNombres(result.nombres);
            setProcedencia(result.procedencia);
            setApellidos(result.apellidos);
            setActividades(result.actividades);
            setModalidades(result.modalidades);
            setNacionalidades(result.nacionalidades);
            setEdades(result.edades);
            setUbicaciones(result.ubicaciones);
            setTiposViviendas(result.tiposViviendas);
            setDiasI(result.diasI);
            setDiasS(result.diasS);
            setDias(result.dias);
            setFrecuencias(result.frecuencias);
            setDiasSemana(result.diasSemana);
            setHorasLabor(result.horasLabor);
            setTiposBeneficios(result.tiposBeneficios);
            setTiposBeneficiosSM(result.tiposBeneficiosSM);
        });

    }, []);


    function parseHora(hora){
        return hora?.label ? moment(hora.label, "hh:mm A").format() : hora;
    }

    useEffect(() => {
        if (requerimiento.id){

            const he = parseHora(requerimiento.horaEntrevista);
            const hi = parseHora(requerimiento.horaIngreso);
            const hs = parseHora(requerimiento.horaSalida);

            ajaxSaveRegistroRequerimiento(requerimiento, token, he, hi, hs).then(r => {
                if(r.code === 500){
                    showAlert('error', r.msj);
                }
            }).catch(function (error){
                if (error.response.status === 422){
                    setLoading(false);
                    showAlert('error', error.response.data);
                }
            });
        }
    }, [requerimiento]);

    const save = (e) => {
        e.preventDefault();

        setLoading(true);

        const he = parseHora(requerimiento.horaEntrevista);
        const hi = parseHora(requerimiento.horaIngreso);
        const hs = parseHora(requerimiento.horaSalida);

        ajaxSaveRegistroRequerimiento(requerimiento, token, he, hi, hs).then(r => {
            setLoading(false);
            if(r.code === 200){
                setMsjExito(true);
            }else if(r.code === 500){
                showAlert('error', r.msj);
            }
        }).catch(function (error){
            if (error.response.status === 422){
                setLoading(false);
                showAlert('error', error.response.data);
            }
        });

    };

    const sendMailReq = (e) => {
        e.preventDefault();

        ajaxSendMailReq(requerimiento).then(r => {
            if(r.code === 200){
                setMsjExito(true);
            }else if(r.code === 500){
                showAlert('error', r.msj);
            }
        }).catch(function (error){
            if (error.response.status === 422){
                showAlert('error', error.response.data);
            }
        });
    };

    const fullNameEmp = (nombres) +' ' + (apellidos);

    return (
        <>
            {!loading && (
                <>
                    {msjExito ? (
                        <SuccessMessage  url={url} nombreEmpleador={fullNameEmp} />
                    ) : (
                        <form method="POST" onSubmit={sendMailReq} encType="multipart/form-data" >
                            {/* Contador */}
                            <div className="contador">
                                {[1, 2, 3].map((num) => (
                                    <span key={num} className={step.current >= num ? "active" : "disable"}>
                                    {num}
                                </span>
                                ))}
                            </div>

                            {/* Steps */}
                            {step.current === 1 && (
                                <StepOne
                                    nombreEmpleador={fullNameEmp}
                                    procedencia={procedencia}
                                    handleChange={onChange}
                                    requerimiento={requerimiento}
                                    ubicaciones={ubicaciones}
                                    actividades={actividades}
                                    modalidades={modalidades}
                                    nacionalidades={nacionalidades}
                                />
                            )}

                            {step.current === 2 && (
                                <StepTwo
                                    handleChange={onChange}
                                    handleDelete={onDelete}
                                    handleAddition={onAdittion}
                                    handleDrag={onDrag}
                                    requerimiento={requerimiento}
                                    tiposViviendas={tiposViviendas}
                                />
                            )}

                            {step.current === 3 && (
                                <StepThree
                                    handleChange={onChange}
                                    handleChangeHorarios={onChangeHorarios}
                                    requerimiento={requerimiento}
                                    diasI={diasI}
                                    diasS={diasS}
                                    frecuencias={frecuencias}
                                    horasLabor={horasLabor}
                                />
                            )}

                            {/* Navegación */}
                            <div className="row mt-5">
                                {step.current !== step.first && (
                                    <span className="col-6 text-end">
                                    <ButtonPrevious step={step} prev={prev} />
                                </span>
                                )}

                                {step.current !== step.last && (
                                    <span className={step.current === step.first ? "col-12 text-center" : "col-6 text-start"}>
                                    <ButtonNext
                                        step={step}
                                        next={next}
                                        requerimiento={requerimiento}
                                    />
                                </span>
                                )}

                                {step.current === step.last && (
                                    <span className="col-6">
                                    <button type="submit" className="btn bertha-green-button button-registro" disabled={lastStepToFinish(requerimiento)}>
                                        <b>
                                            {loading && (<i className="fas fa-sync fa-spin me-2"></i>)}
                                            Finalizar
                                        </b>
                                    </button>
                                </span>
                                )}
                            </div>

                            {/* Progress bar */}
                            {step.current > step.first && (
                                <div className="my-5 form-progress-bar">
                                    <ProgressBar animated now={percentageProgressBar} label={`${Math.trunc(percentageProgressBar)}%`} />
                                </div>
                            )}
                        </form>
                    )}
                </>
            )}
        </>
    )
}
