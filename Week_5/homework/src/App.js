// Import necessary modules from their respective packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext"; // Custom context for authentication
import HomePage from "./components/HomePage"; // Component for the homepage
import LoginPage from "./components/LoginPage"; // Component for the login page
import { CssBaseline } from "@mui/material"; // For consistent baseline styling
import theme from "./Theme"; // Custom theme settings

// The main App component
function App() {
  return (
    // The Router component from react-router-dom helps in handling different routes or pages
    <Router>
      {/* CssBaseline is a component from MUI. It helps in providing consistent baseline styling across different browsers. */}
      <CssBaseline/>
      {/* AuthProvider is a custom context component that provides authentication functionalities to its children. */}
      <AuthProvider>
        {/* ThemeProvider from MUI provides theming capabilities. We pass our custom theme to it. */}
        <ThemeProvider theme={theme}>
          {/* Routes is a component from react-router-dom that wraps all possible routes or pages */}
          <Routes>
            {/* Route represents a single route. Here, we define two routes: one for login and one for home. */}
            {/* The path prop determines the URL path, and the element prop determines which component to show. */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

// Export the App component so it can be used elsewhere in our project
export default App;