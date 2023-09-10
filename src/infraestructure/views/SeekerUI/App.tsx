import * as React from "react";
import { environment } from "../../../environment-config";
//import "./App.css";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const App = () => {
  return (
    <>
      <h1>baby</h1>
      <input></input>
      {environment.dbScriptPath}
    </>
  );
};
