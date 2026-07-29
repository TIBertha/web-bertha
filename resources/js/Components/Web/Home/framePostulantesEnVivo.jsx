import React, {useEffect, useState} from "react";
import {ajaxGetPostulantesSlider} from "../../Functions/Home.jsx";
import {showAlert} from "../../Helpers/alerts.jsx";
import Slider from 'react-slick';
import {getWindowSize, mobileDesktop} from "../../Functions/General.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FramePostulantesEnVivo({url, country}) {

    let display = mobileDesktop();
    const [postulantes, setPostulantes] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const width = windowSize.innerWidth;

    let numberSlides;

    if (width <= 424) {
        numberSlides = 1;
    } else if (width <= 576) {
        numberSlides = 2;
    } else if (width <= 768) {
        numberSlides = 3;
    } else if (width <= 992) {
        numberSlides = 4;
    } else if (width <= 1200) {
        numberSlides = 6;
    } else if (width >= 1201) {
        numberSlides = 8;
    }

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 15000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        slidesToShow: numberSlides,
        slidesToScroll: numberSlides,
        pauseOnHover: true,
        swipeToSlide: true,
    };

    useEffect(() => {

        setLoading(true);

        ajaxGetPostulantesSlider().then(r => {
            if(r.code === 200){
                setPostulantes(r.data);

                r.data.forEach(p => {
                    const img = new Image();
                    img.src = p.foto;
                });

                setLoading(false);
            }else if(r.code === 500){
                showAlert('error', r.msj);
            }
        }).catch(function (error) {

        });
    }, []);
    return(
        <>
            {(postulantes.length > 0) &&
                <div className={'row mx-0'}>
                    <div className={'bertha-section-padding'}>
                        <div className={'col-12'}>
                            <div className={'postulantesenvivo-title'}>
                                <span className="green-dot me-2"></span>
                                <span className={'pev-title'}>Postulantes en vivo</span>
                            </div>
                        </div>
                        <div className={'col-12 centerSlider'}>
                            <div className="container slide-postulanteenvivo py-0">
                                <Slider {...settings}>
                                    {postulantes.map( (p, key) => {
                                        return(
                                            <div className="slot">

                                                <div className="card card-postulanteenvivo shadow-sm" key={key} >
                                                    <div className={'row mx-0'}>
                                                        <div className={'col-auto px-0'}>
                                                            <img src={p.foto} className="card-img-top img-fluid img-testimonial-trabajador" loading="lazy" alt=""/>
                                                        </div>
                                                        <div className={'col px-0 vertical-align text-purple card-name'}>
                                                            {p.nombres}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>

                        <div className={'col-12 centerSlider'}>
                            <div className='py-2'>
                                <a className='btn-size btn btn-lg bertha-pink-button font-weight-bold no-box-shadow mt-0 btn-full-width' href={url + '/es-' + country + '/seleccionar'}>Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}
