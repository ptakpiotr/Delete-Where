"use strict";
import * as vscode from "vscode";
import { checkForWhereClause } from "./helpers";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("delete-where.checkWhere", () => {
      const activeEditor = vscode.window.activeTextEditor;

      if (!activeEditor) {
        return;
      }

      const commands = activeEditor.document.getText();

      if (commands && commands.length > 0) {
        let containsInvalidCommands = checkForWhereClause(commands);

        if (containsInvalidCommands) {
          vscode.window.showWarningMessage(
            "UPDATE or DELETE operation without WHERE clause detected"
          );
        } else {
          vscode.window.showInformationMessage(
            "All UPDATE and DELETE operations contain WHERE clause"
          );
        }
      }
    })
  );
}

export function deactivate() {}
