import { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);
  return (
    <div>
      <h3 className="text-center mt-2">Iniciar sesion</h3>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
