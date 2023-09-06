import * as vscode from 'vscode';

export class SeekerSidebarViewProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = 'seeker.sidebarView';
    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) { }


    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void> {

        this._view = webviewView;

        webviewView.webview.html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Seekers</title>
        </head>
        <body>
        <h2> hello steph</h2>
        </body>
        </html>`;

    }

}