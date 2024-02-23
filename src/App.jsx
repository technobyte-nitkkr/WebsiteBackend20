import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from "./components/Login";

import BusyIndicator from "./components/BusyIndicator";

import MobileNotification from "./components/MobileNotification";
import Events from "./components/Events";
import RegisteredUsers from "./components/RegisteredUser";
import { getUser } from "./components/auth";
import Error from "./components/Error";
import axios from "axios";

function App() {
  const user = getUser();
  const [busy, setBusy] = useState(true)
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, []);

  const fetchCategories = async () => {
    try {
      setBusy(true);
      const response = await axios("https://us-central1-techspardha-87928.cloudfunctions.net/api2/events/categories",{
        headers: {
          "Cache-Control": "no-cache",
      }
      });
      
      const data =response.data;
      console.log(data);
      setCategories(data.data.categories);
      // setSelectedEvent("select");
    } catch (error) {
      console.log(error);
      alert("Error fetching categories");
    } finally {
      setBusy(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setBusy(true);
      const response = await axios("https://us-central1-techspardha-87928.cloudfunctions.net/api2/events", { headers: { cache: "no-cache", "Cache-Control": "no-cache", }});
      const data = response.data;
      console.log(data.data);
      setEvents(data.data.events);
    } catch (error) {
      console.log(error);
      alert("Error fetching events");
    } finally {
      setBusy(false);
    }
  };
  const isAuthorized = user && (user.role === "admin" || user.role === "manager");

  return (
  
    <div className="App">
        <BusyIndicator busy={busy} />
      {!user && <Login />}
      {/* Add other components here for logged-in users */}
   
      {user && (<>
        <Navbar />
        <br/>
        <br/>
        {!isAuthorized && (<Error />)}
        {isAuthorized && (<>

          <Events setBusy={setBusy} allEvents={events} categories={categories} />
          <br />
          <br />
          <br />
          <br />
          <MobileNotification setBusy={setBusy} />
          <br />
          <br />
          <br />
          <br />
          <RegisteredUsers setBusy={setBusy} allEvents={events} categories={categories} />
        </>)}
      </>)}
    </div>
  );
}

export default App;