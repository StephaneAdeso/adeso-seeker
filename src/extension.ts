// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SeekerSidebarViewProvider } from './infraestructure/providers/seeker-sidebar.view-provider';
import { PersistanceService } from './infraestructure/persistence/persistence.service';
import { newCollection, newRequest } from './infraestructure/commands';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // init data base
  PersistanceService.getInstance().initService(context);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(...registerCommands());

  // sidebarViews
  const sidebarProvider = new SeekerSidebarViewProvider(context.extensionUri);
  vscode.window.registerWebviewViewProvider(
    SeekerSidebarViewProvider.viewType,
    sidebarProvider
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

const registerCommands = () => {
  const disposables: vscode.Disposable[] = [];

  disposables.push(
    vscode.commands.registerCommand('adeso-seeker.new-request', newRequest),
    vscode.commands.registerCommand(
      'adeso-seeker.new-collection',
      newCollection
    )
  );

  return disposables;
};
