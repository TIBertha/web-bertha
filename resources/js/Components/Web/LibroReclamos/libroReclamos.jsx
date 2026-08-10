import React, { Component } from 'react';
import {
    showAlert,
    showAlertConfirmRedirectReactRouter2
} from '../../Helpers/alerts.jsx';
import {ajaxGetDataReclamos, ajaxReclamosNew} from "../../Functions/Reclamos.jsx";
import CircledHr from "../Components/circledHr.jsx";
import ReclamosForm from "./reclamosForm.jsx";
import LoadingScreen from "../Components/loadingScreen.jsx";
import {mobileDesktop} from "../../Functions/General.jsx";

const reclamosText = {
    es: {
        title: "Libro de reclamaciones (Ley 29571)",
        stepsTitle: "Pasos para registrar una queja o un reclamo",
        step1: "Llenar el siguiente formulario registrando el detalle del reclamo o queja y tus datos de contacto para poder ubicarte.",
        step2: "En las siguientes 48 horas recibirás un mensaje por e-mail con tu nro. de reclamo o queja.",
        step3: "De conformidad y en cumplimiento del D.S.011-2011 PCM, el plazo de atención del reclamo es de 30 días calendario desde su presentación.",
        step4: "Si el consumidor no consigna la información mínima requerida, se considerará el reclamo o queja como no puesto.",
        diffTitle: "Diferencias entre una queja y un reclamo",
        queja: "Una queja es una disconformidad no relacionada a los productos o servicios; o malestar respecto a la atención al público.",
        reclamo: "Un reclamo es una disconformidad relacionada a los productos o servicios."
    },

    en: {
        title: "Complaints Book (Law 29571)",
        stepsTitle: "Steps to file a complaint or claim",
        step1: "Fill out the form below with the details of your complaint or claim and your contact information.",
        step2: "Within 48 hours you will receive an email with your complaint or claim number.",
        step3: "According to D.S.011-2011 PCM, the response time is 30 calendar days from submission.",
        step4: "If the consumer does not provide the minimum required information, the complaint or claim will be considered not submitted.",
        diffTitle: "Differences between a complaint and a claim",
        queja: "A complaint is dissatisfaction not related to products or services, or discomfort regarding customer service.",
        reclamo: "A claim is dissatisfaction related to products or services."
    }
};

export default class LibroReclamos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            lang: props.lang,
            nombres: '',
            apellidos: '',
            documento: '',
            direccion: '',
            correo: '',
            telefono: '',
            apoderado: '',
            bien: '',
            tipo: '',
            fechaincidente: '',
            lugarincidente: '',
            detalle: '',
            pedido: '',
            politica: false,

            bienes: [],
            tiposreclamos: [],

            isLoading: false
        };

        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    setLoading(condition){
        this.setState({isLoading: condition});
    }

    handleChange(e, tipo = '') {

        if(tipo === 'fi'){
            this.setState({
                fechaincidente: e
            });
        }else if(tipo === 'detalle'){
            this.setState({
                detalle: e.target.value
            });
        }else if(tipo === 'pedido'){
            this.setState({
                pedido: e.target.value
            });
        }else if(tipo === 'politica'){
            this.setState({
                politica: !this.state.politica
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    save(e){

        let self = this;

       this.setLoading(true);

        e.preventDefault();

        ajaxReclamosNew(this.state).then(r => {
            this.setLoading(false);
            if(r.code === 200){
                showAlertConfirmRedirectReactRouter2('exito', r.msj, '/es-pe');
            }else if(r.code === 500){
                showAlert('error', r.msj);
            }
        }).catch( function (error) {
            if (error.response.status === 422){
                self.setLoading(false);
                showAlert('error', error.response.data);
            }
        });
    }

    componentDidMount(){
        this.setLoading(true);

        ajaxGetDataReclamos().then(r => {

            if (r.code === 200) {
                this.setLoading(false);
                this.setState({
                    bienes: r.bienes,
                    tiposreclamos: r.tiposreclamos
                });
            } else if (r.code === 500) {
                showAlert('error', r.msj);
            }
        });
    }



    render(){

        let {lang, isLoading} = this.state;
        const t = reclamosText[lang];

        return (
            <section>

                <div className="p-3 px-md-5 m-0">


                    <div className="titulo-seccion titulo-seccion py-2 text-pink">
                        <h3 className={'display-5 titulo responsive-title-size text-pink'}>{t.title}</h3>
                        <CircledHr num={15}/>
                    </div>

                    <section className="container-fluid reclamo">

                        <section className="claims">

                            <div className="claims-content">
                                <div className="claims-content-items">
                                    <div className="tab-claims subtitle">{t.stepsTitle} <i className="icon-keyboard_arrow_down"></i></div>
                                    <div className="details">
                                        <div className="item">
                                            <div className="number">1</div>
                                            <div className="description">{t.step1}</div>
                                        </div>

                                        <div className="item">
                                            <div className="number">2</div>
                                            <div className="description">{t.step2}</div>
                                        </div>

                                        <div className="item">
                                            <div className="number">3</div>
                                            <div className="description">{t.step3}</div>
                                        </div>

                                        <div className="item">
                                            <div className="number">4</div>
                                            <div className="description">{t.step4}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="claims-content-items">
                                    <div className="tab-claims subtitle">
                                        {t.diffTitle} <i className="icon-keyboard_arrow_down"></i>
                                    </div>
                                    <div className="details">
                                        <div className="item">
                                            <i className="fas fa-info-circle"></i>
                                            <div className="description"><span>{lang === 'es' ? 'Una queja' : 'A complaint'}</span> {t.queja}</div>
                                        </div>
                                        <div className="item">
                                            <i className="fas fa-info-circle"></i>
                                            <div className="description"><span>{lang === 'es' ? 'Un reclamo' : 'A claim'}</span> {t.reclamo}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="claims-form">

                                {isLoading ?
                                    <LoadingScreen load={isLoading}/>
                                    :
                                    <ReclamosForm
                                        data={this.state}
                                        handleChange={this.handleChange}
                                        save={this.save}
                                        isLoading={this.state.isLoading}
                                        lang={lang}
                                    />
                                }

                            </div>

                        </section>
                    </section>

                </div>

            </section>
        )
    }
}
