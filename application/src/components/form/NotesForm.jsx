import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import classes from "./NotesForm.module.css";
import { v4 as uuidv4 } from "uuid";

const NotesForm = ({ add }) => {
  const [inputValue, setInputValue] = useState("");

  // add new note when user press submit
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
      color: "#7b4ccc",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#7b4ccc",
      },
    },
  };
  return (
    <form autoComplete='off' className={classes.form} onSubmit={addNewNote}>
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
          backgroundColor: "#672ee3 !important",
          ":hover": {
            color: "white !important",
            backgroundColor: "#8e6bca !important"
          }
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default NotesForm;
