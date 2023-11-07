import { useContext, createContext, useState, useEffect } from 'react';
import {
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    userToken: "",
    loggedIn: false,
    user: {},
    pfp: ""
  });
  const navigate = useNavigate();

  const logOut = () => {
      signOut(auth)
      setUser({ // clear user
        userToken: "",
        loggedIn: false,
        user: {},
        pfp: ""
      })
      localStorage.removeItem("@user");
      localStorage.removeItem("@pfp");
      localStorage.setItem("@loggedIn", false);
      navigate("/login"); //navigate to temp page that says you've logged out and times out?

  }

  async function getUser() {
    let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/info/${user.user.uid}`;

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

  const verifyCredentials = async (navigate, persona) => {
    console.log(persona)
    if(persona.userToken){ 
        console.log("in verify")

        const decode = jwtDecode(persona.userToken);

        const res = await fetch(`http://${process.env.REACT_APP_HOSTNAME}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + persona.userToken,
            },
            body: JSON.stringify({ user: decode }),
        });

        const result = (await res.json());
        console.log(result)
        return result.newUser;
    }else{
        navigate("/login");
        return -1;
    }
}

  return (
    <AuthContext.Provider value={{ logOut, user, setUser, verifyCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};