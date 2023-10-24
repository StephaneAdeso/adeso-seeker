/* eslint-disable no-unused-vars */
import * as vscode from 'vscode';
import { UtilityService as Us } from '../../domain/services/util.service';
import { DocumentTitles } from '../enums/document-titles.enum';

export class CollectionSidebarViewProvider
  implements vscode.WebviewViewProvider
{
  public static readonly viewType = 'seeker.collectionsSidebar';
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

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
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'seekerUi.js')
    );

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'main.css')
    );

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <link href="${styleUri}" rel="stylesheet" type="text/css"/> 
            <title>${DocumentTitles.sidebarCollections}</title>            
        </head>
        <body>    
            
            <div id="seekerRoot"></div>
            <script nonce="${Us.getNonce()}" src="${scriptUri}"></script>
        </body>
        </html>`;
  }
}

/**
 * Register the Sidebar Collections view in vscode and
 * add the disposable to vscode extension context.
 * @param contexte vscode disposable.
 */
export const registerCollectionViewProvider = (
  context: vscode.ExtensionContext
): void => {
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      CollectionSidebarViewProvider.viewType,
      new CollectionSidebarViewProvider(context.extensionUri)
    )
  );
};
