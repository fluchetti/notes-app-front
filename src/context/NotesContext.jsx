import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
// Creo un contexto. El contexto tiene un wrapper y un consumer.

const NotesContext = createContext();
const initialNotes = [];

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authToken } = useContext(AuthContext);
  let baseURL = "https://fluchetti.pythonanywhere.com/";

  const deleteNote = ({ id }) => {
    console.log(id);
    console.log(authToken);
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
        console.log(res);
        let newNotes = notes.filter((note) => note.id !== id);
        console.log(newNotes);
        if (newNotes.length !== 0) {
          setNotes(newNotes);
        } else {
          setNotes([]);
        }
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
  };
  return <NotesContext.Provider value={data}>{children}</NotesContext.Provider>;
};
export { NotesProvider };
export default NotesContext;
