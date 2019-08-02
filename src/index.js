import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/app.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
