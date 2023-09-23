import * as vscode from 'vscode';
import { newCollection, newRequest } from './infraestructure/commands';
import { PersistanceService } from './infraestructure/persistence/persistence.service';
import { SeekerSidebarViewProvider } from './infraestructure/providers/seeker-sidebar.view-provider';

export function activate(context: vscode.ExtensionContext) {
  // init data base
  PersistanceService.getInstance().initService(context);

  context.subscriptions.push(...registerCommands(), ...registerViews(context));
}

export function deactivate() {}

/* ----------------------------------------------
|                  COMMANDS                     |
---------------------------------------------- */
const registerCommands = () => {
  const commandDisposables: vscode.Disposable[] = [];

  commandDisposables.push(
    vscode.commands.registerCommand('adeso-seeker.new-request', newRequest),
    vscode.commands.registerCommand(
      'adeso-seeker.new-collection',
      newCollection
    )
  );

  return commandDisposables;
};

/* ----------------------------------------------
|                     VIEWS                     |
---------------------------------------------- */
const registerViews = (context: vscode.ExtensionContext) => {
  const viewsDisposables: vscode.Disposable[] = [];

  viewsDisposables.push(
    vscode.window.registerWebviewViewProvider(
      SeekerSidebarViewProvider.viewType,
      new SeekerSidebarViewProvider(context.extensionUri)
    )
  );

  return viewsDisposables;
};
