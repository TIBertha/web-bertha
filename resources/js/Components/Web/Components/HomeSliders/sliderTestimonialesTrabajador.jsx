import React, {useEffect, useState} from "react";
import {ajaxGetTestimonialesTrabajador} from "../../../Functions/Home.jsx";
import {showAlert} from "../../../Helpers/alerts.jsx";
import Slider from "react-slick";
import LoadingScreen from "../loadingScreen.jsx";

export default function SliderTestimonialesTrabajador({url, trabajadora}) {

    const [testimoniales, setTestimoniales] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        setLoading(true);
        ajaxGetTestimonialesTrabajador().then(r => {
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
                            <h3 className="display-5 titulo text-purple responsive-title-size">{trabajadora == true ? 'Nuestras trabajadoras colocados' : 'Trabajadoras felices'}</h3>
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
