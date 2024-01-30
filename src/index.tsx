import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./globalStyles";
import { DarkModeProvider } from "./store/context";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(<>
    <DarkModeProvider>
    <GlobalStyle /> 
      <App />
    </DarkModeProvider>
  </>);
}
