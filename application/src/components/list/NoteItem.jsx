import React, { useState, useEffect } from "react";
import classes from "./NoteItem.module.css";
import Button from "react-bootstrap/Button";
import NotesForm from "../form/NotesForm";
import Card from "../UI/Card";

const NoteItem = ({
  index,
  note,
  isLast,
  isFirst,
  move,
  edit,
  remove,
  removeSubnote,
  ...props
}) => {
  const [isOpen, setisOpen] = useState(false);
  const open = () => {
    setisOpen(!isOpen);
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
    edit(editedNote, index);
  };

  const addNote = (newNote) => {
    const editedNote = { ...note, subnotes: [...note.subnotes, newNote] };
    edit(editedNote, index);
  };

  const editNote = (newNote, i) => {
    const editedNote = { ...note };
    editedNote.subnotes[i] = newNote;
    edit(editedNote, index);
  };

  const removeSubnoteItsSubnotes = (i) => {
    const editedNote = { ...note };
    editedNote.subnotes[i].subnotes = [];
    edit(editedNote, index);
  };

  const removeNote = (id) => {
    const updSubnotes = note.subnotes.filter((subnote) => subnote.id !== id);
    const editedNote = { ...note, subnotes: updSubnotes };
    edit(editedNote, index);
  };
  // arrow icons
  const arrowUpIcon = (
    <img
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAWElEQVRIiWNgGGSggYGBoYOWhv+HYqpbgmw41S3BZjjVLMFnOMWWEGM42ZaQYjjJlpBjOE5LGIm09D8OcYL6mYi0gGwwasGoBaMWjCQLjmARO0xNhwxeAABOCEKpuFUsyQAAAABJRU5ErkJggg=='
      alt='arrow up'
    />
  );
  const arrowDownIcon = (
    <img
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAaElEQVRIie3VMRKAIAxE0a8e2tLxaI7DubCwQ9BN1EazM+nIPiqAvyQBuZhVWexEIHv3exFwJ4AAAvgqMHJ82Fopz00qXEOuRi73IOZyC+IuV5Db5WfIY+U1RC4fDEBi/yIXYDZd7c1sSINBMQZKefMAAAAASUVORK5CYII='
      alt='arrow down'
    />
  );

  useEffect(() => {
    if (note.subnotes && note.subnotes.length > 0) {
      setisOpen(true);
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
            {/* getting item index and set icons depends on what item index is */}
            {/* move item up */}
            {isFirst && (
              <span onClick={() => moveNote("up")}>{arrowUpIcon}</span>
            )}
            {/* move item down */}
            {isLast && (
              <span onClick={() => moveNote("down")}>{arrowDownIcon}</span>
            )}
            {note.subnotes && note.subnotes.length === 0 && (
              <Button variant='primary' type='button' onClick={open}>
                Add sublist
              </Button>
            )}
            <Button
              variant='danger'
              type='button'
              onClick={() => remove(note.id)}
            >
              Remove
            </Button>
            {note.subnotes && note.subnotes.length > 0 && (
              <Button
                variant='danger'
                type='button'
                onClick={() => removeSubnote(index)}
              >
                Remove sublist
              </Button>
            )}
          </div>
        </div>
        {isOpen && (
          <React.Fragment>
            <ul>
              {note.subnotes.map((subnote, index) => (
                <Card key={subnote.id} style={{ marginTop: "0", padding: "0" }}>
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
                    edit={editNote}
                    remove={() => removeNote(subnote.id)}
                    removeSubnote={() => removeSubnoteItsSubnotes(index)}
                  />
                </Card>
              ))}
            </ul>
            <NotesForm add={addNote} />
          </React.Fragment>
        )}
      </li>
    </React.Fragment>
  );
};

export default NoteItem;
