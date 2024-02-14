import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

export const Profile = () => {
  const { authToken, auth } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    if (auth) {
      console.log("authhhh");
      fetch("https://fluchetti.pythonanywhere.com/users/detail", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      })
        .then((res) =>
          res.ok
            ? res.json()
            : Promise.reject(new Error("La solicitud no fue exitosa"))
        )
        .then((json) => {
          setProfileData(json);
        })
        .catch((error) => {
          console.error("Ocurrió un error: ", error);
        });
    }
  }, [auth, authToken]);

  return (
    <div className="container">
      {profileData ? (
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Bienvenido a tu perfil</h3>
              <ul className="list-group">
                <li className="list-group-item">ID: {profileData.id}</li>
                <li className="list-group-item">Nombre: {profileData.name}</li>
                <li className="list-group-item">
                  Apellido: {profileData.last_name}
                </li>
                <li className="list-group-item">Email: {profileData.email}</li>
                <li className="list-group-item">
                  Fecha de creación: {profileData.created}
                </li>
                <li className="list-group-item">
                  Fecha de modificación: {profileData.modified}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;
