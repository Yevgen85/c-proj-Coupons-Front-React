import React from "react";

import "./App.css";
import LayoutArea from "./Components/LayoutArea/LayoutArea";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <LayoutArea />
      <ScrollToTop smooth className="scroll-to-top"  />
    </div>
  );
}

export default App;
