import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import classes from "./NotesForm.module.css";
import { v4 as uuidv4 } from "uuid";

const NotesForm = ({ add, ...props }) => {
  const [inputValue, setInputValue] = useState("");

  // add new note by checking if input is not empty
  const addNewNote = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      let newNote = {
        id: uuidv4(),
        name: inputValue,
        subnotes: [],
      };
      add(newNote);
    }
    setInputValue("");
    return;
  };

  const style = {
    mt: 0.5,
    "& label.Mui-focused": {
      color: "rgb(123, 76, 204)",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(123, 76, 204)",
      },
    },
  };
  return (
    <form autocomplete='off' className={classes.form} onSubmit={addNewNote}>
      <TextField
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        label='Add new note'
        size='small'
        variant='outlined'
        sx={style}
      />
      <Button
        variant='contained'
        type='submit'
        sx={{
          marginTop: 1.5,
          marginBottom: 1,
          width: "100px",
          color: "white !important",
          backgroundColor: "rgb(103,46,227) !important",
          ":hover": {
            color: "white !important",
            backgroundColor: "rgb(128, 84, 202) !important"
          }
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default NotesForm;
