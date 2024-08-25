import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { defineChain } from 'thirdweb/chains'
import { StateContextProvider } from "./context/index.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ThirdwebProvider desiredChainId={137} activeChain={11155111}>
    <StrictMode>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </StrictMode>
  </ThirdwebProvider>
);
