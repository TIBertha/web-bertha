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
        },
        {
            label: "Seleccionar",
            href: "/es-pe/seleccionar",
            includedPath: "seleccionar",
            drowpdown: false,
            sublist: [],
        },
        {
            label: "Busco Trabajo",
            href: "/es-pe/busco-trabajo",
            includedPath: "busco-trabajo",
            drowpdown: false,
            sublist: [],
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
                        {(display === 'desktop') &&
                            logoTag
                        }

                        {(display === 'mobile') &&
                            <div className={'responsive-button'}>
                                <i className={( isClicked ? "fa-solid fa-xmark" : "fa-solid fa-bars") + " finger-action" } onClick={(e) => setClick(e)}></i>
                            </div>
                        }

                    </div>
                    <div className={'col-auto p-0'}>
                        {(display === 'desktop') &&
                            <ul className={'desktop-menu'}>
                                {menuList.map((m, index) => {
                                        return (
                                            <li>
                                                <a href={m.href} className={ verticalNavbar.button + (path.includes( m.includedPath) ? " selected" : "")}>
                                                    <span className={verticalNavbar.label} > {m.label} </span>
                                                </a>
                                            </li>
                                        );
                                })}
                            </ul>
                        }

                        {(display === 'mobile') &&
                            logoTag
                        }
                    </div>
                    <div className={'col-auto p-0'}>
                        <span className={'flag-icon flag-icon-pe flag-icon-squared flag-style'} data-toggle="tooltip" data-placement="bottom" title={'Bertha disponible en Perú'}></span>
                    </div>
                </div>

                <div className={'overlay animated fadeIn responsive-sidebar' + (isClicked ? ' open' : ' close')}>
                    <div className={'sidepanel'}>
                        <ul className={'mobile-menu'}>
                            {menuList.map((m, index) => {
                                return (
                                    <li>
                                        <a href={m.href} className={ verticalNavbar.button + (path.includes( m.includedPath) ? " selected" : "")}>
                                            <span className={verticalNavbar.label} > {m.label} </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
