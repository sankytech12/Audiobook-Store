import React from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import AudiobookPage from "./pages/AudiobookPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/audiobooks/:id" element={<AudiobookPage />} />
      </Routes>
    </>
  );
};

export default App;
