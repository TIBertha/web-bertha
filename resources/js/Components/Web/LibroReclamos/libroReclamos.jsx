import React, { Component } from 'react';
import {
    showAlert,
    showAlertConfirmRedirectReactRouter,
    showAlertConfirmRedirectReactRouter2
} from '../../Helpers/alerts.jsx';
import {useParams} from "react-router";
import {ajaxGetDataReclamos, ajaxReclamosNew} from "../../Functions/Reclamos.jsx";
import CircledHr from "../Components/circledHr.jsx";
import ReclamosForm from "./reclamosForm.jsx";
import LoadingScreen from "../Components/loadingScreen.jsx";

export default class LibroReclamos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
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

        if(tipo == 'fi'){
            this.setState({
                fechaincidente: e
            });
        }else if(tipo == 'detalle'){
            this.setState({
                detalle: e.target.value
            });
        }else if(tipo == 'pedido'){
            this.setState({
                pedido: e.target.value
            });
        }else if(tipo == 'politica'){
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
                const { navigate } = this.props;
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

        let {isLoading} = this.state;

        return (
            <section>

                <div className="p-3 px-md-5 m-0">


                    <div className="titulo-seccion titulo-seccion py-2 text-pink">
                        <h3 className="display-5 titulo text-pink d-none d-xl-block responsive-title-size">Libro de reclamaciones (Ley 29571)</h3>
                        <h3 className="display-5 titulo d-block d-xl-none responsive-title-size">Libro de reclamaciones (Ley 29571)</h3>
                        <CircledHr num={15}/>
                    </div>

                    <section className="container-fluid reclamo">

                        <section className="claims">

                            <div className="claims-content">
                                <div className="claims-content-items">
                                    <div className="tab-claims subtitle">Pasos para registrar una queja o un reclamo <i
                                        className="icon-keyboard_arrow_down"></i></div>
                                    <div className="details">
                                        <div className="item">
                                            <div className="number">1</div>
                                            <div className="description">Llenar el siguiente formulario registrando el
                                                detalle del reclamo o queja y tus datos de contacto para poder ubicarte.
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="number">2</div>
                                            <div className="description">En las siguientes 48 horas recibirás un mensaje
                                                por e-mail con tu nro. de reclamo o queja, el cual deberás guardar para
                                                tu posterior seguimiento o consulta.
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="number">3</div>
                                            <div className="description">De conformidad y en cumplimiento del
                                                D.S.011-2011 PCM, el plazo de atención del reclamo es de 30 días
                                                calendario desde su presentación, el cual podrá extenderse
                                                excepcionalmente de acuerdo a la complejidad del requerimiento.
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="number">4</div>
                                            <div className="description">En caso que el consumidor no consigne de manera
                                                adecuada la totalidad de la información mínima requerida en el presente
                                                formulario, se considerará el reclamo o queja como no puesto.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="claims-content-items">
                                    <div className="tab-claims subtitle">Diferencias entre una queja y un reclamo <i
                                        className="icon-keyboard_arrow_down"></i></div>
                                    <div className="details">
                                        <div className="item"><i className="fas fa-info-circle"></i>
                                            <div className="description"><span>Una queja</span> es una disconformidad no
                                                relacionada a los productos o servicios; o, malestar o descontento
                                                respecto a la atención al público.
                                            </div>
                                        </div>
                                        <div className="item"><i className="fas fa-info-circle"></i>
                                            <div className="description"><span>Un reclamo</span> es una disconformidad
                                                relacionada a los productos o servicios.
                                            </div>
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
