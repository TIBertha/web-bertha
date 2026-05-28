import React, {useEffect, useState} from 'react';
import {getWindowSize} from "../../../Functions/General.jsx";

export default function VerAntecedente({pdflink}){

    const [windowSize, setWindowSize] = useState(getWindowSize());
    let realHeight = (windowSize.innerHeight - (windowSize.innerWidth >=576 ? 96 : 64));

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return(
        <>
            <iframe className={'w-100'} style={{height:'100vh'}} src={pdflink}>
            </iframe>
        </>
    )
}
