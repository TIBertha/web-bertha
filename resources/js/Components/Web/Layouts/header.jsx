import React, {useState } from "react";
import imgLogo from "../../../../../public/img/logo.png";
import { mobileDesktop } from "../../Functions/General.jsx";

export default function Header({url, path}) {
    const [isClicked, setIsClicked] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    let display = mobileDesktop();

    function setClick(e) {
        setIsClicked((prev) => !prev);
    }

    let logoTag = <img src={imgLogo} className={'logo'} alt={'Bertha - Hola Bertha - Logo'} />;

    let menuList = [
        {
            label: "Inicio",
            href: "/es-pe",
            includedPath: "es-pe",
            drowpdown: false,
            sublist: [],
            showMobile:  display === 'desktop' ? true : false,
            icon: null,
            aClass: '',
        },
        {
            label: "Seleccionar",
            href: "/es-pe/seleccionar",
            includedPath: "es-pe/seleccionar",
            drowpdown: false,
            sublist: [],
            showMobile: true,
            icon: null,
            aClass: ''
        }
    ];

    let verticalNavbar = {
        button: "btn button",
        label: "nav-label",
    };

    return(
        <header>
            <nav className={'navbar-bertha'}>
                <div className={'menu row mx-0 justify-content-between'}>
                    <div className={'col-auto p-0'}>
                        <a href={'/es-pe'}>
                            {logoTag}
                        </a>
                    </div>
                    <div className={'col-auto p-0'}>

                        <ul className={'desktop-menu'}>
                            {menuList.map((m, index) => {
                                if (m.showMobile){
                                    return (
                                        <li>
                                            <a href={m.href} className={ verticalNavbar.button + (path === m.includedPath ? " selected" : "")}>
                                                <span className={verticalNavbar.label} > {m.label} </span>
                                            </a>
                                        </li>
                                    );
                                }
                            })}

                            <li>
                                <a href={'https://api.whatsapp.com/send?phone=51999256807'} target={'_blank'}
                                   className={verticalNavbar.button + ' text-purple font-weight-bold text-decoration-underline'}>
                                    <span className={verticalNavbar.label}>Soporte</span>
                                    <i className="fa-regular fa-circle-question"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className={'col-auto p-0'}>
                        <span className={'flag-icon flag-icon-pe flag-icon-squared flag-style'} data-toggle="tooltip" data-placement="bottom" title={'Bertha disponible en Perú'}></span>
                    </div>
                </div>
            </nav>
        </header>
    )
}
