import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalState from "./context/GlobalState.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalState>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </GlobalState>
  </React.StrictMode>
);
