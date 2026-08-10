import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import Drawer from 'rc-drawer';
import { useMediaQuery } from 'react-responsive';
import {ajaxFinalizarSeleccion, ajaxProcesarSeleccion, ajaxSaveCartSeleccion} from "../../Functions/Seleccion.jsx";
import {ajaxVerifyDisableModalSeleccion} from "../../Functions/Home.jsx";
import {getCountryData, mobileDesktop} from "../../Functions/General.jsx";
import {isEmptyObject} from "../../Helpers/helpers.jsx";
import {showAlert} from "../../Helpers/alerts.jsx";
import Filtros from "./filtros.jsx";
import Totales from "./totales.jsx";
import Cart from "./cart.jsx";
import Trabajadores from "./trabajadores.jsx";
import ModalMenu from "./modalMenu.jsx";
import FichaRestringidaTrabajadorIndex from "../FichaTrabajador/FichaRestringida/fichaRestringidaTrabajadorIndex.jsx";
import ModalIniciarSesion from "./Modal/modalIniciarSesion.jsx";
import ModalComoFunciona from "./Modal/modalComoFunciona.jsx";
import ModalSueldos from "./Modal/modalSueldos.jsx";


const setParametrosURL = (parametros) => {

    let newRelativePathQuery = window.location.pathname + ( parametros ? ('?' + parametros) : '' );
    window.history.pushState(null, '', newRelativePathQuery);

};

