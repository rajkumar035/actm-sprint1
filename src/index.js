import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GoogleAuthenticationProvider from "./contexts/GoogleAuthContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const actmTheme = createTheme({
  palette: {
    primary: {
      main: "#3A5199",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={actmTheme}>
    <BrowserRouter>
      <GoogleAuthenticationProvider>
        <App />
      </GoogleAuthenticationProvider>
    </BrowserRouter>
  </ThemeProvider>
);
