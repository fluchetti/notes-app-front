import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Las contraseñas no coinciden");
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
        throw new Error("Error al restablecer la contraseña");
      } else {
        navigate("/");
      }

      // Manejar el éxito del restablecimiento de contraseña
      // Redirigir a una página de éxito o mostrar un mensaje al usuario
    } catch (error) {
      setErrorMessage("Error al restablecer la contraseña");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword">Nueva contraseña:</label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        required
      />
      <label htmlFor="confirmNewPassword">Confirmar nueva contraseña:</label>
      <input
        type="password"
        id="confirmNewPassword"
        value={confirmNewPassword}
        onChange={(event) => setConfirmNewPassword(event.target.value)}
        required
      />
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Restablecer contraseña</button>
    </form>
  );
};

export default ResetPasswordForm;
