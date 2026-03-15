import React from "react";
import Mobile from "../../../../../public/img/mobile-yape.png";
import CopyButtonCB from "./copyButtonCB.jsx";

export default function CuentaBancaria({url}) {
    const urlCondiciones = url + '/condiciones';

    return (
        <div className="row px-3 px-md-5 my-md-3 my-lg-0 pt-3 pt-lg-5 pb-0 pb-xl-5 justify-content-center mx-0">
            <div className="col-12 col-xl-8 ret-a m-auto">
                <div className="row px-0 cuenta-bancaria">
                    <div className="col-12 col-xl-8 area-texto my-auto px-0">
                        <h3 className="titulo">Realiza tu pago vía transferencia bancaria o Yape</h3>
                        <h4 className="sub-titulo">Asegura tu contrato con una transferencia desde el BCP
                            o desde otro banco ¡También puedes usar Yape!
                        </h4>
                        <div className="detalles">
                            <p>Banco: BCP</p>
                            <p><CopyButtonCB bold={false} titulo={'Titular'} cuenta={'Empleos Residencial La Molina E.I.R.L.'} /></p>
                            <p><CopyButtonCB bold={false} titulo={'RUC'} cuenta={'20507645675'} /></p>
                            <p><CopyButtonCB bold={false} titulo={'N° de cuenta'} cuenta={'1932532157042'} /></p>
                            <p><CopyButtonCB bold={false} titulo={'Cuenta interbancaria (CCI)'} cuenta={'00219300253215704213'} /></p>
                            <p>o <CopyButtonCB bold={true} titulo={'Yape'} cuenta={'999256807'} /></p>
                        </div>
                        <a className="d-none d-lg-block link-condiciones" href={urlCondiciones} target="_blank">Términos y condiciones</a>
                    </div>
                    <div className="col-12 col-xl-4 area-imagen text-center text-xl-right px-0 my-xl-auto">
                        <img src={Mobile} className="w-auto"/>
                    </div>
                    <div className="col-12 d-block d-lg-none text-center py-5 px-0">
                        <a className="link-condiciones" href={urlCondiciones} target="_blank">Términos y condiciones</a>
                    </div>
                </div>
            </div>
            <div className="container d-block d-xl-none">
                <hr className="my-0"/>
            </div>
        </div>
    )
}
