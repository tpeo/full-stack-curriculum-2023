import React, { useState } from "react";
import { Avatar, Grid, Typography, Button, Stack } from "@mui/material";
import { UserAuth } from '../context/AuthContext';

function App() {
    const { logOut } = UserAuth();
    const user = JSON.parse(window.localStorage.getItem("@user"))

    const handleSignOut = async () => {
      try {
        await logOut();
      } catch (error) {
        console.log(error);
      }
    };

  function renderPage() {
      return (
        <Stack margin="100px" alignItems="center" justifyContent="center" spacing={4}>
            <Avatar   sx={{ width: 200, height: 200 }} src={user.pfp}>
              <img
                src={user.pfp}
                referrerPolicy="no-referrer"
              ></img>
            </Avatar>        
            <Typography id="name">{user.name}</Typography>
            <Typography id="email">{user.email}</Typography>
            <Button variant='contained' onClick={handleSignOut}>Log Out</Button>

      </Stack>
  
      );

  }

  return (
    <Grid name="main" display="flex" direction="column">
      {renderPage()}
    </Grid>
  );
}

export default App;
