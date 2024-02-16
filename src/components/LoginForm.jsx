import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const initialForm = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);
  const { setAuth, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      return;
    }
    fetch("https://fluchetti.pythonanywhere.com/users/login/", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Usuario o contraseña incorrectos.");
        }
      })
      .then((json) => {
        setMessage(null);
        setAuth(true);
        setAuthToken(json.token);
        localStorage.setItem("Token", json.token);
        navigate("/");
      })
      .catch((error) => {
        setMessage(error.message);
        setForm(initialForm);
      });
  };
  return (
    <>
      <form
        className="mt-4 container d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          name="username"
          className="form-control m-2 w-50"
          required
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contraseña"
          name="password"
          className="form-control m-2 w-50"
          required
          value={form.password}
          onChange={handleChange}
        />
        <div className="d-flex w-50 justify-content-between">
          <input
            type="submit"
            value="Iniciar sesión"
            className="btn btn-primary flex-fill mx-1"
          />
          <input
            type="button"
            value="Olvide mi contraseña"
            className="btn btn-primary flex-fill mx-1"
            onClick={() => navigate("/reset")}
          />
        </div>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
      </form>
    </>
  );
};

export default LoginForm;
