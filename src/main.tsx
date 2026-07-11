import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-circular-progressbar/dist/styles.css";
import "./styles/globals.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
