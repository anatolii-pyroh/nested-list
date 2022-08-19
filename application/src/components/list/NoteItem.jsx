import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
//
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import classes from "./NoteItem.module.css";
import NotesForm from "../form/NotesForm";
import Card from "../UI/Card";

const NoteItem = ({
  index,
  note,
  isLast,
  isFirst,
  move,
  update,
  editName,
  remove,
  removeSubnote,
  ...props
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [showSubnotes, setShowSubnotes] = useState(false);
  const open = () => {
    setOpenForm(!openForm);
  };
  const show = () => {
    setShowSubnotes(!showSubnotes);
  };
  const moveNote = (type) => {
    if (type === "up") {
      move(index, index - 1);
    } else {
      move(index, index + 1);
    }
  };

  const moveSubnote = (currIndex, newIndex) => {
    const updSubnotes = [...note.subnotes];
    const [reorderedItem] = updSubnotes.splice(currIndex, 1);
    updSubnotes.splice(newIndex, 0, reorderedItem);

    const editedNote = { ...note, subnotes: updSubnotes };
    update(editedNote, index);
  };

  const addNote = (newNote) => {
    const editedNote = { ...note, subnotes: [...note.subnotes, newNote] };
    update(editedNote, index);
  };

  const updateNote = (newNote, i) => {
    const editedNote = { ...note };
    editedNote.subnotes[i] = newNote;
    update(editedNote, index);
  };

  const editSubnoteName = (i, newNoteName) => {
    console.log(newNoteName);
    const editedNote = { ...note };
    editedNote.subnotes[i].name = newNoteName;
    update(editedNote, index);
  };

  const removeSubnoteItsSubnotes = (i) => {
    const editedNote = { ...note };
    editedNote.subnotes[i].subnotes = [];
    update(editedNote, index);
  };

  const removeNote = (id) => {
    const updSubnotes = note.subnotes.filter((subnote) => subnote.id !== id);
    const editedNote = { ...note, subnotes: updSubnotes };
    update(editedNote, index);
  };

  useEffect(() => {
    if (note.subnotes && note.subnotes.length > 0) {
      setOpenForm(true);
    }
  }, []);

  return (
    <React.Fragment>
      <li className={classes.item}>
        {/* div that contains item name and buttons */}
        <div className={classes.general}>
          <div className={classes["item-name"]}>
            <span>{index + 1}. </span>
            {note.name}
          </div>
          <div className={classes["item-buttons"]}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {/* getting item index and set icons depends on what item index is */}
              {/* move item up */}
              {isFirst && (
                <IconButton aria-label='moveUp' onClick={() => moveNote("up")}>
                  <ArrowUpwardIcon />
                </IconButton>
              )}
              {/* move item down */}
              {isLast && (
                <IconButton
                  aria-label='moveDown'
                  onClick={() => moveNote("down")}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              )}
              {/* show/hide subnotes */}
              {note.subnotes.length > 0 && (
                <React.Fragment>
                  {!showSubnotes && (
                    <IconButton aria-label='show' onClick={show}>
                      <VisibilityIcon />
                    </IconButton>
                  )}
                  {showSubnotes && (
                    <IconButton aria-label='show' onClick={show}>
                      <VisibilityOffIcon />
                    </IconButton>
                  )}
                </React.Fragment>
              )}
              <IconButton aria-label='add' onClick={open}>
                <AddIcon />
              </IconButton>

              <IconButton
                aria-label='edit'
                onClick={() => editName(index, "newNoteName")}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label='delete' onClick={() => remove(note.id)}>
                <DeleteForeverIcon />
              </IconButton>
              {/* {note.subnotes && note.subnotes.length > 0 && (
              <Button
                variant='danger'
                type='button'
                onClick={() => removeSubnote(index)}
              >
                Remove sublist
              </Button>
            )} */}
            </Box>
          </div>
        </div>
        {openForm && <NotesForm add={addNote} />}
        {showSubnotes && (
          <React.Fragment>
            <ul>
              {note.subnotes.map((subnote, index) => (
                <Card key={subnote.id} style={{ padding: "0" }}>
                  <NoteItem
                    index={index}
                    note={subnote}
                    isFirst={index !== 0 ? true : false}
                    isLast={
                      note.subnotes && note.subnotes.length - 1 !== index
                        ? true
                        : false
                    }
                    move={moveSubnote}
                    update={updateNote}
                    editName={() => editSubnoteName(index, "newSubnoteName")}
                    remove={() => removeNote(subnote.id)}
                    removeSubnote={() => removeSubnoteItsSubnotes(index)}
                  />
                </Card>
              ))}
            </ul>
          </React.Fragment>
        )}
      </li>
    </React.Fragment>
  );
};

export default NoteItem;
