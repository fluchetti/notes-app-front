import { useContext, useEffect, useState } from "react";
import Note from "./Note";
import NotesContext from "../context/NotesContext";
import AuthContext from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

export const Notes = () => {
  const { notes, setNotes, loading, setLoading } = useContext(NotesContext);
  const { authToken } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(searchParams);
      const query = queryParams.get("q");

      try {
        if (authToken !== null) {
          const url = query
            ? `https://fluchetti.pythonanywhere.com/notes/list/?q=${query}`
            : "https://fluchetti.pythonanywhere.com/notes/list/";

          const res = await fetch(url, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${authToken}`,
            },
          });
          if (res.ok) {
            const json = await res.json();
            setNotes(json);
          } else {
            throw new Error("Ocurrio un error", res.status, res.statusText);
          }
        }
      } catch (error) {
        console.log("Ocurrio un error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, searchParams]);

  return (
    <>
      {loading && <h2>Cargando.....</h2>}
      {!loading && notes && notes.length > 0 ? (
        notes.map((note) => (
          <Note key={note.id} data={note} authToken={authToken}></Note>
        ))
      ) : (
        <p>{!loading ? "Comenza a crear notas para verlas.." : null}</p>
      )}
    </>
  );
};

export default Notes;
