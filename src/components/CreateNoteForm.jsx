import { useContext, useEffect, useState } from "react";
import NotesContext from "../context/NotesContext";
import AuthContext from "../context/AuthContext";

const initialNote = {
  title: "",
  description: "",
};

export const CreateNoteForm = () => {
  const { notes, setNotes, dataToEdit, setDataToEdit } =
    useContext(NotesContext);
  const { authToken } = useContext(AuthContext);
  const [newNote, setNewNote] = useState(initialNote);

  useEffect(() => {
    if (dataToEdit) {
      setNewNote(dataToEdit);
    } else {
      setNewNote(initialNote);
    }
  }, [dataToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Si la nota viene con id es un PUT, si no es un POST.
    if (!newNote.id) {
      fetch("http://127.0.0.1:8000/notes/list/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(newNote),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return res.json();
          }
        })
        .then((json) => {
          setNotes([json, ...notes]);
          handleReset();
        });
    } else {
      fetch(`http://127.0.0.1:8000/notes/list/${newNote.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(newNote),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return res.json();
          }
        })
        .then((json) => {
          const newNotes = notes.filter((note) => note.id !== json.id);
          setNotes([json, ...newNotes]);
          handleReset();
        });
    }
  };

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setNewNote(initialNote);
    setDataToEdit(null);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            required
            placeholder="Ingrese el título"
            value={newNote.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Ingrese la descripción"
            rows="5"
            required
            value={newNote.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-dark mt-2">
          {dataToEdit && "Editar"}
          {!dataToEdit && "Crear"}
        </button>
        <button className="btn btn-dark mt-2 mx-2" onClick={handleReset}>
          Limpiar
        </button>
      </form>
    </div>
  );
};

export default CreateNoteForm;
