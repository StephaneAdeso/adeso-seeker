import * as vscode from 'vscode';
import { DocumentTitles } from '../enums/document-titles.enum';
import { UtilityService as Us } from '../../domain/services/util.service';

/**
 * Webviews are launched thru commands. This registers the request webview to
 * a package.json command id and add the disposable to vscode extension context.
 */
export const registerRequestWebview = (
  context: vscode.ExtensionContext
): void => {
  context.subscriptions.push(
    vscode.commands.registerCommand('adeso-seeker.new-request', () => {
      const requestPanel = vscode.window.createWebviewPanel(
        'seekerNewRequest', // ID of the webview
        'New request',
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      requestPanel.webview.html = getWebviewContent(
        requestPanel,
        context.extensionUri
      );
    })
  );
};

function getWebviewContent(
  panel: vscode.WebviewPanel,
  extensionUri: vscode.Uri
) {
  const scriptUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'dist', 'seekerUi.js')
  );

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${DocumentTitles.request}</title>          
      </head>
      <body>
          <div id="seekerRoot"></div>
          <script nonce="${Us.getNonce()}" src="${scriptUri}"></script>
      </body>
      </html>`;
}
