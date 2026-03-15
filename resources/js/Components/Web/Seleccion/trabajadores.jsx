import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ModalVideo from "../Components/modalVideo.jsx";
import TrabajadorCard from "./trabajadorCard.jsx";

export default function Trabajadores({
    url,
    trabajadores,
    page,
    total,
    changePagination,
    cart,
    addCart,
    removeCart,
    openDrawer,
    isTabletOrMobile,
    country,
}) {
    let cantidadPaginas = Math.ceil(
        (total ? total : 0) / (isTabletOrMobile ? 8 : 9),
    );

    const [isOpenVideoYoutube, setIsOpenVideoYoutube] = useState(false);
    const [video, setVideo] = useState("");

    const openVideoYoutube = (video) => {
        setIsOpenVideoYoutube(true);
        setVideo(video);
    };

    const closeVideoYoutube = () => {
        setIsOpenVideoYoutube(false);
        setVideo("");
    };

    return (
        <>
            {trabajadores.length > 0 ? (
                <div className="d-flex flex-wrap mb-md-4">
                    <ModalVideo
                        channel="youtube"
                        isOpen={isOpenVideoYoutube}
                        url={video}
                        onClose={() => closeVideoYoutube()}
                    />

                    {trabajadores.map((data, key) => (
                        <TrabajadorCard
                            key={key}
                            data={data}
                            cart={cart}
                            addCart={addCart}
                            removeCart={removeCart}
                            openVideoYoutube={openVideoYoutube}
                            openDrawer={openDrawer}
                            country={country}
                        />
                    ))}

                    <div className="py-4 ps-2 col-12 text-center">
                        <nav aria-label="Page navigation">
                            <ReactPaginate
                                pageCount={cantidadPaginas}
                                initialPage={page ? page - 1 : 0}
                                forcePage={page ? page - 1 : 0}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                previousLabel={"Previo"}
                                nextLabel={"Siguiente"}
                                containerClassName="pagination pagination-sm pagination-seleccion mb-0"
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageClassName="page-item"
                                previousClassName="page-item"
                                nextClassName="page-item"
                                pageLinkClassName="page-link"
                                previousLinkClassName="page-link"
                                nextLinkClassName="page-link"
                                activeClassName="active"
                                onPageChange={(data) => changePagination(data)}
                            />
                        </nav>
                    </div>
                </div>
            ) : (
                <div className="d-flex align-items-center">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center"></div>

                        <div className="col-12 text-center seleccion-title-empty-data mt-5">
                            No existen trabajadoras
                        </div>
                        <div className="col-12 text-center seleccion-parrafo-empty-data">
                            Si quieres ver más resultados intente con otros
                            filtros.
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
