import { useState } from "react";

export const RequestResetPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const [message, setMessage] = useState({ text: null, isError: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post a reset_password del backend para que mande mail de reseteo.
    fetch("https://fluchetti.pythonanywhere.com/users/request_password/", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setMessage({
            text: `Te hemos enviado un correo de recuperación a ${form.email}. Por favor, revisa tu bandeja de entrada y también tu carpeta de spam.`,
            isError: false,
          });
        } else if (res.status === 404) {
          setMessage({
            text: "Por favor ingresa un email válido.",
            isError: true,
          });
        } else {
          setMessage({
            text: "Ocurrió un error. Por favor, inténtalo nuevamente.",
            isError: true,
          });
        }
      })
      .catch((error) => {
        setMessage({
          text: "Ocurrió un error al procesar la solicitud. Por favor, inténtalo nuevamente más tarde.",
          isError: true,
        });
      });

    setForm({ email: "" });
  };

  return (
    <div className="container text-center m-4 p-4">
      <h2 className="mb-3">Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit} className="d-inline-block">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Ingresa tu correo electrónico:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      {message.text && (
        <div
          className={`alert mt-3 ${
            message.isError ? "alert-danger" : "alert-success"
          }`}
        >
          <p>{message.text}</p>
        </div>
      )}
    </div>
  );
};

export default RequestResetPassword;
