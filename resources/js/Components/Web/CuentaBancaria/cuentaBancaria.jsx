import React from "react";
import Mobile from "../../../../../public/img/mobile-yape.png";
import CopyButtonCB from "./copyButtonCB.jsx";

export default function CuentaBancaria({url ,country, lang}) {
    const urlCondiciones = url + '/condiciones';

    const cuentaBancariaText = {
        es: {
            title: 'Realiza tu pago vía transferencia bancaria o Yape',
            subTitle: 'Asegura tu contrato con una transferencia desde el BCP o desde otro banco ¡También puedes usar Yape!',
            bankName: 'Banco: BCP',
            owner: 'Titular',
            ruc: 'RUC',
            account: 'N° de cuenta',
            interbankAccount: 'Cuenta interbancaria (CCI)',
            yape: 'Yape',
            tcLink: 'Términos y condiciones',
        },

        en: {
            title: 'Make your payment via bank transfer or Yape',
            subTitle: 'Secure your contract with a transfer from BCP or any other bank. You can also use Yape!',
            bankName: 'Bank: BCP (Banco de Crédito del Perú)',
            owner: 'Account holder',
            ruc: 'RUC (Peruvian taxpayer ID)',
            account: 'Account number',
            interbankAccount: 'Interbank account code (CCI)',
            yape: 'Yape',
            tcLink: 'Terms and conditions',
        }
    };

    return (
        <div className="row px-3 px-md-5 my-md-3 my-lg-0 pt-3 pt-lg-5 pb-0 pb-xl-5 justify-content-center mx-0">
            <div className="col-12 col-xl-8 ret-a m-auto">
                <div className="row px-0 cuenta-bancaria">
                    <div className="col-12 col-xl-8 area-texto my-auto px-0">
                        <h3 className="titulo">{cuentaBancariaText[lang].title}</h3>
                        <h4 className="sub-titulo">{cuentaBancariaText[lang].subTitle}</h4>
                        <div className="detalles">
                            <p>{cuentaBancariaText[lang].bankName}</p>
                            <p><CopyButtonCB bold={false} titulo={cuentaBancariaText[lang].owner} cuenta={'Empleos Residencial La Molina E.I.R.L.'} lang={lang}/></p>
                            <p><CopyButtonCB bold={false} titulo={cuentaBancariaText[lang].ruc} cuenta={'20507645675'} lang={lang}/></p>
                            <p><CopyButtonCB bold={false} titulo={cuentaBancariaText[lang].account} cuenta={'1932532157042'} lang={lang}/></p>
                            <p><CopyButtonCB bold={false} titulo={cuentaBancariaText[lang].interbankAccount} cuenta={'00219300253215704213'} lang={lang}/></p>
                            <p>{lang === 'en' ? 'or ': 'o '}<CopyButtonCB bold={true} titulo={cuentaBancariaText[lang].yape} cuenta={'999256807'} lang={lang}/></p>
                        </div>
                        <a className="d-none d-lg-block link-condiciones" href={urlCondiciones} target="_blank">{cuentaBancariaText[lang].tcLink}</a>
                    </div>
                    <div className="col-12 col-xl-4 area-imagen text-center text-xl-right px-0 my-xl-auto">
                        <img src={Mobile} className="w-auto"/>
                    </div>
                    <div className="col-12 d-block d-lg-none text-center py-5 px-0">
                        <a className="link-condiciones" href={urlCondiciones} target="_blank">{cuentaBancariaText[lang].tcLink}</a>
                    </div>
                </div>
            </div>
            <div className="container d-block d-xl-none">
                <hr className="my-0"/>
            </div>
        </div>
    )
}
