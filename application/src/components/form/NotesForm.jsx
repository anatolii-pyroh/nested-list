import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./NotesForm.module.css";

const NotesForm = ({ add, ...props }) => {
  const [inputValue, setInputValue] = useState("");

  // add new note by checking if input is not empty
  const addNewNote = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      let newNote = {
        id: new Date().toLocaleString(),
        name: inputValue,
        subnotes: []
      };
      add(newNote);
    }
    setInputValue("");
    return;
  };

  return (
    <Form className={classes.form}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Add new note"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={addNewNote}>
        Submit
      </Button>
    </Form>
  );
};

export default NotesForm;
