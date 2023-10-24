import * as vscode from 'vscode';
import { environment } from './environment-config';
import { PersistanceService } from './infrastructure/persistence/persistence.service';
import { registerCollectionViewProvider } from './infrastructure/views/collection.view-provider';
import { registerRequestWebview } from './infrastructure/webviews/request.webview';

export function activate(context: vscode.ExtensionContext) {
  // init data base
  PersistanceService.getInstance().initService(context);

  // register sidebar collection view
  registerCollectionViewProvider(context);

  // register Request webview with corresponding command
  registerRequestWebview(context);

  // automaticly open devtools when debugging the extension
  if (!environment.isProduction) {
    setTimeout(() => {
      vscode.commands.executeCommand(
        'workbench.action.webview.openDeveloperTools'
      );
    }, 500);
  }
}

export function deactivate() {}
