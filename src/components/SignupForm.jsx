import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  name: "",
  last_name: "",
  password: "",
  password2: "",
};

export const SignupForm = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState({ text: null, isError: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password === form.password2) {
      delete form.password2;
      createUser(form);
      setForm(initialForm);
      setTimeout(() => {
        setMessage({ text: null, isError: false });
        navigate("/login");
      }, 3000);
    } else {
      setMessage({ text: "Las contraseñas no coinciden", isError: true });
      setForm({ ...form, password: "", password2: "" });
    }
  };

  const createUser = (formData) => {
    fetch("http://127.0.0.1:8000/users/signup/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Ocurrio un error loko", res.statusText);
        }
      })
      .then((json) => {
        console.log(json);
        setMessage({
          text: "Cuenta creada exitosamente. Estas siendo redirigido..",
          isError: false,
        });
      })
      .catch((error) => {
        console.log("Ocurrio un error ", error);
      });
  };

  return (
    <form className="mt-4 container d-flex flex-column align-items-center">
      <input
        type="email"
        placeholder="Email"
        required
        name="email"
        className="form-control m-2 w-50"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Nombre"
        name="name"
        required
        className="form-control m-2 w-50"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Apellido"
        name="last_name"
        required
        className="form-control m-2 w-50"
        value={form.last_name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Contraseña"
        name="password"
        required
        minLength={4}
        className="form-control m-2 w-50"
        value={form.password}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Confirma tu contraseña"
        name="password2"
        required
        minLength={4}
        className="form-control m-2 w-50"
        value={form.password2}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="Enviar"
        className="btn btn-primary mx-2"
        onClick={handleSubmit}
      />
      {message.text && (
        <div
          className={`alert ${
            message.isError ? "alert-danger" : "alert-success"
          } mt-3 `}
        >
          {message.text}
        </div>
      )}
    </form>
  );
};

export default SignupForm;
