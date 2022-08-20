import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
} from "@mui/material";

const ModalWindow = ({ openModal, handleClose, edit, index }) => {
  const [modalValue, setModalValue] = useState("");
  const handleSendNewNoteName = () => {
    edit(index, modalValue);
    handleClose();
  };
  // modal window and input styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    maxWidth: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const inputStyle = {
    my: 0.3,
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
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          sx={{ mb: 1 }}
        >
          Enter new name of note
        </Typography>
        <TextField
        autoComplete="off"
          fullWidth
          label='Name'
          size='small'
          variant='outlined'
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          sx={inputStyle}
        />
        <Button
          variant='contained'
          type='button'
          onClick={handleSendNewNoteName}
          sx={{
            my: 1,
            width: "100%",
            color: "white !important",
            backgroundColor: "rgb(103,46,227) !important",
            ":hover": {
              color: "white !important",
              backgroundColor: "rgb(128, 84, 202) !important",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
