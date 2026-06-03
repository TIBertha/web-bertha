import React, {useEffect, useState} from "react";
import {ajaxGetTestimonialesEmpleador} from "../../../Functions/Home.jsx";
import {showAlert} from "../../../Helpers/alerts.jsx";
import Slider from "react-slick";
import LoadingScreen from "../loadingScreen.jsx";
import {mobileDesktop } from "../../../Functions/General.jsx";

export default function SliderTestimonialesEmpleador({url, trabajadora}) {

    const [testimoniales, setTestimoniales] = useState([]);
    const [isLoading, setLoading] = useState(false);

    let display = mobileDesktop();
    const numberSlides = (display === "desktop" ? 3 : 1);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: numberSlides,
        slidesToScroll: numberSlides,
        adaptiveHeight: true,
    };

    useEffect(() => {
        setLoading(true);
        ajaxGetTestimonialesEmpleador().then(r => {
            if(r.code === 200){
                setTestimoniales(r.testimoniales);
                setLoading(false);
            }else if(r.code === 500){
                showAlert('error', r.msj);
            }
        }).catch(function (error) {

        });
    }, []);

    if(isLoading) return <LoadingScreen load={isLoading}/>;
    return(
        <>
            { (testimoniales.length > 0) &&

                <section className={'section-index-3'}>

                    <div className="p-3 px-md-5 m-0">

                        <div className="titulo-seccion py-2 text-center">
                            <h3 className="display-5 titulo text-purple responsive-title-size">{trabajadora == true ? 'Nuestros empleadores' : 'Clientes felices'}</h3>
                            <p className="testimonial-total text-purple responsive-description-size">({testimoniales.length} testimoniales)</p>
                        </div>

                        <div className="container slide-testimonial">
                            <Slider {...settings}>
                                {testimoniales.map( (t, key) => {
                                    return(
                                        <div className="slot">

                                            <div className="card card-testimonial shadow-sm" key={key} >
                                                <img src={t.imagen} className="card-img-top img-fluid img-testimonial-trabajador"/>

                                                <div className="numeroTestimonio">{testimoniales.length - key}</div>
                                            </div>

                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>

                    </div>
                </section>
            }
        </>
    )


}
