import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import IdCardPage from "./Pages/IdCardPage/IdCardPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/id-card/:Aadhaar" element={<IdCardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
