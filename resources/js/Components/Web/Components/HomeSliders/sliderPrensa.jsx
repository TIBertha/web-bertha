import React, {useEffect, useState} from "react";
import {ajaxGetDataPrensa} from "../../../Functions/Home.jsx";
import {showAlert} from "../../../Helpers/alerts.jsx";
import Slider from "react-slick";
import LoadingScreen from "../loadingScreen.jsx";
import {str_limit} from "../../../Helpers/strings.jsx";

export default function SliderPrensa({url}) {

    const [arPrensa, setArPrensa] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        speed: 500,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    useEffect(() => {
        setLoading(true);
        ajaxGetDataPrensa().then(r => {
            if(r.code === 200){
                setArPrensa(r.prensa);
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
            { (arPrensa.length > 0) &&

                <section className={'section-index-4'}>

                    <div className="p-3 px-md-5 m-0">

                        <div className="titulo-seccion py-2 text-center">
                            <h3 className="display-5 titulo text-purple responsive-title-size">Bertha en prensa</h3>
                            <p className="testimonial-total text-purple responsive-description-size">{'(' + arPrensa.length + ' resultados)'}</p>
                        </div>

                        <div className="container slide-testimonial">
                            <Slider {...settings}>
                                {arPrensa.map( (b, key) => {
                                    return(
                                        <div className="slot">
                                            <div className="card card-testimonial border-white">
                                                <a data-toggle="tooltip" data-placement="bottom" title={str_limit(b.titulo, 155)} href={b.fuente} target={"_blank"}>
                                                    <img src={b.logo_medio} className={'new-logo-prensa mx-auto my-2'} />
                                                </a>
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
