import React from "react";
import AuthProvider from "./contexts/AuthContext";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route element={<Home />} path="/" />
            </Route>
            <Route element={<VerifyEmail />} path="/verify-email"/>
            <Route element={<Signin />} path="/signin" />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
