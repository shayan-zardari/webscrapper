import * as React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

export default function Signup() {
  return (
    <Box sx={{display: "flex", flexDirection: "column", maxWidth: 500, gap:2, margin: 2, padding: 5, borderRadius: 5, boxShadow: 3}}>
      <Typography variant="h6">Signup Form</Typography>
      <TextField label="Name" display={"block"}></TextField>
      <TextField label="Email" type="email" display={"block"}></TextField>
      <TextField label="Password" type="password" display={"block"}></TextField>
      <Button variant="contained">Create Account</Button>
    </Box>
  );
}
