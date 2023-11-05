import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {verifyCredentials} from '../verifyCredentials';
import { Avatar, Grid, Typography, Button } from "@mui/material";

function App() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "name",
        email: "email",
    }); //do i have to do this?
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            getUser();
            setLoaded(true);

        };
        fetchData();
    }, []);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        localStorage.removeItem("@userToken");
        localStorage.removeItem("@user");
        localStorage.removeItem("@pfp");
        localStorage.setItem("loggedIn", false);
        navigate("/login"); //navigate to temp page that says you've logged out and times out?
    };

  async function getUser() {
    let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/info/${
      JSON.parse(window.localStorage.getItem("@user")).uid
    }`;

    await fetch(apiCall, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      })
      .then((response) => {
        setUser(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function renderPage() {
    if (loaded) {
      return (
        <Grid>
          <Grid>
            <Avatar src={window.localStorage.getItem("@pfp")}>
              <img
                src={window.localStorage.getItem("@pfp")}
                referrerPolicy="no-referrer"
              ></img>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography id="name">{user.name}</Typography>
            <Typography id="email">{user.email}</Typography>
            <Typography id="apartment">{user.apartment}</Typography>
          </Grid>

          <Button onClick={logOut}>Log Out</Button>
        </Grid>
      );
    } else {
      return null;
    }
  }

  return (
    <Grid name="main" display="flex" direction="column">
      {renderPage()}
    </Grid>
  );
}

export default App;
