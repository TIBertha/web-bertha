import React from 'react';
import Spinner from 'react-spinner-material';

export default function LoadingScreen({load, height= '400px', color = 'purple'}) {

    const colorMap = {
        pink: '#ff0080',
        purple: '#47187D',
        white: '#ffffff',
        green: '#22AF47',
        yellow: '#ffc107',
        skblue: '#4dabf7',
        gray: '#848d91'
    };

    const spinnerColor = colorMap[color];

    return (
        <div className="d-flex align-items-center spinner-react" style={{height: height}}>
            <Spinner radius={50} color={spinnerColor} stroke={5} visible={load} />
        </div>

    );
}
