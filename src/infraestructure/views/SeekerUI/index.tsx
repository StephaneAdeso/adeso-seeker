import React = require("react");
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = createRoot(document.getElementById("seekerSideBar")!);

/* TODO: keep researching how menus works  */
root.render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);
