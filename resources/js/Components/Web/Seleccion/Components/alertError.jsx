import React from 'react';

export default function AlertError({typeError, mensaje, closeAlert}) {
    return(
        <div className={'alert alert-dismissible fade show alert-' + typeError} role="alert">
            <>{mensaje}</>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={(e) => closeAlert(e)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
