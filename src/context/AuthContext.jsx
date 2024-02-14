import { createContext, useEffect, useState } from "react";

const initialAuth = localStorage.getItem("Token");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [authToken, setAuthToken] = useState(initialAuth);

  useEffect(() => {
    console.log("Se renderizo la App");
    const token = localStorage.getItem("Token");
    if (token !== null) {
      setAuthToken(token);
      setAuth(true);
    } else {
      console.log("token nulo");
    }
  }, []);

  const handleLogout = () => {
    const confirm = window.confirm("Estas seguro que queres cerrar sesion?");
    if (confirm) {
      fetch("https://fluchetti.pythonanywhere.com/users/logout/", {
        method: "POST",
        headers: {
          "Content-type": "text/plain",
          Authorization: `Token ${authToken}`,
        },
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          console.log("Deslogeado con exito");
          localStorage.removeItem("Token");
          window.location.reload();
          return res.statusText;
        } else {
          console.log("Error al deslogear..");
          console.log(res.statusText);
        }
      });
    }
  };

  const data = {
    auth,
    authToken,
    setAuth,
    setAuthToken,
    handleLogout,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
