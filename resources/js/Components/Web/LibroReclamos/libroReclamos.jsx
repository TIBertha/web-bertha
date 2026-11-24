import React, { Component } from "react";
import {
    showAlert,
    showAlertConfirmRedirectReactRouter2,
} from "../../Helpers/alerts.jsx";
import {
    ajaxGetDataReclamos,
    ajaxReclamosNew,
} from "../../Functions/Reclamos.jsx";
import CircledHr from "../Components/circledHr.jsx";
import ReclamosForm from "./reclamosForm.jsx";
import LoadingScreen from "../Components/loadingScreen.jsx";

const reclamosText = (country) => {
    const isMexico = country === "mx";

    return {
        es: {
            title: isMexico
                ? "Quejas y reclamaciones Bertha México"
                : "Libro de reclamaciones (Ley 29571)",

            stepsTitle: isMexico
                ? "Pasos para registrar una reclamación o una queja"
                : "Pasos para registrar una queja o un reclamo",

            step1: isMexico
                ? "Llenar el siguiente formulario registrando el detalle de la reclamación o queja y tus datos de contacto para poder ubicarte."
                : "Llenar el siguiente formulario registrando el detalle del reclamo o queja y tus datos de contacto para poder ubicarte.",

            step2: isMexico
                ? null
                : "En las siguientes 48 horas recibirás un mensaje por e-mail con tu nro. de reclamo o queja.",

            step3: isMexico
                ? "El plazo de atención de la reclamación o queja es de 30 días calendario desde su presentación."
                : "De conformidad y en cumplimiento del D.S.011-2011 PCM, el plazo de atención del reclamo es de 30 días calendario desde su presentación.",

            step4: isMexico
                ? "Si el consumidor no consigna la información mínima requerida, se considerará la reclamación o queja como no presentada."
                : "Si el consumidor no consigna la información mínima requerida, se considerará el reclamo o queja como no puesto.",

            diffTitle: isMexico
                ? "Diferencias entre una reclamación y una queja"
                : "Diferencias entre una queja y un reclamo",

            queja: "Una queja es una disconformidad no relacionada a los productos o servicios; o malestar respecto a la atención al público.",

            reclamo: isMexico
                ? "Una reclamación es una disconformidad relacionada a los productos o servicios."
                : "Un reclamo es una disconformidad relacionada a los productos o servicios.",
        },

        en: {
            title: isMexico
                ? "Bertha Mexico Complaints and Claims"
                : "Complaints Book (Law 29571)",

            stepsTitle: isMexico
                ? "Steps to file a claim or complaint"
                : "Steps to file a complaint or claim",

            step1: "Fill out the form below with the details of your complaint or claim and your contact information.",

            step2: isMexico
                ? null
                : "Within 48 hours you will receive an email with your complaint or claim number.",

            step3: isMexico
                ? "Claims or complaints will be addressed within 30 calendar days of submission."
                : "According to D.S.011-2011 PCM, the response time is 30 calendar days from submission.",

            step4: "If the consumer does not provide the minimum required information, the complaint or claim will be considered not submitted.",

            diffTitle: isMexico
                ? "Differences between a claim and a complaint"
                : "Differences between a complaint and a claim",

            queja: "A complaint is dissatisfaction not related to products or services, or discomfort regarding customer service.",

            reclamo: "A claim is dissatisfaction related to products or services.",
        },
    };
};

export default class LibroReclamos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: props.url,
            lang: props.lang || "es",
            country: props.country || "pe",

            nombres: "",
            apellidos: "",
            documento: "",
            direccion: "",
            correo: "",
            telefono: "",
            apoderado: "",
            bien: "",
            tipo: "",
            fechaincidente: "",
            lugarincidente: "",
            detalle: "",
            pedido: "",
            politica: false,

            bienes: [],
            tiposreclamos: [],

            isLoading: false,
        };

        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setLoading(condition) {
        this.setState({
            isLoading: condition,
        });
    }

    handleChange(e, tipo = "") {
        if (tipo === "fi") {
            this.setState({
                fechaincidente: e,
            });
        } else if (tipo === "detalle") {
            this.setState({
                detalle: e.target.value,
            });
        } else if (tipo === "pedido") {
            this.setState({
                pedido: e.target.value,
            });
        } else if (tipo === "politica") {
            this.setState((prevState) => ({
                politica: !prevState.politica,
            }));
        } else {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    async save(e) {
        e.preventDefault();

        this.setLoading(true);

        try {
            const r = await ajaxReclamosNew(this.state);

            if (r.code === 200) {
                showAlertConfirmRedirectReactRouter2(
                    "exito",
                    r.msj,
                    `/${this.state.country}`
                );
            } else {
                showAlert("error", r.msj);
            }
        } catch (error) {
            if (error.response?.status === 422) {
                showAlert("error", error.response.data);
            } else {
                showAlert(
                    "error",
                    "Ha ocurrido un error, contacte al administrador."
                );
            }
        } finally {
            this.setLoading(false);
        }
    }

    async componentDidMount() {
        this.setLoading(true);

        try {
            const r = await ajaxGetDataReclamos();

            if (r.code === 200) {
                this.setState({
                    bienes: r.bienes,
                    tiposreclamos: r.tiposreclamos,
                });
            } else {
                showAlert("error", r.msj);
            }
        } catch (error) {
            showAlert(
                "error",
                "Ha ocurrido un error, contacte al administrador."
            );
        } finally {
            this.setLoading(false);
        }
    }

    render() {
        const { lang, country, isLoading } = this.state;

        const idioma = lang === "en" ? "en" : "es";
        const t = reclamosText(country)[idioma];

        const pasos = [
            t.step1,
            t.step2,
            t.step3,
            t.step4,
        ].filter(Boolean);

        const diferencias = country === "mx"
            ? [t.reclamo, t.queja]
            : [t.queja, t.reclamo];

        return (
            <section>
                <div className="p-3 px-md-5 m-0">

                    <div className="titulo-seccion py-2 text-pink">
                        <h3 className="display-5 titulo responsive-title-size text-pink">
                            {t.title}
                        </h3>

                        <CircledHr num={15} />
                    </div>

                    <section className="container-fluid reclamo">

                        <section className="claims">

                            <div className="claims-content">

                                <div className="claims-content-items">

                                    <div className="tab-claims subtitle">
                                        {t.stepsTitle}
                                        <i className="icon-keyboard_arrow_down"></i>
                                    </div>

                                    <div className="details">

                                        {pasos.map((paso, index) => (
                                            <div
                                                className="item"
                                                key={index}
                                            >
                                                <div className="number">
                                                    {index + 1}
                                                </div>

                                                <div className="description">
                                                    {paso}
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                <div className="claims-content-items">

                                    <div className="tab-claims subtitle">
                                        {t.diffTitle}
                                        <i className="icon-keyboard_arrow_down"></i>
                                    </div>

                                    <div className="details">

                                        {diferencias.map((descripcion, index) => (
                                            <div
                                                className="item"
                                                key={index}
                                            >
                                                <i className="fas fa-info-circle"></i>

                                                <div className="description">
                                                    {descripcion}
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                </div>

                            </div>

                            <div className="claims-form">

                                {isLoading ? (
                                    <LoadingScreen load={isLoading} />
                                ) : (
                                    <ReclamosForm
                                        data={this.state}
                                        handleChange={this.handleChange}
                                        save={this.save}
                                        isLoading={isLoading}
                                        lang={idioma}
                                        country={country}
                                    />
                                )}

                            </div>

                        </section>

                    </section>

                </div>

            </section>
        );
    }
}
