import { TextField, Button, Alert, Snackbar} from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../config/axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <form onSubmit={verifyOtp}>
        <h2>Please enter otp sent to you:</h2>
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
      </form>
      <Button variant="contained" onClick={resendOtp}>
          Resend OTP
        </Button>
    </div>
  );
}
