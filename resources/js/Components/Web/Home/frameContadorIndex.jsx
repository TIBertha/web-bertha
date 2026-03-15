import React from "react";
import ban1 from '../../../../../public/img/ph-ban-1.png';
import ban2 from '../../../../../public/img/ph-ban-2.png';
import imgHeart from "../../../../../public/img/new_version/bertha_heart_img.png";
import AnimatedCounter from "../Components/animatedCounter.jsx";


export default function FrameContadorIndex({num, nombrePais, country}) {

    function calcDate(pastDate){
        /*
        * calcDate() : Calculates the difference between two dates
        * @date1 : "First Date in the format MM-DD-YYYY"
        * @pastDate : "Second Date in the format MM-DD-YYYY"
        * return : Array
        */
        //new date instance
        const dt_date1 = new Date();
        const dt_pastDate = new Date(pastDate);

        //Get the Timestamp
        const date1_time_stamp = dt_date1.getTime();
        const pastDate_time_stamp = dt_pastDate.getTime();

        let calc;

        //Check which timestamp is greater
        if (date1_time_stamp > pastDate_time_stamp) {
            calc = new Date(date1_time_stamp - pastDate_time_stamp);
        } else {
            calc = new Date(pastDate_time_stamp - date1_time_stamp);
        }
        //Retrieve the date, month and year
        const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
        //Convert to an array and store
        const calcFormat = calcFormatTmp.split("-");
        //Subtract each member of our array from the default date
        const days_passed = Number(Math.abs(calcFormat[0]) - 1);
        const months_passed = Number(Math.abs(calcFormat[1]) - 1);
        const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

        //Set up custom text
        const yrsTxt = ["año", "años"];
        const mnthsTxt = ["mes", "meses"];
        const daysTxt = ["día", "días"];

        //Convert to days and sum together
        const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;

        //display result with custom text
        const result =
            ((years_passed == 1) ? years_passed + ', ' + yrsTxt[0] + ' ' : (years_passed > 1) ? years_passed + ' ' + yrsTxt[1] + ', ' : '') +
            ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ? months_passed + ' ' + mnthsTxt[1] + ' y ' : '') +
            ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ? days_passed + ' ' + daysTxt[1] : '');

        //return the result
        return result.trim()
    }


    let contadorText = 'trabajadoras del hogar colocadas.';

    return(
        <section className="frame-contador-index mt-3">

            <div className="wg-25 wg-top row mx-0">
                <div className="col-12 col-lg-6 mb-4">
                    <img src={ban1} alt="Bertha │ Por Horas"/>
                </div>
                <div className="col-6 d-none d-lg-block mb-4">
                    <img src={ban2} alt="Bertha │ Por Horas"/>
                </div>
            </div>

            <div className="wg-60 row mx-0 alterative-bg-gray">

                <div className="col-12 col-lg-5 px-0 text-center">
                    <img src={imgHeart} alt="Bertha │ Por Horas"/>
                </div>

                <div className="col-12 col-lg-7 px-0 counter-div">
                    <div className="px-0 px-lg-5">
                        <h2 className="responsive-title-size">{'¡Desde hace ' + (calcDate('1968-08-16')) +' cuidamos tu hogar con el mismo amor que lo harías tú!'}</h2>

                        <AnimatedCounter num={num}/>

                        <p className="mb-0 mb-lg-2">{contadorText}</p>

                    </div>
                </div>
            </div>


            <div className="wg-15">

            </div>

        </section>
    );

}
