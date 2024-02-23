import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from "./components/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Events from "./components/Events";

function App() {
  const isLoggedIn = localStorage.getItem("jwt") ? true : true;
// const   isLoggedIn = true;

  return (
    <GoogleOAuthProvider clientId="14707849805-il84msmthglkq4sqqb9ehoanjmq9ovau.apps.googleusercontent.com">
    <div className="App">
      {!isLoggedIn && <Login />}
      {/* Add other components here for logged-in users */}
      {isLoggedIn && (<>
        <Navbar />
        <Events/>
      </>)}
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;