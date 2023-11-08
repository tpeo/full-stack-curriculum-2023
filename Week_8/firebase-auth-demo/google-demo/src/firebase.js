// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD1x9Qfx0VuVYddqW-Wl6YuDPzmoCqvNg",
  authDomain: "login-demo-tpeo.firebaseapp.com",
  projectId: "login-demo-tpeo",
  storageBucket: "login-demo-tpeo.appspot.com",
  messagingSenderId: "1053261827193",
  appId: "1:1053261827193:web:a3011f3357dfc64e4798a8"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export {auth, firebase};