export default function Seleccion({url, country, lang = 'es'}) {
    const [filtrosSelected, setFiltrosSelected] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);
    const [cart, setCart] = useState([]);
    const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
    const [tokenTrabajador, setTokenTrabajador] = useState(null);
    const [usuarioTrabajador, setUsuarioTrabajador] = useState(null);
    const [showModalRegistro, setShowModalRegistro] = useState(false);
    const [showModalComoFunciona, setShowModalComoFunciona] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });
    let countryData = getCountryData(country);

    let display = mobileDesktop();

    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    const closeModalComoFunciona = () => {
        setShowModalComoFunciona(false);
    };

    const openDrawer = (token, usuario) => {
        setTokenTrabajador(token);
        setUsuarioTrabajador(usuario);
        setIsVisibleDrawer(true);
    };
    const closeDrawer = () => {
        setTokenTrabajador(null);
        setIsVisibleDrawer(false);
    };

    const addFilter = (filtro, valor, label) => {

        const index = filtrosSelected.findIndex( element => element.filtro === filtro );

        const data = {filtro: filtro, valor: valor, label: label};

        let dataFiltro = [...filtrosSelected];

        if (index === -1) {

            if( !['page'].includes(filtro) ){
                dataFiltro =  dataFiltro.filter(item => item.filtro !== 'page');
            }

            const newItem = [...dataFiltro, data];

            setFiltrosSelected(newItem);

            ajaxProcesarSeleccion(newItem, false, isTabletOrMobile).then(result => {
                setParametrosURL(result.data.url);
                setTrabajadores(result.data.trabajadores);
            });

        } else {

            dataFiltro[index] = data;

            if( !['page'].includes(filtro) ){
                dataFiltro =  dataFiltro.filter(item => item.filtro !== 'page');
            }

            setFiltrosSelected(dataFiltro);

            ajaxProcesarSeleccion(dataFiltro, false, isTabletOrMobile).then(result => {
                setParametrosURL(result.data.url);
                setTrabajadores(result.data.trabajadores);
            });

        }

        closeDrawer();

    };

    const removeFilter = (filtro) => {

        let newArray = filtrosSelected.filter(item => item.filtro !== filtro);

        if( !['page'].includes(filtro) ){
            newArray =  newArray.filter(item => item.filtro !== 'page');
        }

        setFiltrosSelected( newArray);

        ajaxProcesarSeleccion(newArray, false, isTabletOrMobile).then(result => {
            setParametrosURL(result.data.url);
            setTrabajadores(result.data.trabajadores);
        });

    };

    const changePagination = ({selected}) => {

        let pagina = selected + 1;

        if(pagina){

            if(filtrosSelected.some((e) => (e.filtro === 'page'))){
                addFilter('page', pagina, 'page');
            }else if(pagina > 1){
                addFilter('page', pagina, 'page');
            }

        }

    };

    const addCart = (data) => {

        const tra = {
            id: data.id,
            nombre: data.nombre,
            foto: data.foto,
            modalidad: data.modalidades,
            modalidad_id: data.modalidad_id,
            actividad: data.actividades,
            actividad_id: data.actividad_id,
            edad: data.edad,
            nacionalidad_id: data.nacionalidad_id
        };

        const newItem = [...cart, tra];

        const cartText = {
            es: "Solo puedes agregar hasta un máximo de 2 trabajadoras",
            en: "You can only add up to a maximum of 2 domestic workers",
        };

        if(cart.length > 0){

            if(cart.length >= 2){
                showAlert('error', cartText[lang])
            }else{
                setCart(newItem);
                ajaxSaveCartSeleccion(newItem);
            }

        }else{
            setCart(newItem);
            ajaxSaveCartSeleccion(newItem);
        }

    };

    const removeCart = (id) => {
        let newArray = cart.filter(item => item.id !== id);
        setCart( newArray);
        ajaxSaveCartSeleccion(newArray);
    };

    const finalizar = () => {
        ajaxFinalizarSeleccion(cart, filtrosSelected, country).then(result => {
            setShowModalRegistro(true);
        });
    };

    useEffect(() => {

        const parsed = queryString.parse(location.search);

        ajaxProcesarSeleccion(parsed, (!isEmptyObject(parsed)), isTabletOrMobile ).then(r => {
            setFiltrosSelected(r.data.filtros);
            setParametrosURL(r.data.url);
            setTrabajadores(r.data.trabajadores);
            setCart(r.data.cart);
        });

    }, [isTabletOrMobile]);


    useEffect(() => {
        ajaxVerifyDisableModalSeleccion().then(result => {
            if (result.code === true){
                setShowModalComoFunciona(false);
            }else{
                setShowModalComoFunciona(true);
            }
        })
    }, []);

    let tot = trabajadores.totalesfiltros;

    const actividades = [
        {
            name: lang === 'es'
                ? (country === 'cl' ? 'Nana' : 'Todo Servicio')
                : (country === 'cl' ? 'Nanny' : 'General domestic work'),
            value: 1,
            total: tot ? tot.todoservicio : 0,
            tooltipContent: lang === 'es'
                ? 'Limpia, lava, plancha y cocina'
                : 'Cleans, washes, irons and cooks'
        },
        {
            name: lang === 'es' ? 'Enfermería' : 'Nursing care',
            value: 3,
            total: tot ? tot.enfermeria : 0,
            tooltipContent: lang === 'es'
                ? 'Alimenta, asea y trata al paciente'
                : 'Feeds, bathes and assists the patient'
        },
        {
            name: lang === 'es'
                ? (country === 'cl' ? 'Niñera' : 'Nana')
                : 'Nanny',
            value: 6,
            total: tot ? tot.nana : 0,
            tooltipContent: lang === 'es'
                ? 'Alimenta, asea y cuida a tu niño'
                : 'Feeds, bathes and cares for your child'
        },
        {
            name: lang === 'es' ? 'Cuidado Adulto' : 'Elderly care',
            value: 10,
            total: tot ? tot.cuidadoadulto : 0,
            tooltipContent: lang === 'es'
                ? 'Alimenta, asea y cuida al adulto mayor'
                : 'Feeds, bathes and cares for the elderly'
        },
    ];

    const modalidades = [
        {
            name: lang === 'es'
                ? countryData.ca
                : 'Live-in',
            value: 1,
            total: tot ? tot.camaadentro : 0,
            tooltipContent: lang === 'es'
                ? 'Labora y vive en tu residencia'
                : 'Works and lives in your residence'
        },
        {
            name: lang === 'es'
                ? countryData.cf
                : 'Live-out',
            value: 2,
            total: tot ? tot.camaafuera : 0,
            tooltipContent: lang === 'es'
                ? 'Labora según tu horario'
                : 'Works according to your schedule'
        },
        {
            name: lang === 'es'
                ? 'Por días'
                : 'Scheduled days only',
            value: 3,
            total: tot ? tot.pordias : 0,
            tooltipContent: lang === 'es'
                ? 'Labora 1, 2, 3 o 4 veces por semana'
                : 'Works 1 to 4 days per week'
        },
    ];

    const textMarketSalary = {
        es: "Revisa los sueldos del mercado ",
        en: "Check market salaries "
    };

    const textContinue = {
        es: "Continuar",
        en: "Continue"
    };

    const textCartInfo = {
        es: 'Dale clic en “Continuar” y cuéntanos tu requerimiento, así sabrás si la trabajadora(s) que escogiste acepta tu oferta. Si no la acepta, nosotros buscaremos su reemplazo',
        en: 'Click “Continue” and tell us your requirements so we can confirm whether the domestic worker(s) you selected accept your offer. If they don’t, we will find a replacement for you.'
    };

    return (
        <>

            <section className={'pink-label-seleccion'}>
                <div>
                    {textMarketSalary[lang]} <ModalSueldos country={country} lang={lang}/>
                </div>

            </section>

            <div className="container seleccion-border-bottom">

                <div className="row">

                    <Drawer
                        width="100vw"
                        placement="right"
                        open={isVisibleDrawer}
                        onClose={closeDrawer}
                        handler={null}
                        level={null}
                    >
                        {Boolean(tokenTrabajador) && <FichaRestringidaTrabajadorIndex country={countryData.code} url={url} usuario={usuarioTrabajador} token={tokenTrabajador} isSeleccion={true} closeDrawer={closeDrawer} addCart={addCart} removeCart={removeCart} cart={cart} lang={lang}/>}
                    </Drawer>

                    <ModalIniciarSesion url={url} showModal={showModalRegistro} setShowModal={setShowModalRegistro} country={country} lang={lang}/>

                    <ModalComoFunciona url={url} country={country} showModal={showModalComoFunciona} setShowModal={setShowModalComoFunciona} closeModal={closeModalComoFunciona} lang={lang}/>

                    <div className="col-2 d-none d-md-block">
                        <Filtros filtrosSelected={filtrosSelected} add={addFilter} remove={removeFilter} actividades={actividades} modalidades={modalidades} lang={lang}/>
                    </div>

                    <div className="col-12 col-md-10">

                        <ModalMenu filtrosSelected={filtrosSelected} addFilter={addFilter} removeFilter={removeFilter} actividades={actividades} modalidades={modalidades} lang={lang}/>

                        <div className="row mx-0">

                            <div className="col-12">
                                <Totales total={trabajadores.total} cart={cart} finalizar={finalizar} country={country} lang={lang}/>
                            </div>

                            {cart.length > 0 &&
                                <>
                                    <div className="col-12">
                                        <Cart cart={cart} removeCart={removeCart} lang={lang}/>
                                    </div>

                                    {display === 'mobile' &&
                                        <div className="col-12 mt-3 btn-finalizar-seleccion-mobile">
                                            <button className="btn bertha-green-button btn-full-width btn-sm font-weight-bold btn-finalizar-seleccion" onClick={ () => finalizar() } >{textContinue[lang]}</button>
                                        </div>
                                    }

                                    <div className="col-12">
                                        <hr/>
                                    </div>

                                    <div className={'col-12 my-2 info-hover-seleccion text-gray-2 text-center'}>
                                        {textCartInfo[lang]}
                                    </div>

                                    <div className="col-12">
                                        <hr/>
                                    </div>
                                </>
                            }

                            <div className="col-12">
                                <Trabajadores url={url} trabajadores={trabajadores.items ? trabajadores.items : []} page={trabajadores.page} total={trabajadores.total} changePagination={changePagination} cart={cart} addCart={addCart} removeCart={removeCart} openDrawer={openDrawer} isTabletOrMobile={isTabletOrMobile} country={country} lang={lang}/>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
