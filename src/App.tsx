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
      <ScrollToTop smooth
  className="scrollUp"
  style={{
    borderRadius: '100%',
    background: 'var(--color-gold-neon)',
    boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.54)',
    color: 'blue'
  }}/>
    </div>
  );
}

export default App;
