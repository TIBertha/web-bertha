import React from 'react';
import PhoneInput from "react-phone-input-2";
import esp from 'react-phone-input-2/lang/es.json';

export default function InputTelefono({labelTitle, phone, codedPhone}) {
    return(
        <div>
            { labelTitle + ':'}

            <div className="row mx-0">
                <div className="col-auto px-0">
                    <PhoneInput
                        placeholder="Ingrese el teléfono"
                        localization={esp}
                        value={atob(codedPhone)}
                        inputClass='d-none w-100 input-countrycode'
                        containerClass={'cc-react-cc py-3'}
                        enableSearch={true}
                        disabled={true}
                    />
                </div>

                <div className="col px-0 align-self-center">
                    {phone}
                </div>
            </div>

        </div>
    )
}
