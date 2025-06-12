import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axiosInstance from "../config/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setToken, setUser} = useAuth();

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));

      setUser(res.data.user);
      setToken(res.data.token);

      navigate("/");

    } catch (err) {
      console.log(err);
      setError("Invalid credentials!");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form onSubmit={login}>
        <Grid
          columns={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyItems: "center",
            boxShadow: 5,
            padding: 2,
          }}
        >
          <Typography variant="h4" align="center">
            Sign In
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </form>
      <Navbar name={email} />
    </Container>
  );
}
