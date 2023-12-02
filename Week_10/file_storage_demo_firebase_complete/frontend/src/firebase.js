// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// ADD!! 
// getStorage - tells firebase we are using storage
import { getStorage} from "firebase/storage";

// copy pasted from firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCViEPaRV1gvCftmMUQeBFm6lLlbnuwJ3o",
  authDomain: "file-hosting-demo-98674.firebaseapp.com",
  projectId: "file-hosting-demo-98674",
  storageBucket: "file-hosting-demo-98674.appspot.com",
  messagingSenderId: "124690553297",
  appId: "1:124690553297:web:c9579e5a0e97798683a8f0",
  measurementId: "G-PTZFXH81BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ADD!!
export const storage = getStorage(app);