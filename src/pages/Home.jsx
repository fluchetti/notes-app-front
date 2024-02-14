import { useContext, useEffect, useState } from "react";
import CreateNoteForm from "../components/CreateNoteForm";
import Notes from "../components/Notes";
import { NotesProvider } from "../context/NotesContext";
import AuthContext from "../context/AuthContext";
import LandingPage from "./Landing";

const Home = () => {
  const { auth, authToken, setAuth, setAuthToken } = useContext(AuthContext);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setAuth(true);
      setAuthToken(localStorage.getItem("Token"));
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <NotesProvider>
      <div className="container mt-2 d-flex">
        {!auth && (
          <div className="mt-5" style={{ flexBasis: "100%" }}>
            <LandingPage />
          </div>
        )}
        {auth && (
          <div className="flex-grow-1 me-3" style={{ flexBasis: "33%" }}>
            <CreateNoteForm authToken={authToken} />
          </div>
        )}

        {auth && (
          <div className="flex-grow-1" style={{ flexBasis: "67%" }}>
            <Notes auth={auth} authToken={authToken} />
          </div>
        )}
      </div>
      {showScrollBtn && (
        <button
          className="btn btn-primary"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: "999",
          }}
          onClick={scrollToTop}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </NotesProvider>
  );
};

export default Home;
