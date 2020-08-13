import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Landing from "./containers/Landing/Landing";

function App() {
  return (
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
}

export default App;
