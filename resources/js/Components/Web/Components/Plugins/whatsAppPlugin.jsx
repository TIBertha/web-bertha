import React from 'react';

export default function WhatsAppPlugin({url, countryData}) {
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    return(
        <a href={'https://api.whatsapp.com/send?phone=' + countryData.whatsAppLink} target="_blank" className="whatsapp-plugin">
            <p><i className="whatsapp-icon fab fa-whatsapp"></i></p>
        </a>
    )
}
