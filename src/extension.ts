import * as vscode from 'vscode';
import { environment } from './environment-config';
import { PersistanceService } from './application/persistence/persistence.service';
import {
  registerSidebarCollectionViewProvider,
  registerSidebarHistoryViewProvider
} from './infrastructure/views';
import { registerRequestWebview } from './infrastructure/webviews/request.webview';

export function activate(context: vscode.ExtensionContext) {
  // init data base
  PersistanceService.getInstance().initService(context);

  // Register all the sidebar views
  registerSidebarCollectionViewProvider(context);
  registerSidebarHistoryViewProvider(context);

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
