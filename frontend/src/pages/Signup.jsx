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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken, setUser } = useAuth();
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword != password) throw new Error("Passwords don't match");
      const res = await axiosInstance.post("/auth/register", {
        name: name,
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
      if (err.response.data.details[0].code == "invalid_string") {
        setError(
          "Password should be at least 8 chracters long and contain one lowercase, one uppercase, and one special character."
        );
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <Navbar />
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
        <form onSubmit={signup}>
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
              required
              name="name"
              type="name"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
            <TextField
              required
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
              required
              slotProps={{ htmlInput: { minLength: 8 } }}
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <TextField
              required
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
}
