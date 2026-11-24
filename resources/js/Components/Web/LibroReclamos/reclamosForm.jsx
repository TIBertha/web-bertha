import React from "react";
import { ucfirst } from "../../Helpers/strings.jsx";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import en from "date-fns/locale/en-US";

export default function ReclamosForm({
                                         data,
                                         handleChange,
                                         save,
                                         isLoading,
                                         lang = "es",
                                         country = "pe",
                                     }) {
    const isMexico = country === "mx";

    const empresa = isMexico
        ? "Bertha México"
        : "Empleos Residencial La Molina E.I.R.L.";

    const reclamosForm = {
        es: {
            titulo1: "Datos personales",

            titulo2: isMexico
                ? "Detalle de la reclamación o queja"
                : "Detalle de reclamo o queja",

            address: isMexico
                ? null
                : 'Av. La Molina 1167. Centro comercial "La Rotonda 1" - Of. 124 - La Molina',

            campoNombres: "Nombres",
            campoApellidos: "Apellidos",
            campoDocumento: "Número documento",
            campoDomicilio: "Domicilio",
            campoCorreo: "Correo electrónico",
            campoTelefono: "Teléfono",
            campoApoderado: "Nombres y apellidos de la madre o padre (En caso ser menor de edad)",
            inputBien: "Identificación del bien contratado",
            inputReclamo: "Quieres realizar",
            campoFechaInc: "Fecha incidente",
            campoLugarInc: "Lugar del incidente",
            campoDetalles: "Detalles",
            campoPedido: "Pedido",

            textPolitica: `Declaro ser el titular del servicio y acepto el contenido del presente formulario manifestando bajo Declaración Jurada la veracidad de los hechos descritos. ${empresa} se reserva el derecho de tomar las acciones legales pertinentes en caso de verificarse la falsedad o inexactitud de las declaraciones antes realizadas.`,

            button: "Enviar información",
        },

        en: {
            titulo1: "Personal information",

            titulo2: isMexico
                ? "Claim or complaint details"
                : "Complaint or claim details",

            address: isMexico
                ? null
                : "1167 La Molina Av Unit 124, La Molina, Lima",

            campoNombres: "First name",
            campoApellidos: "Last name",
            campoDocumento: "ID number",
            campoDomicilio: "Home address",
            campoCorreo: "Email",
            campoTelefono: "Phone number",
            campoApoderado: "Full name of mother or father (If the user is a minor)",
            inputBien: "Identification of the contracted service or product",
            inputReclamo: "You want to submit",
            campoFechaInc: "Incident date",
            campoLugarInc: "Incident location",
            campoDetalles: "Details",
            campoPedido: "Request",

            textPolitica: `I declare that I am the owner of the service and accept the content of this form, declaring under oath that the facts described are true. ${empresa} reserves the right to take appropriate legal action if any false or inaccurate statements are verified.`,

            button: "Submit information",
        },
    };

    const t = reclamosForm[lang] || reclamosForm.es;

    return (
        <div className="claims-form-content">

            <h3 className="claims-form-content-title">
                {empresa.toUpperCase()}
            </h3>

            {t.address && (
                <div className="claims-form-content-direction">
                    {t.address}
                </div>
            )}

            <form
                method="POST"
                onSubmit={save}
                className="form"
            >

                <div className="subtitle">
                    {t.titulo1}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="nombres"
                        name="nombres"
                        value={data.nombres}
                        onChange={handleChange}
                        placeholder={t.campoNombres}
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
                        placeholder={t.campoApellidos}
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
                        placeholder={t.campoDocumento}
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
                        placeholder={t.campoDomicilio}
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
                        placeholder={t.campoCorreo}
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
                        placeholder={t.campoTelefono}
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
                        placeholder={t.campoApoderado}
                    />
                </div>

                <div className="subtitle">
                    {t.titulo2}
                </div>

                <div className="form-group">
                    <select
                        className="form-control"
                        id="bien"
                        name="bien"
                        value={data.bien}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            {t.inputBien}
                        </option>

                        {data.bienes.map((p) => (
                            <option key={p.id} value={p.id}>
                                {ucfirst(p.nombre)}
                            </option>
                        ))}

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
                        <option value="" disabled>
                            {t.inputReclamo}
                        </option>

                        {data.tiposreclamos.map((p) => (
                            <option key={p.id} value={p.id}>
                                {ucfirst(p.nombre)}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="form-group">
                    <DatePicker
                        selected={data.fechaincidente || null}
                        onChange={(e) => handleChange(e, "fi")}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        scrollableYearDropdown
                        locale={lang === "en" ? en : es}
                        maxDate={new Date()}
                        dropdownMode="select"
                        className="form-control"
                        name="fechaincidente"
                        placeholderText={t.campoFechaInc}
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
                        placeholder={t.campoLugarInc}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="detalle"
                        name="detalle"
                        value={data.detalle}
                        onChange={(e) => handleChange(e, "detalle")}
                        placeholder={t.campoDetalles}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="pedido"
                        name="pedido"
                        value={data.pedido}
                        onChange={(e) => handleChange(e, "pedido")}
                        placeholder={t.campoPedido}
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

                    <p className="ps-2">
                        {t.textPolitica}
                    </p>

                </div>

                <div className="py-3"></div>

                <button
                    type="submit"
                    className="btn btn-block bertha-pink-button full-size"
                    disabled={isLoading}
                >
                    {isLoading && (
                        <i className="fas fa-sync fa-spin me-2"></i>
                    )}

                    {t.button}
                </button>

            </form>

        </div>
    );
}
