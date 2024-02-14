import { useContext } from "react";
import NotesContext from "../context/NotesContext";

export const Note = ({ data }) => {
  const { id, title, description, created } = data;
  const { deleteNote, editNote } = useContext(NotesContext);
  return (
    <div className="card note-card my-2">
      <div className="card-body border">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="close mx-1"
            aria-label="Close"
            onClick={() => editNote({ data })}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button
            type="button"
            className="close mx-1"
            aria-label="Close"
            onClick={() => deleteNote({ id })}
          >
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
        <h5 className="card-title text-center">{title}</h5>

        <p className="card-text">{description}</p>
        <small className="card-text text-muted">{created}</small>
      </div>
    </div>
  );
};

export default Note;
