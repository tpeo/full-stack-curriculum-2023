import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import { Routes, Route, useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import { UserAuth } from './context/AuthContext';

const ProtectedFormRoute = ({isLoggedIn, children}) => {
  const params = useParams();
  if (isLoggedIn == "true") { // use localstorage because it persists
    console.log(params)
    return children;
  } else {
    return (
    <Typography variant='body'>Error 404. You are not authorized to access this page</Typography>
    );
  }
}

function App() {
  const { user } = UserAuth();
    return (
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/" element={<ProtectedFormRoute isLoggedIn={ window.localStorage.getItem("@loggedIn")}>
              <HomePage></HomePage>
            </ProtectedFormRoute>}></Route>
      </Routes>

    );
}
export default App;