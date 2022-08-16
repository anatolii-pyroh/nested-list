import React, { useState, useEffect } from "react";
import Card from "./components/UI/Card";
import NotesForm from "./components/form/NotesForm";
import NoteItem from "./components/list/NoteItem";
import SignForm from "./components/form/SignForm";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function App() {
  // setting notesList data from localestorage, if empty, data = []
  const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, setNotes] = useState(localNotes);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: ""
  })

  const signUpUser = (email, password) => {
    console.log(email, password)
    setUser({
      id: uuidv4(),
      email: email,
      password: password
    })
    setIsSignedUp(true)
    console.log("Signed up")
  }
  const logInUser = (email, password) => {
    if (email === user.email && password === user.password) {
      console.log("Loged in")
      setIsLogedIn(true)
    } else {
      console.log("Wrong inputs")
    }
  }
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

  // move note in notes when user press any arrow
  const moveNote = (currIndex, newIndex) => {
    const noteStateCopy = [...notes];
    const [reorderedItem] = noteStateCopy.splice(currIndex, 1);
    noteStateCopy.splice(newIndex, 0, reorderedItem);
    setNotes(noteStateCopy);
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
  }, [notes]);

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className='App'>
      <Card>
        {!isSignedUp && <SignForm userFunction={signUpUser} buttonText={"Sign Up"}/>}
        {(isSignedUp && !isLogedIn) && <SignForm userFunction={logInUser} buttonText={"Log In"}/>}
        {isLogedIn && (
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
