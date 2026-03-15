import React from 'react';
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function SwitchTooltip({
    estilo = "",
    text = "",
    placement = "top",
    side: side = "L"
}) {
    const renderTooltip = (tooltipProps) => (
        <Tooltip id="button-tooltip" className={estilo} {...tooltipProps}>
            {text}
        </Tooltip>
    );

    return(
        <OverlayTrigger
            target={'body'}
            placement={placement}
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <div className="row mx-0 switch-struct">
                <div className={'col-6 switch-left' + (side === 'L' ? ' selected' : '')}></div>
                <div className={'col-6 switch-right' + (side === 'R' ? ' selected' : '')}></div>
            </div>
        </OverlayTrigger>
    )

}
