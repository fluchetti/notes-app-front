import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page text-center">
      <h1 className="mt-5">Bienvenido a la Aplicación de Notas</h1>
      <p className="lead">
        Regístrate o inicia sesión para comenzar a crear y administrar tus
        notas.
      </p>
      <div className="cta-buttons mt-4">
        <button
          className="btn btn-primary mx-3"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/signup")}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
