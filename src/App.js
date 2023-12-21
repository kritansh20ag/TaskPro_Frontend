import "./App.css";
import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Userlogin from "./pages/Userlogin";
import UserSignup from "./pages/UserSignup";
import Profile from "./pages/Profile";
import Task from "./pages/Task";
import Userlogout from "./pages/Userlogout";
import Createtask from "./pages/Createtask";
import Deletetask from "./pages/Deletetask";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Notfound from "./pages/Notfound";
import Message from "./components/Message";

function App() {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <Userlogin />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <UserSignup />
                </>
              }
            />
            <Route
              path="/logout"
              element={
                <>
                  <Userlogout />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {" "}
                  <Profile />
                </>
              }
            />
            <Route
              path="/task"
              element={
                <>
                  <Task />
                </>
              }
            />
            <Route
              path="/create-task"
              element={
                <>
                  <Createtask />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route
              path="/delete-task"
              element={
                <>
                  <Deletetask />
                </>
              }
            />
              <Route
            path="/message"
            element={
             <Message/>
            }
            />
            <Route
            path="*"
            element={
              <Notfound/>
            }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default App;
