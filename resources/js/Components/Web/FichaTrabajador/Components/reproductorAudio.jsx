import React, { useRef } from "react";
import ReactAudioPlayer from "react-audio-player";

export default function ReproductorAudio({ audio, listaudio }) {
    const playerRef = useRef(null);

    const onPlay = () => {
        if (!listaudio) return;

        listaudio.forEach((id) => {
            if (id !== audio) {
                const other = document.getElementById(id);
                if (other) other.pause();
            }
        });
    };

    return (
        <ReactAudioPlayer
            id={audio}
            src={audio}
            controls
            controlsList="nodownload"
            className="no-border-audio no-box-shadow w-100"
            onPlay={onPlay}
            ref={playerRef}
        />
    );
};
