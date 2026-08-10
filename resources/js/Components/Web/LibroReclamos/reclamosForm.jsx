import React from "react";
import { ucfirst } from "../../Helpers/strings.jsx";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";

export default function ReclamosForm({ data, handleChange, save, isLoading, lang = 'es' }) {

    const reclamosForm = {
        es: {
            titulo1: 'Datos personales',
            titulo2: 'Detalle de reclamo o queja',
            address: 'Av. La Molina 1167. Centro comercial “La Rotonda 1” - Of. 124 - La Molina',
            campoNombres: 'Nombres',
            campoApellidos: 'Apellidos',
            campoDocumento: 'Número documento',
            campoDomicilio: 'Domicilio',
            campoCorreo: 'Correo eletrónico',
            campoTelefono: 'Teléfono',
            campoApoderado: 'Nombres y apellidos de la madre o padre (En caso ser menor de edad)',
            inputBien: 'Identificación del bien contratado',
            inputReclamo: 'Quieres realizar',
            campoFechaInc: 'Fecha incidente',
            campoLugarInc: 'Lugar del incidente',
            campoDetalles: 'Detalles',
            campoPedido: 'Pedido',
            textPolitica: 'Declaro ser el titular del servicio y acepto el contenido del presente formulario manifestando bajo Declaración Jurada la veracidad de los hechos descritos. Empleos Residencial La Molina E.I.R.L se reserva el derecho de tomar las acciones legales pertinentes en caso de verificarse la falsedad inexactitud de las declaraciones antes realizadas.',
            button: 'Enviar información'
        },

        en: {
            titulo1: 'Personal information',
            titulo2: 'Complaint or claim details',
            address: '1167 La Molina Av Unit 124, La Molina, Lima',
            campoNombres: 'First name',
            campoApellidos: 'Last name',
            campoDocumento: 'ID number',
            campoDomicilio: 'Home address',
            campoCorreo: 'E-mail',
            campoTelefono: 'Phone number',
            campoApoderado: 'Full name of mother or father (If the user is a minor)',
            inputBien: 'Identification of the contracted service or product',
            inputReclamo: 'You want to submit',
            campoFechaInc: 'Incident date',
            campoLugarInc: 'Incident location',
            campoDetalles: 'Details',
            campoPedido: 'Request',
            textPolitica: 'I declare that I am the owner of the service and accept the content of this form, stating under Affidavit the truthfulness of the facts described. Empleos Residencial La Molina E.I.R.L reserves the right to take appropriate legal action if any false or inaccurate statements are verified.',
            button: 'Submit information'
        }
    };

    return (
        <div className="claims-form-content">
            <h3 className="claims-form-content-title">
                EMPLEOS RESIDENCIAL LA MOLINA E.I.R.L.
            </h3>
            <div className="claims-form-content-direction">{reclamosForm[lang].address}</div>

            <form method="POST" onSubmit={save} className="form">
                <div className="subtitle">{reclamosForm[lang].titulo1}</div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="nombres"
                        name="nombres"
                        value={data.nombres}
                        onChange={handleChange}
                        placeholder={reclamosForm[lang].campoNombres}
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
                        placeholder={reclamosForm[lang].campoApellidos}
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
                        placeholder={reclamosForm[lang].campoDocumento}
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
                        placeholder={reclamosForm[lang].campoDomicilio}
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
                        placeholder={reclamosForm[lang].campoCorreo}
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
                        placeholder={reclamosForm[lang].campoTelefono}
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
                        placeholder={reclamosForm[lang].campoApoderado}
                    />
                </div>

                <div className="subtitle">{reclamosForm[lang].titulo2}</div>

                <div className="form-group">
                    <select
                        className="form-control"
                        id="bien"
                        name="bien"
                        value={data.bien}
                        onChange={handleChange}
                    >
                        <option key="0" value="" disabled>{reclamosForm[lang].inputBien}</option>
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
                        <option key="0" value="" disabled>{reclamosForm[lang].inputReclamo}</option>
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
                        placeholderText={reclamosForm[lang].campoFechaInc}
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
                        placeholder={reclamosForm[lang].campoLugarInc}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="detalle"
                        name="detalle"
                        value={data.detalle}
                        onChange={(e) => handleChange(e, "detalle")}
                        placeholder={reclamosForm[lang].campoDetalles}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="pedido"
                        name="pedido"
                        value={data.pedido}
                        onChange={(e) => handleChange(e, "pedido")}
                        placeholder={reclamosForm[lang].campoPedido}
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

                    <p className={"ps-2"}>{reclamosForm[lang].textPolitica}</p>
                </div>

                <div className={"py-3"}></div>

                <button type="submit" className="btn btn-block bertha-pink-button full-size" >
                    {isLoading && <i className="fas fa-sync fa-spin me-2"></i>}
                    {reclamosForm[lang].button}
                </button>
            </form>
        </div>
    );
}
