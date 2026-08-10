import React from "react";
import ban1 from '../../../../../public/img/ph-ban-1.png';
import ban2 from '../../../../../public/img/ph-ban-2.png';
import imgHeart from "../../../../../public/img/new_version/bertha_heart_img.png";
import AnimatedCounter from "../Components/animatedCounter.jsx";


export default function FrameContadorIndex({num, nombrePais, country, lang = 'es'}) {

    function calcDate(pastDate, lang) {

        const dt_date1 = new Date();
        const dt_pastDate = new Date(pastDate);

        const date1_time_stamp = dt_date1.getTime();
        const pastDate_time_stamp = dt_pastDate.getTime();

        let calc;

        if (date1_time_stamp > pastDate_time_stamp) {
            calc = new Date(date1_time_stamp - pastDate_time_stamp);
        } else {
            calc = new Date(pastDate_time_stamp - date1_time_stamp);
        }

        const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
        const calcFormat = calcFormatTmp.split("-");

        const days_passed = Number(Math.abs(calcFormat[0]) - 1);
        const months_passed = Number(Math.abs(calcFormat[1]) - 1);
        const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

        const dateText = {
            es: {
                year: ["año", "años"],
                month: ["mes", "meses"],
                day: ["día", "días"],
                and: "y",
                comma: ", "
            },
            en: {
                year: ["year", "years"],
                month: ["month", "months"],
                day: ["day", "days"],
                and: "and",
                comma: ", "
            }
        };

        const t = dateText[lang];

        const yearsStr =
            years_passed > 0
                ? years_passed + " " + (years_passed === 1 ? t.year[0] : t.year[1]) + t.comma
                : "";

        const monthsStr =
            months_passed > 0
                ? months_passed + " " + (months_passed === 1 ? t.month[0] : t.month[1]) + " " + t.and + " "
                : "";

        const daysStr =
            days_passed > 0
                ? days_passed + " " + (days_passed === 1 ? t.day[0] : t.day[1])
                : "";

        return (yearsStr + monthsStr + daysStr).trim();
    }

    const homeCareText = {
        es: (years) => `¡Desde hace ${years} cuidamos tu hogar con el mismo amor que lo harías tú!`,
        en: (years) => `For ${years}, we’ve cared for your home with the same love you would give it!`,
    };

    const placedWorkersText = {
        es: "trabajadoras del hogar colocadas.",
        en: "domestic workers placed.",
    };

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
                        <h2 className="responsive-title-size">
                            {homeCareText[lang](calcDate("1968-08-16", lang))}
                        </h2>

                        <AnimatedCounter num={num} />

                        <p className="mb-3">{placedWorkersText[lang]}</p>
                    </div>
                </div>
            </div>


            <div className="wg-15">

            </div>

        </section>
    );

}
