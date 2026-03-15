import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default function TooltipDisponibilidad({
  estilo = "",
  text = "",
  placement = "top",
  icon = "fa-solid fa-circle-info",
  additionalIconClass,
  children
}) {
    const renderTooltip = (tooltipProps) => (
        <Tooltip id="button-tooltip" className={estilo} {...tooltipProps}>
            {text}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            {children ? (
                children
            ) : (
                <i className={`${icon} icon-action icon-question m-2 ${additionalIconClass}`}></i>
            )}

        </OverlayTrigger>
    );
}
