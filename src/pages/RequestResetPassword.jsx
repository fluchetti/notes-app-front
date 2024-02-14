import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export const RequestResetPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const { auth, authToken } = useContext(AuthContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Post a reset_password del backend.
    fetch("http://127.0.0.1:8000/users/request_password/", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
    setForm({ email: "" });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input type="submit" value={"Enviar"} />
      </form>
    </div>
  );
};

export default RequestResetPassword;
