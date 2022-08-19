import React from "react";
import "./Header.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
const Header = ({ user, logout }) => {
  return (
    <header>
      <div>Hello, {user.email}</div>
      <div style={{ cursor: "pointer" }} onClick={logout}>
        <IconButton
          aria-label='logout'
          sx={{
            color: "white !important",
            ":hover": {
              color: "white !important",
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
        Logout
      </div>
    </header>
  );
};

export default Header;
