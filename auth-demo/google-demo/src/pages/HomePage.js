import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Avatar, Grid, Typography, Button } from "@mui/material";
import { UserAuth } from '../context/AuthContext';

function App() {
    const { logOut, user } = UserAuth();

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
            <Typography id="name">{user.user.name}</Typography>
            <Typography id="email">{user.user.email}</Typography>
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
