import React, {useState, useEffect} from "react";
import {ajaxGetViews} from "../../../Functions/General.jsx";

export default function ViewsPlugin({url}) {
    const [views, setViews] = useState(0);

    useEffect(() => {

        ajaxGetViews().then(r => {
            setViews(r.views);
        });

    },[]);

    return(
        <a className="views-plugin">
            <p><i className="whatsapp-icon fas fa-eye me-2"></i>{views + ' vieron esta web'}</p>
        </a>
    )
}
