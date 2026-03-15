import React from 'react';
import {Loader} from 'react-loaders';

export default function LoadingMessage({color = 'pink', mensaje }) {

    let classSpinner = '';

    if(color === 'pink'){
        classSpinner = 'spinner pink';
    }else{
        classSpinner = 'spinner purple';
    }

    return (

        <div>

            <div className={classSpinner}>
                <div className="spinner__content">
                    <Loader active type="line-spin-fade-loader" color="#ffffff" className="spin-pedido"/>
                    <p className="label">{mensaje}</p>
                </div>
            </div>

        </div>

    )
}
