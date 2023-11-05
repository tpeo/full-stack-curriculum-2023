import { Avatar, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firebase } from "../firebase";
import { verifyCredentials } from "../verifyCredentials";

export default function LoginPage() {
  let navigate = useNavigate();
  const [newUser, setNewUser] = useState(false);

  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    //2 - create the popup signIn
    await auth.signInWithPopup(provider).then(
      async (result) => {
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);
        const user = {
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          pfp: auth.currentUser.photoURL,
        };
        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@userToken", token);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("@user", JSON.stringify(user));
          localStorage.setItem("@pfp", user.pfp);
          //6 - navigate user to the home page
          navSignIn();
          console.log(newUser);
        }
      },
      function (error) {
        console.log(error);
      }
    );

    function navSignIn() {
      const fetchData = async () => {
        setNewUser(await verifyCredentials(navigate, true));
      };
      console.log(newUser);

      fetchData();
      navigate("/");
    }
  }

  return (
    <>
      <Typography variant="h1">Login</Typography>
      <Button onClick={googleLogin} sx={{ p: 0 }}>
        <Avatar src="google_icon.png"></Avatar>
        <Typography>Login with Google</Typography>
      </Button>
    </>
  );
}
