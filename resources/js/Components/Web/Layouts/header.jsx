import React from "react";
import imgLogo from "../../../../../public/img/logo.png";
import {getCountryData, mobileDesktop} from "../../Functions/General.jsx";
import ModalChangeLanguage from "./modalChangeLanguage.jsx";

export default function Header({ url, path, country = 'pe', lang = 'es' }) {

    const display = mobileDesktop();

    const headerText = {
        es: {
            home: "Inicio",
            select: "Seleccionar",
            support: "Soporte",
            countryTooltip: "Bertha disponible en Perú",
        },
        en: {
            home: "Home",
            select: "Select",
            support: "Support",
            countryTooltip: "Bertha available in Peru",
        }
    };

    const logoTag = (
        <img src={imgLogo} className="logo" alt="Bertha - Hola Bertha - Logo" />
    );

    const menuList = [
        {
            label: headerText[lang].home,
            href: `/${country}`,
            includedPath: country,
            drowpdown: false,
            sublist: [],
            showMobile:
                display === "desktop"
                    ? true
                    : path === `${country}/seleccionar`,
            show: true,
            icon: null,
            aClass: "",
        },
        {
            label: headerText[lang].select,
            href: `/${country}/seleccionar`,
            includedPath: `${country}/seleccionar`,
            drowpdown: false,
            sublist: [],
            showMobile:
                display === "desktop"
                    ? true
                    : path === country,
            show: true,
            icon: null,
            aClass: "",
        },
    ];

    const verticalNavbar = {
        button: "btn button",
        label: "nav-label",
    };

    let countryData = getCountryData(country);

    return (
        <header>
            <nav className="navbar-bertha">
                <div className="menu row mx-0 justify-content-between">

                    {/* LOGO */}
                    <div className="col-auto p-0">
                        <a href={`/${country}`}>
                            {logoTag}
                        </a>
                    </div>

                    {/* MENU */}
                    <div className="col-auto p-0">
                        <ul className="desktop-menu">
                            {menuList
                                .filter((m) => m.show && m.showMobile)
                                .map((m, index) => (
                                    <li key={index}>
                                        <a
                                            href={m.href}
                                            className={
                                                verticalNavbar.button +
                                                (path === m.includedPath
                                                    ? " selected"
                                                    : "")
                                            }
                                        >
                                            <span className={verticalNavbar.label}>
                                                {m.label}
                                            </span>
                                        </a>
                                    </li>
                                ))}

                            {/* SOPORTE */}
                            <li>
                                <a
                                    href={'https://api.whatsapp.com/send?phone=' + countryData.whatsAppLink}
                                    target="_blank"
                                    className={
                                        verticalNavbar.button +
                                        " text-purple font-weight-bold text-decoration-underline"
                                    }
                                >
                                    <span className={verticalNavbar.label}>
                                        {headerText[lang].support}
                                    </span>
                                    {display === 'desktop' &&
                                        <i className="fa-regular fa-circle-question"></i>
                                    }
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* FLAG */}
                    <div className="col-auto p-0">
                        <ModalChangeLanguage
                            url={url}
                            path={path}
                            lang={lang}
                            countryTooltip={headerText[lang].countryTooltip}
                            country={country}
                        />
                    </div>

                </div>
            </nav>
        </header>
    );
}
