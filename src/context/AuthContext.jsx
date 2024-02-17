import { createContext, useEffect, useState } from "react";

const initialAuth = localStorage.getItem("Token");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [authToken, setAuthToken] = useState(initialAuth);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token !== null) {
      setAuthToken(token);
      setAuth(true);
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
        if (res.ok) {
          localStorage.removeItem("Token");
          window.location.reload();
          return res.statusText;
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
