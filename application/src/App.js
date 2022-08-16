import React, { useState, useEffect } from "react";
import Card from "./components/UI/Card";
import NotesForm from "./components/form/NotesForm";
import NoteItem from "./components/list/NoteItem";
import SignForm from "./components/form/SignForm";
import "./styles.css";
import axios from "axios";

export default function App() {
  // setting notesList data from localestorage, if empty, data = []
  const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, setNotes] = useState(localNotes);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // move note in notes when user press any arrow
  const moveNote = (currIndex, newIndex) => {
    const noteStateCopy = [...notes];
    const [reorderedItem] = noteStateCopy.splice(currIndex, 1);
    noteStateCopy.splice(newIndex, 0, reorderedItem);
    setNotes(noteStateCopy);
  };

  // add not when user press "submit"
  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  // edit note when user add info to note
  const editNote = (note, index) => {
    setNotes((notes) => {
      const updState = [...notes];
      updState[index] = note;
      return updState;
    });
  };

  // remove note when user press "remove"
  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const removeSubnote = (index) => {
    setNotes((notes) => {
      const updState = [...notes];
      updState[index].subnotes = [];
      return updState;
    });
  };
  // updating localStorage every time we add or remove note from notesList
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    // console.log(notes);
  }, [notes]);

  return (
    <div className="App">
      <Card>
        {!isLoggedIn && <SignForm />}
        {isLoggedIn && (
          <main>
            <ul>
              {notes.map((note, i) => (
                <NoteItem
                  index={i}
                  note={note}
                  isFirst={i !== 0 ? true : false}
                  isLast={notes.length - 1 !== i ? true : false}
                  move={moveNote}
                  edit={editNote}
                  remove={removeNote}
                  removeSubnote={removeSubnote}
                  key={note.id}
                />
              ))}
            </ul>
            <NotesForm add={addNote} />
          </main>
        )}
      </Card>
    </div>
  );
}
