import * as vscode from 'vscode';
import { PersistanceService } from './infraestructure/persistence/persistence.service';
import {
  CollectionSidebarViewProvider,
  registerCollectionViewProvider
} from './infraestructure/views/collection.view-provider';
import { registerRequestWebview } from './infraestructure/webviews/request.webview';

export function activate(context: vscode.ExtensionContext) {
  // init data base
  PersistanceService.getInstance().initService(context);

  // register sidebar collection view
  registerCollectionViewProvider(context);

  // register Request webview with corresponding command
  registerRequestWebview(context);
}

export function deactivate() {}
