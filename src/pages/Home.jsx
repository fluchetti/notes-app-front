import { useContext } from "react";
import CreateNoteForm from "../components/CreateNoteForm";
import Notes from "../components/Notes";
import { NotesProvider } from "../context/NotesContext";
import AuthContext from "../context/AuthContext";

export const Home = () => {
  const { auth, authToken } = useContext(AuthContext);
  return (
    <NotesProvider>
      <div className="container d-flex">
        <div className="flex-grow-1 me-3" style={{ flexBasis: "33%" }}>
          {auth && <CreateNoteForm authToken={authToken} />}
        </div>
        <div className="flex-grow-1" style={{ flexBasis: "67%" }}>
          {auth && <Notes auth={auth} authToken={authToken} />}
          {!auth && <p>Inicia sesión para ver tus notas!</p>}
        </div>
      </div>
    </NotesProvider>
  );
};

export default Home;
