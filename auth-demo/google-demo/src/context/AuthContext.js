import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
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

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider)
  };

  const logOut = () => {
      signOut(auth)
      navigate("/login"); //navigate to temp page that says you've logged out and times out?

  }

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

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         getUser();
//       setUser(currentUser);
//       console.log('User', currentUser)
//     });
//     return () => {
//         if (user.loggedIn) {
//             unsubscribe();
//         }
//     };
//   }, []);

  const verifyCredentials = async (navigate) => {
    // console.log(user)
    if(user.userToken){
        console.log("in verify")

        const decode = jwtDecode(user.userToken);

        const user = await fetch(`http://${process.env.REACT_APP_HOSTNAME}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + user.userToken,
            },
            body: JSON.stringify({ user: decode }),
        });

        const result = (await user.json());
        console.log(result)
        return result.newUser;
    }else{
        navigate("/login");
        return -1;
    }
}

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, setUser, verifyCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};