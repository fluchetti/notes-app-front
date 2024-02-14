import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export const Menu = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const [queryParam, setQueryParam] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQueryParam(e.target.value);
  };

  const handleSubmit = (e) => {
    // Hay que actualizar las notas con el valor que pasamos.
    e.preventDefault();
    setSearchParams({ q: queryParam });
    navigate(`/?q=${queryParam}`);
    setQueryParam("");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light pb-2">
      <div className="container-fluid">
        <a className="navbar-brand">NotesApp</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : null)}
              to="/"
            >
              Home
            </NavLink>
            {!auth && (
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : null)}
                to="/login"
              >
                Login
              </NavLink>
            )}
            {auth && <NavLink to="/profile">Profile</NavLink>}
            {auth && (
              <NavLink to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            )}

            {!auth && (
              <NavLink
                className={({ isActive }) => (isActive ? "active-link" : null)}
                to="/signup"
              >
                Signup
              </NavLink>
            )}
          </div>
          <div className="d-flex align-items-center mx-3">
            <form className="d-flex align-items-center" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar titulo"
                aria-label="Search"
                name="q"
                value={queryParam}
                onChange={handleChange}
              />
              <button className="btn btn-outline-success" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
