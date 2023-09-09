import * as vscode from "vscode";
import { UtilityService as Us } from "../../domain/services/util.service";

export class SeekerSidebarViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "seeker.sidebarView";
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) { }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "dist", "seeker-ui.js"
      )
    );

    /*   const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "/dist/main.css"));

    <link href="${styleUri}" rel="stylesheet" type="text/css"/> */

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Seekers</title>
        </head>
        <body>    
            
            <div id="seekerSideBar"></div>
            <script nonce="${Us.getNonce()}" src="${scriptUri}"></script>
        </body>
        </html>`;
  }
}
