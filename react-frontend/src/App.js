import './App.css';
import React, { Component } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HWSet from "./components/HWSet";
import Project from "./components/Project";
import history from './History';

function App() {
  return (
      <Router history={history}>
          <Routes>
          <Route path="/" element={<Login/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/Project" element={<Project/>} />
          </Routes>
      </Router>
  )
}

export default App;
