import React from 'react';
import {Loader} from 'react-loaders';

export default function LoadingSpinner({}) {
    return (
        <Loader active type="line-spin-fade-loader" color="#000" className="spin-seleccion"/>
    )
}
