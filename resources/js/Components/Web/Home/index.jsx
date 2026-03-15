import React from 'react';
import imgChicasBarra from "../../../../../public/img/new_version/bertha_principal_frame_img.png"
import FramePrincipal from "./framePrincipal.jsx";
import FrameSoyBertha from "./frameSoyBertha.jsx";
import FrameComoFunciona from "./frameComoFunciona.jsx";
import FrameContadorIndex from "./frameContadorIndex.jsx";
import FrameTuTrabajadoraDelHogar from "./frameTuTrabajadoraDelHogar.jsx";
import SliderTestimonialesEmpleador from "../Components/HomeSliders/sliderTestimonialesEmpleador.jsx";
import SliderTestimonialesTrabajador from "../Components/HomeSliders/sliderTestimonialesTrabajador.jsx";
import SliderPrensa from "../Components/HomeSliders/sliderPrensa.jsx";

export default function Index({url, num, country}){
    return(
        <>
            <FramePrincipal url={url} country={country} />

            <FrameSoyBertha url={url} country={country} />

            <FrameComoFunciona url={url} country={country} showButton={true} />

            <FrameContadorIndex num={num} country={country}/>

            <FrameTuTrabajadoraDelHogar url={url} country={country}/>

            <section>
                <div className="coustom-wave inverted border-0"></div>
                <div className="alterative-bg-gray border-0">
                    <SliderTestimonialesEmpleador url={url} trabajadora={false} />
                </div>
                <div className="coustom-wave border-0"></div>
            </section>

            <section>
                <div className="border-0">
                    <SliderTestimonialesTrabajador url={url} trabajadora={false} />
                </div>
            </section>

            <section >
                <div className="coustom-wave inverted border-0"></div>
                <div className="alterative-bg-gray border-0">
                    <SliderPrensa url={url} />
                </div>
            </section>

            <section className={'alterative-bg-gray'}>
                <div className="row text-center mx-0">
                    <div className="col-12 px-3 px-lg-0 padding-girls">
                        <img src={imgChicasBarra} className="img-chicas-pedido-tc" alt="Bertha"/>
                    </div>
                </div>
            </section>

        </>
    )
}
