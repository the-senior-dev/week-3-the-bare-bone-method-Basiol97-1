import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./globalStyles";
import "./styles.css";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(<>
    <GlobalStyle /> 
    <App />
  </>);
}
