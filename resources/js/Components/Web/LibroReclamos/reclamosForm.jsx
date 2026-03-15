import React from "react";
import { ucfirst } from "../../Helpers/strings.jsx";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";

export default function ReclamosForm({ data, handleChange, save, isLoading }) {
    return (
        <div className="claims-form-content">
            <h3 className="claims-form-content-title">
                EMPLEOS RESIDENCIAL LA MOLINA E.I.R.L.
            </h3>
            <div className="claims-form-content-direction">
                Av. La Molina 1167. Centro comercial “La Rotonda 1” - Of. 124 -
                La Molina
            </div>

            <form method="POST" onSubmit={save} className="form">
                <div className="subtitle">Datos personales</div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="nombres"
                        name="nombres"
                        value={data.nombres}
                        onChange={handleChange}
                        placeholder="Nombres"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="apellidos"
                        name="apellidos"
                        value={data.apellidos}
                        onChange={handleChange}
                        placeholder="Apellidos"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="documento"
                        name="documento"
                        value={data.documento}
                        onChange={handleChange}
                        placeholder="DNI"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        value={data.direccion}
                        onChange={handleChange}
                        placeholder="Domicilio"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="correo"
                        name="correo"
                        value={data.correo}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        value={data.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="apoderado"
                        name="apoderado"
                        value={data.apoderado}
                        onChange={handleChange}
                        placeholder="Nombres y apellidos de la madre o padre (En caso ser menor de edad)"
                    />
                </div>

                <div className="subtitle">Detalle de reclamo o queja</div>

                <div className="form-group">
                    <select
                        className="form-control"
                        id="bien"
                        name="bien"
                        value={data.bien}
                        onChange={handleChange}
                    >
                        <option key="0" value="" disabled>
                            Identificación del bien contratado
                        </option>
                        {data.bienes.map((p, index) => {
                            return (
                                <option key={index} value={p.id}>
                                    {ucfirst(p.nombre)}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <select
                        className="form-control"
                        id="tipo"
                        name="tipo"
                        value={data.tipo}
                        onChange={handleChange}
                    >
                        <option key="0" value="" disabled>
                            Quieres realizar
                        </option>
                        {data.tiposreclamos.map((p, index) => {
                            return (
                                <option key={index} value={p.id}>
                                    {ucfirst(p.nombre)}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <DatePicker
                        selected={data.fechaincidente}
                        onChange={(e) => handleChange(e, "fi")}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        scrollableYearDropdown
                        locale={es}
                        maxDate={new Date()}
                        dropdownMode="select"
                        className="form-control"
                        name="fechaincidente"
                        placeholderText="Fecha incidente"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="lugarincidente"
                        name="lugarincidente"
                        value={data.lugarincidente}
                        onChange={handleChange}
                        placeholder="Lugar del incidente"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="detalle"
                        name="detalle"
                        value={data.detalle}
                        onChange={(e) => handleChange(e, "detalle")}
                        placeholder="Detalle"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="pedido"
                        name="pedido"
                        value={data.pedido}
                        onChange={(e) => handleChange(e, "pedido")}
                        placeholder="Pedido"
                    />
                </div>

                <div className="conditions">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            name="politica"
                            checked={data.politica}
                            onChange={(e) => handleChange(e, "politica")}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                        ></label>
                    </div>

                    <p className={"ps-2"}>
                        Declaro ser el titular del servicio y acepto el
                        contenido del presente formulario manifestando bajo
                        Declaración Jurada la veracidad de los hechos descritos.
                        Empleos Residencial La Molina E.I.R.L se reserva el
                        derecho de tomar las acciones legales pertinentes en
                        caso de verificarse la falsedad inexactitud de las
                        declaraciones antes realizadas.
                    </p>
                </div>

                <div className={"py-3"}></div>

                <button
                    type="submit"
                    className="btn btn-block bertha-pink-button full-size"
                >
                    {isLoading && <i className="fas fa-sync fa-spin me-2"></i>}
                    Enviar información
                </button>
            </form>
        </div>
    );
}
