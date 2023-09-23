import * as React from "react";
import { environment } from "../../../environment-config";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import "./App.css";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const App = () => {
  return (
    <>
      <VSCodeButton>New request</VSCodeButton>
    </>
  );
};
