import React, {useState} from "react";
import parse from "html-react-parser";

export default function StepTwo({requerimiento, handleChange, semiModalidades, modalidadesHorarios, lang = 'es'}) {

    const [selectedHorario, setSelectedHorario] = useState(null);

    const handleSelect = (horarioId) => {
        setSelectedHorario(horarioId);
    };

    const st2Text = {
        es: {
            title: '2. Selecciona una modalidad de trabajo',
            subTitle: 'Escoge la opción que mejor se adapte a tu hogar'

        },
        en: {
            title: '2. Select a work modality',
            subTitle: 'Choose the option that best fits your home'
        }
    }

    console.log(requerimiento.paispedido_id);

    return (
        <div className="opacity-inputs form-group texto-formulario mb-0 no-select-text pt-3 pt-lg-0">
            <h4 className="mb-0 texto-pasos">{st2Text[lang].title}</h4>
            <div className={'secRl'}>{st2Text[lang].subTitle}</div>

            <section className="row">

                {semiModalidades.map(semi => {

                    return(
                        <div key={semi.id} className={'col-12 col-md-6 ' + semi.id}>
                            <div className={'horariosMod-group' + (semi.id === 1 ? ' mb-0' : '')}>
                                <p className={'semi_mod'}>{lang === 'en' ? semi.name : (requerimiento.paispedido_id === 49 ? semi.nombre_mx : semi.nombre)}</p>

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
                                                            {lang === 'en' ? h.name : h.nombre}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className={'col-3'}>
                                                    <div className="hm_price text-end">
                                                        {h.semimodalidad_id === 5 && (
                                                            <>
                                                                {requerimiento.paispedido_id === 49 ? '$ 500' : 'S/ 80'}
                                                                {lang === 'en' ? ' per day or ' : ' por día o '}
                                                            </>
                                                        )}

                                                        {requerimiento.paispedido_id === 49 ? '$ ' : 'S/ '}
                                                        {Number(
                                                            requerimiento.paispedido_id === 49
                                                                ? h.sueldo_mx
                                                                : h.sueldo
                                                        ).toLocaleString('en-US')}

                                                        {h.semimodalidad_id === 5 && (
                                                            lang === 'en' ? ' per month' : ' al mes'
                                                        )}
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
