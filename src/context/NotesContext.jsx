import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
// Creo un contexto. El contexto tiene un wrapper y un consumer.

const NotesContext = createContext();
const initialNotes = [];

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noteMessage, setNoteMessage] = useState(false);
  const { authToken } = useContext(AuthContext);
  let baseURL = "http://127.0.0.1:8000/";

  const deleteNote = ({ id }) => {
    const confirm = window.confirm("Borrar nota?");
    if (confirm) {
      // hacer un delete a la api.
      fetch(`https://fluchetti.pythonanywhere.com/notes/list/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      }).then((res) => {
        let newNotes = notes.filter((note) => note.id !== id);
        if (newNotes.length !== 0) {
          setNotes(newNotes);
        } else {
          setNotes([]);
        }
        setNoteMessage("Nota eliminada exitosamente");
        setTimeout(() => {
          setNoteMessage(false);
        }, 2000);
      });
    }
  };

  const editNote = ({ data }) => {
    let { id, title, description } = data;
    setDataToEdit({ id, title, description });
  };

  const data = {
    notes,
    setNotes,
    dataToEdit,
    setDataToEdit,
    loading,
    setLoading,
    deleteNote,
    editNote,
    baseURL,
    noteMessage,
    setNoteMessage,
  };
  return <NotesContext.Provider value={data}>{children}</NotesContext.Provider>;
};
export { NotesProvider };
export default NotesContext;
