import React, { Fragment, useState, useEffect } from "react";
import Card from "./components/UI/Card";
import NotesForm from "./components/form/NotesForm";
import NoteItem from "./components/list/NoteItem";
import SignForm from "./components/form/SignForm";
import api from "./api/users"
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    notes: [],
  });
  const [notes, setNotes] = useState([]);

  // retrieve user
  const retrieveUsers = async () => {
    const response = await api.get("/users")
    return response.data;
  }
  // if true, get user its info from api and set notes its info from user.notes in api
  const getAllUsers = async () => {
    const userApiInfo = await retrieveUsers()
    console.log(userApiInfo)
    if (userApiInfo) {
      setUser(userApiInfo?.[0])
      setNotes(userApiInfo?.[0].notes)
    }
  }
  // set user state with random id and email+password from sign form
  const handleSignUpUser = (email, password) => {
    console.log(email, password);
    setUser({
      id: uuidv4(),
      email: email,
      password: password,
      notes: [],
    });
    setIsSignedUp(true);
    console.log("Signed up");
  };

  // check if inputs from sign form are equal inputs from login form
  // if true, set user state in local storage
  const handleLogInUser = (email, password) => {
    if (email === user.email && password === user.password) {
      console.log("Logged in");
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("Wrong inputs");
    }
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

  // updating user.notes state every time we CRUD notes
  useEffect(() => {
    setUser((user) => {
      const updState = { ...user };
      updState.notes = notes;
      return updState;
    });
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user)
  }, [user]);

  // if logged in, give user state info from local storage
  useEffect(() => {
    const storeLogInInfo = localStorage.getItem("isLoggedIn");
    if (storeLogInInfo === "1") {
      getAllUsers()
      setIsSignedUp(true);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className='App'>
      {!isSignedUp && (
        <Card>
          <h3>Sign up</h3>
          <SignForm userFunction={handleSignUpUser} buttonText={"Sign Up"} />
        </Card>
      )}
      {isSignedUp && !isLoggedIn && (
        <Card>
          <h3>Log in</h3>
          <SignForm userFunction={handleLogInUser} buttonText={"Log In"} />
        </Card>
      )}
      {isLoggedIn && (
        <Fragment>
          <Card>
            <NotesForm add={addNote} />
          </Card>
          <main>
            <ul>
              {notes.map((note, i) => (
                <Card key={note.id} style={{ marginTop: "0", padding: "0" }}>
                  <NoteItem
                    index={i}
                    note={note}
                    isFirst={i !== 0 ? true : false}
                    isLast={notes.length - 1 !== i ? true : false}
                    move={moveNote}
                    edit={editNote}
                    remove={removeNote}
                    removeSubnote={removeSubnote}
                  />
                </Card>
              ))}
            </ul>
          </main>
        </Fragment>
      )}
    </div>
  );
}