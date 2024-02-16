import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState({ text: null, isError: false });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage({ text: "Las contraseñas no coinciden", isError: true });
      return;
    }
    console.log(uidb64);
    console.log(token);
    try {
      const response = await fetch(
        `https://fluchetti.pythonanywhere.com/users/reset_password/confirm/${uidb64}/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password: newPassword,
            confirm_new_password: confirmNewPassword,
          }),
        }
      );

      if (!response.ok) {
        setMessage({
          text: "Error al restablecer la contraseña",
          isError: true,
        });
      } else {
        setMessage({
          text: "Contraseña cambiada exitosamente. Estas siendo redirigido",
          isError: false,
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage({
        text: "Error al restablecer la contraseña",
        isError: true,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="text-center p-4 border rounded">
        <h2 className="mb-4">Restablecer Contraseña</h2>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Nueva contraseña:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmNewPassword" className="form-label">
            Confirmar nueva contraseña:
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            className="form-control"
            required
          />
        </div>
        {message.text && (
          <div
            className={`alert mt-3 ${
              message.isError ? "alert-danger" : "alert-success"
            }`}
          >
            <p>{message.text}</p>
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Restablecer contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
