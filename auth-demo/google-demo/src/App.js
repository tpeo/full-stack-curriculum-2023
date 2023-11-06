import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import { Routes, Route, useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import { UserAuth } from './context/AuthContext';

const ProtectedFormRoute = ({isLoggedIn, children}) => {
  const params = useParams();
  const name = params.apartment;
  if (isLoggedIn) {
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
  console.log(user.loggedIn)
    return (
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/" element={<ProtectedFormRoute isLoggedIn={user.loggedIn}>
              <HomePage></HomePage>
            </ProtectedFormRoute>}></Route>
      </Routes>

    );
}
export default App;