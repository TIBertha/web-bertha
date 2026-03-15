import React from "react";

export default function CircledHr({num = 15})  {
    let y = [];
    for (let i = 0; i < num; i++) {
        y.push(<i className='fas fa-circle'></i>);
    }
    return(
        <div className="personalized-hr text-pink mb-4" data-aos="fade-right" data-aos-duration="10000">
            {y}
        </div>
    )
}
