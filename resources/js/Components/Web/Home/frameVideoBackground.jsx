import React from "react";
import {mobileDesktop} from "../../Functions/General.jsx";


export default function FrameVideoBackground({}) {

    let display = mobileDesktop();
    let movie = display === 'desktop' ? 'https://adjuntosexperta.s3.us-east-1.amazonaws.com/holabertha-home-video.mp4' : 'https://adjuntosexperta.s3.us-east-1.amazonaws.com/holabertha-home-video-mobile.mp4';
    return(
        <section className={'video-background'}>
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className={'video-element'}
                onDoubleClick={(e) => {
                    if (document.fullscreenElement) {
                        document.exitFullscreen()
                    } else {
                        e.target.requestFullscreen()
                    }
                }}
            >
                <source src={movie} type={'video/mp4'}/>
            </video>
        </section>
    )
}
