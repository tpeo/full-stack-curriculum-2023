import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage"; // Assuming you have this file
import { CssBaseline } from "@mui/material";
import theme from "./Theme";

function App() {
  return (
    <Router>
      <CssBaseline/>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
