import {
  TextField,
  Button,
  Alert,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../config/axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/verify-email", {
        email: user.email,
        verification_code: otp,
      });
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Invalid or Expired OTP!");
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axiosInstance.post("/auth/resend-verification-email", {
        email: user.email,
      });
      console.log(res.data);
      alert("OTP resent Successfully!");
    } catch (err) {
      console.log(err);
      setError("Error resending OTP!");
    }
  };

  return user  ? (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ maxWidth: "sm", p: "20px" }}>
          <form
            onSubmit={verifyOtp}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Typography variant="h5">Enter the verification code</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              name="otp"
              type="text"
              label="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
            />
            <Button type="submit" variant="contained">
              Verify OTP
            </Button>
            <Button variant="contained" onClick={resendOtp}>
              Resend OTP
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  ) : (
    <>
      <NavBar />
      <Box sx={{display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center", alignItems: "center"}}>
        <Typography variant="h2">
          Please login first to verify your email 🙂
        </Typography>
      </Box>
    </>
  );
}
