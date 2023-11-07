import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, firebase } from "../firebase";
import { UserAuth } from '../context/AuthContext';

export default function LoginPage() {
  let navigate = useNavigate();
  const { setUser, verifyCredentials } = UserAuth();

  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    //2 - create the popup signIn
    await auth.signInWithPopup(provider).then(
      async (result) => {
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);
        const userLogin = {
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          pfp: auth.currentUser.photoURL,
        };
        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at context (We'll use this to make requests)
          setUser({
            userToken: token,
            loggedIn: true,
            user: userLogin,
            pfp: userLogin.pfp
          })

          localStorage.setItem("@user", JSON.stringify(userLogin));
          localStorage.removeItem("@pfp", userLogin.photoURL);
          localStorage.setItem("@loggedIn", true);
          //6 - navigate user to the home page
          await verifyCredentials(navigate, {
            userToken: token,
            loggedIn: true,
            user: userLogin,
            pfp: userLogin.pfp
          }, true);
          navigate("/");

        }
      },
      function (error) {
        console.log(error);
      }
    );

  }

  return (
    <Stack margin="100px" alignItems="center" justifyContent="center" spacing={4}>
        <Avatar src="TPEO_Logo.png"></Avatar>
        <Typography variant="h1">Login</Typography>
        <Button variant="contained" onClick={googleLogin} sx={{ p: 0, padding: "10px" }}>
            <Avatar src="google_icon.png" sx={{marginRight: '5px'}}></Avatar>
            <Typography>Login with Google</Typography>
        </Button>
    </Stack>
  );
}
