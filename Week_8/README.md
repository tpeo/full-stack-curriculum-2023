# Week 8: Advanced Authentication and Hosting

We've done a lot of backend work so far. We've learned how to write endpoints, connect to databases (Firebase), and now understand how authentication works by hand! This week is our last week fully focused on backend topics. We'll be exploring service providers that make the authentication process MUCH easier and automatic, as well as learn how to host our applications! You will finally be able to see your websites on the web!

# Materials

[Day 14: Advanced Authentication](https://docs.google.com/presentation/d/1720gkyjqSEaP1xq8Ky1P-JcbPrThGzGR/edit?usp=sharing&ouid=109884877973910636402&rtpof=true&sd=true)

[Day 15: Hosting](https://docs.google.com/presentation/d/197EnLf3-Y_gqubildTpmBVFvyJN-dhBo/edit?usp=sharing&ouid=109884877973910636402&rtpof=true&sd=true)

# Homework

This week, you'll be adding user authentication to your TODO app, which will allow users to sign in with their email and password. We'll be utilizing Firebase's Authentication service to handle the sign-in process securely.

## Getting Started

Before diving into the code, you'll need to set up email/password authentication in your Firebase project via the Firebase console. Make sure you've enabled the email/password sign-in method in the Authentication section.

Next, you need to have Firebase installed in your project:

```bash
npm install firebase
```

You will be changing BOTH the frontend and backend sections of your code! So make sure the firebase is installed on your frontend, and firebase-admin is installed on your backend. 

## Frontend Changes

We coded up a pretty simple AuthContext.js file a while back. It did it's job of creating dummy login and logout functions. It's time to fully flesh them out with actual user creation, login, and authentication using Firebase's functions.

Take a look at the following code:

```javascript
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Firebase project configuration (replace with your own)
// You can find this in Project Settings -> General -> Scroll Down
const firebaseConfig = {...};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up new users
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        // correct and formal way of getting access token
        userCredential.user.getIdToken().then((accessToken) => {
            console.log(accessToken)
        })
        navigate("/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  // Sign in existing users
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        // this method of retrieving access token also works
        console.log(userCredential.user.accessToken)
        navigate("/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  // Sign out users
  const logout = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
      navigate("/login");
    });
  };
```

Please understand this code! Once you do, insert it piece by piece into `AuthContext.js`. Different sections belong in different parts!

### IMPORTANT Changes

- The way we store `currentUser` has changed significantly.
- It's now a `User` object that is returned by the Firebase Admin SDK.

### Action Items

1. **Update `AuthContext.js`:** Integrate the new authentication logic.
2. **Implement User Object Handling:** Store the `User` object as `currentUser` in your state.
3. **Refactor Authentication Functions:**
    - `login`
    - `logout`
    - `register`
4. **UI Changes:**
    - Add a **Register** button to your application's interface.

### Next Steps

After updating `AuthContext.js`, proceed to test the new authentication flow:
- Can users register a new account?
- Are users able to log in and log out?


# Backend Authentication Middleware Integration

## Backend Middleware Update Instructions

We are now adding Firebase authentication middleware to our backend. This is crucial for securing our routes and ensuring that only authenticated users can access certain endpoints.

### Key Updates

- We will implement an authentication middleware using Firebase Admin SDK.
- Protected routes will be established, which require a valid Firebase ID token to access.

### Action Items

1. **Implement Firebase Authentication Middleware:** Reference the provided middleware code to set up the Firebase authentication middleware.
2. **Secure Routes:** Create at least one protected route that requires authentication.

### Update Express Application

Your express application code should be updated to include the Firebase admin initialization and the auth middleware.

We'll give you this middleware function 😉

```javascript
// ... existing code ...

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: "https://tpeo-todo.firebaseio.com", // replace this with your actual database URL
});

// ... existing code ...

// Firebase Admin Authentication Middleware
const auth = (req, res, next) => {
  try {
    const tokenId = req.get("Authorization").split("Bearer ")[1];
    admin.auth().verifyIdToken(tokenId)
      .then((decoded) => {
        req.token = decoded;
        next();
      })
      .catch((error) => res.status(401).send(error));
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

// ... existing code ...
```

### Create and Test a Protected Route

1. Ensure that the protected route is only accessible with a valid token.
2. Test the route with and without the `Authorization` header to verify that the protection is working correctly.