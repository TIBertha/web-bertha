import React, {useEffect, useState} from "react";
import {ajaxAddLikeFicha, ajaxGetLikesAndViews, ajaxRemoveLikeFicha} from "../../../Functions/FichaTrabajador.jsx";

export default function LikesAndViews({token}) {
    const [ipAddress, setIPAddress] = useState('');
    const [likes, setLikes] = useState([]);
    const [views, setViews] = useState(0);

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(r => setIPAddress(r.ip))
            .catch(error => console.log(error))
    }, []);

    function getLikesAndViews(){
        ajaxGetLikesAndViews(token, ipAddress).then(r => {
            if(r.code === 200){
                setLikes(JSON.parse(r.likes));
                setViews(r.views);
            }
        })
    }

    function addLike(e){
        ajaxAddLikeFicha(token, ipAddress).then(r => {
            if(r.code === 200){
                setLikes(JSON.parse(r.likes));
            }
        })
    }

    function removeLike(e){
        ajaxRemoveLikeFicha(token, ipAddress).then(r => {
            if(r.code === 200){
                setLikes(JSON.parse(r.likes));
            }
        })
    }

    useEffect( () => {
        getLikesAndViews();
    }, []);

    return(
        <>
            <div className={'ButtonView me-3'}>
                {views}
                <i className="far fa-eye ms-2"></i>
            </div>
        </>
    )

}
