import React from 'react';
import Select, { components } from "react-select";

// =====================
// Custom Components
// =====================

const MenuComponent = props => (
    <components.Menu {...props} className="bordered" />
);

const ControlComponent = props => (
    <components.Control {...props} className="select-form-req req-form-select is-arrow no-box-shadow boton-height-50" />
);

const InputComponent = props => (
    <components.Input {...props} className="input-normal-font w-100" />
);

const SingleValueComponent = props => (
    <components.SingleValue {...props} className="distrito-placeholder-select" />
);

const PlaceholderComponent = props => (
    <components.Placeholder {...props} className="requerimiento-placeholder-select" />
);

const SelectContainerComponent = props => (
    <components.SelectContainer {...props} className="no-box-shadow bordered" />
);

const OptionComponent = props => (
    <components.Option {...props} className="distrito-select-menu hover-select-menu bordered" />
);

const MenuListComponent = props => (
    <components.MenuList {...props} className="distrito-select-menu py-0" />
);

const ValueComponent = props => (
    <components.ValueContainer {...props} className="no-box-shadow boton-height-50 font-select-component" />
);

// =====================
// Component Mapping
// =====================

const customComponents = {
    IndicatorsContainer: () => null,
    Control: ControlComponent,
    ValueContainer: ValueComponent,
    MenuList: MenuListComponent,
    Option: OptionComponent,
    Placeholder: PlaceholderComponent,
    SingleValue: SingleValueComponent,
    Input: InputComponent,
    SelectContainer: SelectContainerComponent,
    Menu: MenuComponent
};

// =====================
// Main Component
// =====================

export default function SelectFormExterno({
  value = null,
  isMulti = false,
  isDisabled = false,
  isSearchable = false,
  placeholder = '',
  opciones = [],
  nombrecampo = '',
  llave = '',
  tipocampo = '',
  handleChange,
  requerimiento
}) {

    return (
        <Select
            value={value}
            isMulti={isMulti}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
            onChange={(e) => handleChange(e, nombrecampo, tipocampo, llave, requerimiento)}
            options={opciones}
            placeholder={placeholder}
            components={customComponents}
            theme={theme => ({
                ...theme,
                borderRadius: 4,
                boxShadow: 2,
                '&:hover': {
                    border: 2,
                    borderRadius: 4,
                },
                colors: {
                    ...theme.colors,
                    primary50: '#CFCECE',
                    primary25: '#E6E5E5',
                    primary: '#47187D',
                },
            })}
        />
    );
}
