import React, {useState, useEffect} from "react";
import {ajaxGetViews} from "../../../Functions/General.jsx";

export default function ViewsPlugin({url, lang = 'es'}) {
    const [views, setViews] = useState(0);

    const viewsText = {
        es: (v) => `${v} vieron esta web`,
        en: (v) => `${v} viewed this website`,
    };

    useEffect(() => {
        ajaxGetViews().then(r => {
            setViews(r.views);
        });
    }, []);

    return(
        <a className="views-plugin">
            <p>
                <i className="whatsapp-icon fa-solid fa-heart me-2"></i>
                {viewsText[lang](views)}
            </p>
        </a>
    );
}
