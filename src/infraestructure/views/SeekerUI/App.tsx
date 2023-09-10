import * as React from "react";
import { environment } from "../../../environment-config";
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
//import "./App.css";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const App = () => {
  return (
    <>
      <h1>baby</h1>
      <input></input>
      <VSCodeTextField>Text Field Label</VSCodeTextField>
      {environment.dbScriptPath}
    </>
  );
};
