import React from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import imgEnterButton from '../../../../../../public/img/enter-button.jpg';
import imgCommaButton from '../../../../../../public/img/comma-button.png';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function TagEdades({nombrecampo, campo, labelEdad, inputTag, handleChange, handleDelete, handleAddition, handleDrag, custom}) {
    return(
        <>
            <div className="mt-4 texto-casillas">{labelEdad}<>{custom === true ? '' : <span className="sugerencia-enter ms-1">(Para separar las edades, presione Enter)</span>}</></div>
            {(custom === true) && <div className="mt-0 gray-sig">Si tienes niños, coloca sus edades y presiona la tecla <b>ENTER</b><img src={imgEnterButton} className={'imgEnterButton mx-2'}/> o la tecla <b>"," (coma)</b><img src={imgCommaButton} className={'imgEnterButton mx-2'}/> de tu teclado</div>}
            <div className="row mx-0">
                <div className="col-12 py-1 opacity-inputs my-2 texto-input tags-section edad-requerimiento">
                    <ReactTags
                        tags={campo}
                        allowUnique={false}
                        inline
                        delimiters={delimiters}
                        //handleInputChange={(e) => handleChange(e, nombrecampo, 'tags')}
                        placeholder="Agregar edad..."
                        handleDelete={(e) => handleDelete(e, nombrecampo)}
                        handleAddition={(e) => handleAddition(e, nombrecampo)}
                        handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, nombrecampo)}
                    />
                </div>
            </div>
        </>
    )
}
