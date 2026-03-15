import React from 'react';

export default function SuccessMessage({url,typeform}) {

    function redireccion(e) {
        window.location.href = url + '/busco-trabajo'
    }
    const texto = typeform ? 'Gracias por confiar en Bertha. En breve revisaremos tu currículo y te conseguiremos un empleo.' : 'Gracias por confiar en Bertha. En breve revisaremos tu currículo y te conseguiremos un empleo.';

    return (
        <section className="confirmar-registro-postulante-form">
            <div className="confirmar-requerimiento-form-content">
                <div>

                    <h1 className="confirmar-requerimiento-title-form"><i className="fas fa-check-circle icon-success me-2"></i>Registro Exitoso</h1>

                    <hr/>

                    <p className="mb-4 mt-3">{texto}</p>

                    <div className="row mb-3">

                        <div className="col-12">
                            <button className="btn btn-purple btn-block font-weight-bold" type="button" onClick={(e) => redireccion(e)}>Ok</button>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}
