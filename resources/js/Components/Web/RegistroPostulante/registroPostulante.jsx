import React, {useEffect, useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import {showAlert} from "../../Helpers/alerts.jsx";
import {detectErroresByStep} from "../../Helpers/strings.jsx";

import UseFormPostulante from "./Functions/useFormPostulante.jsx";
import ButtonPrevious from "./Components/buttonPrevious.jsx";
import ButtonNext from "./Components/buttonNext.jsx";

import {
    ajaxLoadDataRegistroPostulante,
    ajaxSaveRegistroPostulante
} from "../../Functions/RegistroPostulante.jsx";

import StepOne from "./Steps/stepOne.jsx";
import StepTwo from "./Steps/stepTwo.jsx";
import StepThree from "./Steps/stepThree.jsx";
import StepFour from "./Steps/stepFour.jsx";
import StepFive from "./Steps/stepFive.jsx";
import StepSix from "./Steps/stepSix.jsx";
import StepSeven from "./Steps/stepSeven.jsx";
import SuccessMessage from "./Steps/successMessage.jsx";

const actividadesVaron = [
    {value: '1', label: "Todo Servicio"},
    {value: '8', label: "Chofer"},
    {value: '4', label: "Limpieza Varón"},
    {value: '9', label: "Mayordomo"}
];

const actividadesMujerPE = [
    {value: '1', label: "Todo Servicio"},
    {value: '6', label: "Nana"},
    {value: '3', label: "Enfermería"},
    {value: '10', label: "Cuidado Adulto Mayor"},
];

const actividadesMujerCL = [
    {value: '1', label: "Nana"},
    {value: '6', label: "Niñera"},
    {value: '3', label: "Enfermería"},
    {value: '10', label: "Cuidado Adulto Mayor"},
];

export default function RegistroPostulante({url, token, usuario, typeform, show, version}) {
    const initialStateTrabajador = {
        id: '',
        nombres: '',
        apellidos: '',
        genero_id: '',
        fechanacimiento: '',
        tipodocumento_id: '',
        numero_documento: '',
        estadocivil_id: '',
        nivelestudio_id: '',
        telefono: '',
        telefono_whatsapp: '',
        correo: '',
        numero_hijos: '',
        edad_hijos: '',
        pais_id: '',
        nacionalidad_id: '',
        lugar_nacimiento: '',
        departamentonacimiento_id: '',
        distrito_id: '',
        direccion: '',
        idioma_id: '',
        actividad_id: '',
        modalidad_id: '',
        foto: '',
        foto_documento_delantera: '',
        foto_documento_posterior: '',
        foto_licencia_delantera: '',
        foto_licencia_posterior: '',
        video_introduccion: '',
        firma: '',
        tuvo_covid: '',
        tiene_vacuna: '',
        adjunto_prueba_covid: '',
        adjunto_cartilla_vacuna: '',
        recibos: '',
        contactos: '',
        verificaciones_laborales: '',
        niveleducativo_id: '',
        adjunto_educacion: ''
    };

    const initialStep = {first: 1, last: 7, current: 1};

    const [loading, setLoading] = useState(false);
    const [msjExito, setMsjExito] = useState(false);

    const [step, setStep] = useState(initialStep);
    const [percentageProgressBar, setPercentageProgressBar] = useState(0);
    const [paisPostulando, setPaisPostulando] = useState(54);
    const [trabajador, handleChange, setFields] = UseFormPostulante(initialStateTrabajador, version, paisPostulando);

    const [generos, setGeneros] = useState([]);
    const [niveleseducativos, setNiveleseducativos] = useState([]);
    const [tiposdocumentos, setTiposdocumentos] = useState([]);
    const [paises, setPaises] = useState([]);
    const [estadosciviles, setEstadosciviles] = useState([]);
    const [idiomas, setIdiomas] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [actividadesAll, setActividadesAll] = useState([]);
    const [enabledCountries, setEnabledCountries] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [cantidades, setCantidades] = useState([]);
    const [respuestasTuvoCovid] = useState([{label: 'NO', value: 'NO'}, {label: 'SI', value: 'SI'}]);
    const [parentescos, setParentescos] = useState([]);
    const [tiposcertificados, setTiposcertificados] = useState([]);
    const [showAlertDiv, setShowAlertDiv] = useState(false);
    const [erroresList, setErroresList] = useState([]);
    const [labelError, setLabelError] = useState(false);

    const onChange = (e, nombreCampo, tipoCampo) => handleChange(e, nombreCampo, tipoCampo);
    const onChangeSetFields = (data) => setFields(data);

    const verifyStep = (paso, data) => {
        let pass = true;
        setErroresList([]);
        erroresList.splice(0, erroresList.length);
        setShowAlertDiv(false);
        setLabelError(false);

        if (paso === 2) {
            if (([4, 13, 18, 54, 11, 68].includes(trabajador.pais_id.value))) {
                if (!(
                    (data.numero_hijos?.value > 0 ? data.edad_hijos : true) &&
                    data.numero_hijos.value >= 0 &&
                    data.nombres &&
                    data.apellidos &&
                    data.genero_id &&
                    data.pais_id &&
                    data.tipodocumento_id &&
                    data.numero_documento &&
                    data.numero_documento.length >= 8 &&
                    data.fechanacimiento &&
                    data.estadocivil_id &&
                    data.departamentonacimiento_id &&
                    data.idioma_id
                )) {
                    pass = false;
                    setErroresList(detectErroresByStep(data, paso, erroresList));
                    setShowAlertDiv(true);
                    setLabelError(true);
                }
            } else {
                if (!(
                    (data.numero_hijos?.value > 0 ? data.edad_hijos : true) &&
                    data.numero_hijos.value >= 0 &&
                    data.nombres &&
                    data.apellidos &&
                    data.genero_id &&
                    data.pais_id &&
                    data.tipodocumento_id &&
                    data.numero_documento &&
                    data.numero_documento.length >= 8 &&
                    data.fechanacimiento &&
                    data.estadocivil_id &&
                    data.lugar_nacimiento &&
                    data.idioma_id
                )) {
                    pass = false;
                    setErroresList(detectErroresByStep(data, paso, erroresList));
                    setShowAlertDiv(true);
                    setLabelError(true);
                }
            }
        }

        else if (paso === 3) {
            if (!(data.distrito_id && data.direccion && data.tiene_vacuna)) {
                pass = false;
                setErroresList(detectErroresByStep(data, paso, erroresList));
                setShowAlertDiv(true);
                setLabelError(true);
            }
        }

        else if (paso === 5) {
            if (!data.niveleducativo_id) {
                pass = false;
                setErroresList(detectErroresByStep(data, paso, erroresList));
                setShowAlertDiv(true);
                setLabelError(true);
            }
        }

        else if (paso === 6) {
            if (!data.foto_documento_delantera) {
                pass = false;
                setErroresList(detectErroresByStep(data, paso, erroresList));
                setShowAlertDiv(true);
                setLabelError(true);
            }
        }

        else if (paso === 7) {
            if (!data.video_introduccion) {
                pass = false;
                setErroresList(detectErroresByStep(data, paso, erroresList));
                setShowAlertDiv(true);
                setLabelError(true);
            }
        }

        return pass;
    };

    // =========================
    // Navegación
    // =========================
    const calcularProgressBar = (paso) => setPercentageProgressBar((paso * 100) / step.last);

    const next = () => {
        setErroresList([]);
        let pass = verifyStep(step.current, trabajador);
        let paso = pass ? step.current + 1 : step.current;
        setStep({...step, current: paso});
        calcularProgressBar(paso);
    };

    const prev = () => {
        setErroresList([]);
        setShowAlertDiv(false);
        let paso = step.current - 1;
        setStep({...step, current: paso});
        calcularProgressBar(paso);
    };

    const start = () => {
        let paso = 1;
        setStep({...step, current: paso});
        calcularProgressBar(paso);
    };

    const save = (e) => {
        e.preventDefault();
        setLoading(true);

        let isChofer = trabajador.actividad_id ? trabajador.actividad_id.some(item => item.value === 8) : false;

        ajaxSaveRegistroPostulante(trabajador, isChofer, true, typeform)
            .then(r => {
                setLoading(false);
                if (r.code === 200) setMsjExito(true);
                else if (r.code === 500) showAlert('error', r.msj);
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setLoading(false);
                    showAlert('error', error.response.data);
                }
            });
    };

    // =========================
    // Actividades
    // =========================
    const findActivities = (genero) => {
        if (genero === 1) setActividades(actividadesVaron);
        else if (genero === 2) setActividades(paisPostulando === 11 ? actividadesMujerCL : actividadesMujerPE);
    };

    // =========================
    // Efectos
    // =========================
    useEffect(() => {
        ajaxLoadDataRegistroPostulante(token, show, usuario).then(result => {
            let tra = result.trabajador;

            setFields(tra);
            setGeneros(result.generos);
            setTiposdocumentos(result.tiposdocumentos);
            setEstadosciviles(result.estadosciviles);
            setNiveleseducativos(result.niveleseducativos);
            setPaises(result.paises);
            setPaisPostulando(result.paisPostulando);
            setDistritos(result.distritos);
            setActividades(result.actividades);
            setActividadesAll(result.actividadesAll);
            setEnabledCountries(result.enabledCountries);
            setModalidades(result.modalidades);
            setIdiomas(result.idiomas);
            setCantidades(result.cantidades);
            setParentescos(result.parentescos);
            setTiposcertificados(result.tiposcertificados);

            findActivities(tra.genero_id.value);
        });
    }, []);

    useEffect(() => {
        if (trabajador.id) {
            let isChofer = trabajador.actividad_id ? trabajador.actividad_id.some(item => item.value === 8) : false;

            ajaxSaveRegistroPostulante(trabajador, isChofer, false, typeform)
                .then(r => {
                    if (r.code === 500) showAlert('error', r.msj);
                })
                .catch(error => {
                    if (error.response.status === 422) showAlert('error', error.response.data);
                });
        }
    }, [trabajador]);

    useEffect(() => {
        findActivities(trabajador.genero_id.value);
    }, [trabajador.genero_id]);

    const whatsAppMsj =
        'https://api.whatsapp.com/send/?phone=51999256807&text=Hola%20Bertha%2C%20mi%20nombre%20es%20' +
        trabajador.nombreWhatsApp +
        '%2C%20ya%20llen%C3%A9%20mi%20curr%C3%ADculo%2C%20ahora%20te%20enviar%C3%A9%20mi%20video%2E%201%2E%20Dir%C3%A9%20mis%20nombres%20%28no%20mis%20apellidos%29%2E%202%2E%20Dir%C3%A9%20el%20lugar%20donde%20nac%C3%AD%2E%203%2E%20Dir%C3%A9%20mis%20cualidades%3B%20como%20en%20el%20siguiente%20ejemplo%3A%20https://youtu.be/iBnCDjVOj3Y';

    return (
        <>
            {!loading && (
                <>
                    {msjExito ? (
                        <SuccessMessage url={url} typeform={typeform} />
                    ) : (
                        <form method="POST" onSubmit={save} encType="multipart/form-data">

                            {step.current === 1 && <StepOne trabajador={trabajador} show={show} />}

                            {step.current === 2 && (
                                <StepTwo
                                    labelError={labelError}
                                    trabajador={trabajador}
                                    show={show}
                                    typeform={typeform}
                                    stepCurrent={step.current}
                                    generos={generos}
                                    tiposdocumentos={tiposdocumentos}
                                    estadosciviles={estadosciviles}
                                    cantidades={cantidades}
                                    distritos={distritos}
                                    idiomas={idiomas}
                                    actividades={actividades}
                                    modalidades={modalidades}
                                    paises={paises}
                                    enabledCountries={enabledCountries}
                                    setFields={onChangeSetFields}
                                    handleChange={onChange}
                                />
                            )}

                            {step.current === 3 && (
                                <StepThree
                                    labelError={labelError}
                                    paisPostulando={paisPostulando}
                                    trabajador={trabajador}
                                    show={show}
                                    stepCurrent={step.current}
                                    distritos={distritos}
                                    setFields={onChangeSetFields}
                                    handleChange={onChange}
                                    respuestasCartillaVacuna={respuestasTuvoCovid}
                                />
                            )}

                            {step.current === 4 && (
                                <StepFour
                                    distritos={distritos}
                                    paisPostulando={paisPostulando}
                                    trabajador={trabajador}
                                    show={show}
                                    stepCurrent={step.current}
                                    actividades={actividadesAll}
                                    setFields={onChangeSetFields}
                                    handleChange={onChange}
                                />
                            )}

                            {step.current === 5 && (
                                <StepFive
                                    labelError={labelError}
                                    trabajador={trabajador}
                                    show={show}
                                    stepCurrent={step.current}
                                    setFields={onChangeSetFields}
                                    handleChange={onChange}
                                    tiposcertificados={tiposcertificados}
                                    niveleseducativos={niveleseducativos}
                                />
                            )}

                            {step.current === 6 && (
                                <StepSix
                                    labelError={labelError}
                                    trabajador={trabajador}
                                    show={show}
                                    stepCurrent={step.current}
                                    setFields={onChangeSetFields}
                                />
                            )}

                            {step.current === 7 && (
                                <StepSeven
                                    labelError={labelError}
                                    trabajador={trabajador}
                                    show={show}
                                    stepCurrent={step.current}
                                    handleChange={onChange}
                                />
                            )}

                            {showAlertDiv && (
                                <div className="msj-error-registro-postulante mt-5">
                                    <div className="my-2">
                                        <p className="mb-2">
                                            <u>Errores:</u>
                                        </p>
                                        {erroresList.map((error) => (
                                            <p className="mx-2 mb-1">{error}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {show ? (
                                <div className="row mt-5">
                                    {step.current !== step.first && (
                                        <span className="col-6 text-end">
                                            <ButtonPrevious step={step} prev={prev} />
                                        </span>
                                    )}

                                    {step.current !== step.last && (
                                        <span className={step.current === step.first ? 'col-12 text-center' : 'col-6 text-start'}>
                                            <ButtonNext
                                                disableButtonNext={false}
                                                typeform={typeform}
                                                show={show}
                                                step={step}
                                                next={next}
                                                trabajador={trabajador}
                                            />
                                        </span>
                                    )}

                                    {step.current === step.last && (
                                        <span className="col-6">
                                            <button
                                                type="button"
                                                className="btn btn-registro bt-registro button-registro"
                                                onClick={start}
                                            >
                                                <b>Inicio</b>
                                            </button>
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="row mt-5">
                                    {step.current !== step.first && (
                                        <span className="col-6 text-end">
                                            <ButtonPrevious step={step} prev={prev} />
                                        </span>
                                    )}

                                    {step.current !== step.last && (
                                        <span className={step.current === step.first ? 'col-12 text-center' : 'col-6 text-start'}>
                                            <ButtonNext
                                                disableButtonNext={false}
                                                typeform={typeform}
                                                show={show}
                                                step={step}
                                                next={next}
                                            />
                                        </span>
                                    )}

                                    {step.current === step.last && (
                                        <span className="col-6">
                                            <a href={whatsAppMsj} className="btn bertha-green-button button-registro">
                                                Enviar
                                            </a>
                                        </span>
                                    )}
                                </div>
                            )}

                            {step.current === step.first && typeform === 'new' && (
                                <div className="link-volver-web col-12 text-center mb-2 mt-4">
                                    <div>
                                        <a href={url + '/busco-trabajo'}>Volver a la web</a>
                                    </div>
                                </div>
                            )}

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
    );
}




