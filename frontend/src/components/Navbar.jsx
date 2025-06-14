import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logOut } = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "primary",
        position: "static",
      }}
    >
      <Toolbar variant="regular" sx={{ display: "flex", gap: 2 }}>
        <Typography variant="h4" color="white" sx={{ flexGrow: 1 }}>
          Authentication Sytem
        </Typography>

        {!user ? (
          <>
            <Button
              variant="outlined"
              type="button"
              color="inherit"
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              type="button"
              color="inherit"
              component={Link}
              to="/signin"
            >
              Sing In
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Hi, {user?.name}</Typography>
            <Button
              variant="outlined"
              type="button"
              color="inherit"
              onClick={logOut}
            >
              Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
