import React from "react";

import "./App.css";
import LayoutArea from "./Components/LayoutArea/LayoutArea";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <LayoutArea />
    </div>
  );
}

export default App;
