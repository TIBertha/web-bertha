import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import Swal from "sweetalert2";
import Drawer from 'rc-drawer';
import { useMediaQuery } from 'react-responsive';
import {ajaxFinalizarSeleccion, ajaxProcesarSeleccion, ajaxSaveCartSeleccion} from "../../Functions/Seleccion.jsx";
import {ajaxVerifyDisableModalSeleccion} from "../../Functions/Home.jsx";
import {getCountryData} from "../../Functions/General.jsx";
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

const isValidoTrabajadorForAddCart = (cart, newData) => {

    const valido = cart.map(tra => {
        if (!tra.modalidad_id.some(m => newData.modalidad_id.includes(m))) return false;
        if (!tra.actividad_id.some(a => newData.actividad_id.includes(a))) return false;
    });

    return valido.every(v => v === true);
};

export default function Seleccion({url,session, country}) {
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

        const tra = {id: data.id, nombre: data.nombre, foto: data.foto, modalidad: data.modalidades, modalidad_id: data.modalidad_id, actividad: data.actividades, actividad_id: data.actividad_id, edad: data.edad, nacionalidad_id: data.nacionalidad_id };

        const newItem = [...cart, tra];

        if(cart.length > 0){

            if(cart.length >= 2){
                showAlert('error', 'Solo puedes agregar hasta un máximo de 2 trabajadores')
            }else{

                if(isValidoTrabajadorForAddCart(cart, tra)){
                    setCart(newItem);
                    ajaxSaveCartSeleccion(newItem);
                }else{

                    Swal.fire({
                        title: '<i class="fas fa-exclamation-circle icon-warning"></i>',
                        text: 'El trabajador que deseas agregar no es de la misma actividad y/o modalidad de los que están en tu carrito.  Si deseas agregarlo, tu selección anterior se borrará. ¿Estás de acuerdo?',
                        showCancelButton: true,
                        cancelButtonText: 'No',
                        confirmButtonColor: '#ff0080',
                        confirmButtonText: 'Si'
                    }).then((result) => {

                        if (result.value) {
                            setCart([tra]);
                            ajaxSaveCartSeleccion([tra]);
                        }

                    });

                }

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

    let actividades = [
        {name: (country === 'cl' ? 'Nana' : 'Todo Servicio'), value: 1, total: (tot ? tot.todoservicio : 0), tooltipContent: 'Limpia, lava, plancha y cocina'},
        {name: ('Enfermería'), value: 3, total: (tot ? tot.enfermeria : 0), tooltipContent: 'Alimenta, asea y trata al paciente'},
        {name: (country === 'cl' ? 'Niñera' :'Nana'), value: 6, total: (tot ? tot.nana : 0), tooltipContent: 'Alimenta, asea y cuida a tu niño'},
        {name: ('Cuidado Adulto'), value: 10, total: (tot ? tot.cuidadoadulto : 0), tooltipContent: 'Alimenta, asea y cuida al adulto mayor'},
    ];

    let modalidades = [
        {name: countryData.ca, value: 1, total: (tot ? tot.camaadentro : 0), tooltipContent: 'Labora y vive en tu residencia'},
        {name: countryData.cf, value: 2, total: (tot ? tot.camaafuera : 0), tooltipContent: 'Labora según tu horario'},
        {name: ('Por días'), value: 3, total: (tot ? tot.pordias : 0), tooltipContent: 'Labora  1, 2, 3 o 4 veces por semana'},
    ];

    return (
        <>

            <section className={'pink-label-seleccion'}>
                <div>
                    Revisa los sueldos del mercado <ModalSueldos country={country} />
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
                        {Boolean(tokenTrabajador) && <FichaRestringidaTrabajadorIndex country={countryData.code} url={url} usuario={usuarioTrabajador} token={tokenTrabajador} isSeleccion={true} closeDrawer={closeDrawer} addCart={addCart} removeCart={removeCart} cart={cart} />}
                    </Drawer>

                    <ModalIniciarSesion url={url} showModal={showModalRegistro} setShowModal={setShowModalRegistro} country={country}/>

                    <ModalComoFunciona url={url} country={country} showModal={showModalComoFunciona} setShowModal={setShowModalComoFunciona} closeModal={closeModalComoFunciona}/>

                    <div className="col-2 d-none d-md-block">
                        <Filtros filtrosSelected={filtrosSelected} add={addFilter} remove={removeFilter} actividades={actividades} modalidades={modalidades}/>
                    </div>

                    <div className="col-12 col-md-10">

                        <ModalMenu filtrosSelected={filtrosSelected} addFilter={addFilter} removeFilter={removeFilter} actividades={actividades} modalidades={modalidades} />

                        <div className="row">

                            <div className="col-12">
                                <Totales total={trabajadores.total} cart={cart} finalizar={finalizar} country={country}/>
                            </div>

                            {cart.length > 0 &&
                                <>
                                    <div className="col-12">
                                        <Cart cart={cart} removeCart={removeCart} />
                                    </div>

                                    <div className="col-12 mt-3 btn-finalizar-seleccion-mobile">
                                        <button className="btn bertha-pink-button btn-block font-weight-bold" onClick={ () => finalizar() } >Finalizar</button>
                                    </div>

                                    <div className="col-12">
                                        <hr/>
                                    </div>

                                    <div className={'col-12 my-2 info-hover-seleccion text-gray-2 text-center'}>
                                        Dale clic en “Continuar” y cuéntanos tu requerimiento, así sabrás si la trabajadora(s) que escogiste acepta tu oferta. Si no la acepta, nosotros buscaremos su reemplazo
                                    </div>

                                    <div className="col-12">
                                        <hr/>
                                    </div>
                                </>
                            }

                            <div className="col-12">
                                <Trabajadores url={url} trabajadores={trabajadores.items ? trabajadores.items : []} page={trabajadores.page} total={trabajadores.total} changePagination={changePagination} cart={cart} addCart={addCart} removeCart={removeCart} openDrawer={openDrawer} isTabletOrMobile={isTabletOrMobile} country={country}/>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
