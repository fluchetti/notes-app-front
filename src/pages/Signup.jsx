import { useContext, useEffect } from "react";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const Signup = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);
  return (
    <>
      <h3 className="text-center mt-3">Registrate</h3>
      <SignupForm></SignupForm>
    </>
  );
};
