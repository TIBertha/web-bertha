import React, {useState} from "react";
import parse from "html-react-parser";

export default function StepTwo({requerimiento, handleChange, semiModalidades, modalidadesHorarios}) {

    const [selectedHorario, setSelectedHorario] = useState(null);

    const handleSelect = (horarioId) => {
        setSelectedHorario(horarioId);
    };

    return (
        <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">
            <h4 className="mb-0 texto-pasos">2. Selecciona una modalidad de trabajo</h4>
            <div className={'secRl'}>Escoge la opción que mejor se adapte a tu hogar</div>

            <section className="row">

                {semiModalidades.map(semi => {

                    return(
                        <div key={semi.id} className={'col-12 col-md-6 ' + semi.id}>
                            <div className={'horariosMod-group' + (semi.id === 1 ? ' mb-0' : '')}>
                                <p className={'semi_mod'}>{semi.nombre}</p>

                                {modalidadesHorarios
                                    .filter(h => h.semimodalidad_id === semi.id)
                                    .map(h => (
                                        <div className={'hor_mod py-2'} onClick={() => handleSelect(semi.id, h.id)} >
                                            <div className={'row mx-0'}>
                                                <div className={'col-9'}>
                                                    <div className={'hm_title'}>
                                                        <label key={h.id}>
                                                            <input
                                                                type="checkbox"
                                                                checked={requerimiento.modalidadhorario_id === h.id}
                                                                onChange={() => handleChange(h.id, 'modalidadHorario', 'modalidadHorario')}
                                                                className={'me-2'}
                                                            />
                                                            {h.nombre}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className={'col-3'}>
                                                    <div className={'hm_price text-end'}>
                                                        {'S/ ' + h.sueldo + (h.semimodalidad_id === 5 ? ' al mes' : '')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            {semi.id === 1 &&
                                <div className={'secRl'}>(Esta modalidad solicita mayor sueldo por menor disponibilidad)</div>
                            }
                        </div>
                    )
                })}

            </section>

        </div>
    )
}
