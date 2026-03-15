import React, { useEffect, useState } from "react";
import ModalVideo from "../../Components/modalVideo.jsx";
import Compartir from "./Compartir/compartir.jsx";
import LikesAndViews from "./likesAndViews.jsx";

export default function UpperLabel({
    url,
    token,
    extension,
    isSeleccion,
    closeDrawer,
    retrato,
    video,
    name,
    isOpenModalVideo,
    closeModalVideo,
    openModalVideo,
}) {
    return (
        <>
            <ModalVideo
                channel="youtube"
                isOpen={isOpenModalVideo}
                url={video}
                onClose={() => closeModalVideo()}
            />

            <div
                className={
                    "row px-3 px-md-5 my-md-3 my-lg-0 py-2 justify-content-between mx-0 pink-label fix-pink-label"
                }
            >
                <div className="col-auto px-0">
                    {retrato && <img className="retrato align-middle" src={retrato} />}
                    <span className="d-none px-1 align-middle">|</span>
                    <span className="ps-2 align-middle">
                        Ficha
                        <span className="d-none d-md-inline-block mx-1">
                            Personal
                        </span>
                        : {name}
                    </span>
                </div>

                <div className="col-auto px-0 d-flex align-items-center">
                    <LikesAndViews token={token} />

                    <Compartir url={url} token={token} name={name} />

                    {isSeleccion || extension ? (
                        <i
                            className="fas fa-times icon-close-drawer ms-1 ms-md-3"
                            onClick={() => closeDrawer()}
                        ></i>
                    ) : (
                        <>
                            {video && (
                                <div
                                    className="btn white-button me-2 align-middle"
                                    role="button"
                                    onClick={() => openModalVideo(video)}
                                >
                                    <i className="fab fa-youtube"></i>
                                    <span className="d-none d-sm-inline ms-1">
                                        Ver video
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
