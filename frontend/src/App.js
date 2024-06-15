import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Host } from "./pages/Host";
import { Detail } from "./pages/Detail";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import MyPosts from "./components/Post/MyPost";
import MyBooking from "./components/Home/Book/MyBooking";

const App = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/stay/:id" element={<Detail />} />
      <Route path="my-posts" element={<MyPosts />} />
      <Route path="host" element={<Host />} />
      <Route path="book" element={<MyBooking />} />
      <Route path="*" element={<h1>NotFound</h1>} />
    </Routes>
  );
};

export default App;