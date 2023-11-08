import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="1053261827193-1f54q857b86f1e773bpkda3m34138dk3.apps.googleusercontent.com">
      <BrowserRouter>
        <React.StrictMode>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
        </React.StrictMode>
      </BrowserRouter>
    </GoogleOAuthProvider>
,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
