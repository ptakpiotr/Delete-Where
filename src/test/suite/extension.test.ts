import * as assert from "assert";

import * as vscode from "vscode";
import { checkForWhereClause } from "../../helpers";

suite("Test Delete-Where extension", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Check for SQL commands with WHERE clause", () => {
    assert.equal(checkForWhereClause("DELETE FROM tab WHERE Id = 1;"), false);
    assert.equal(
      checkForWhereClause("UPDATE FROM tab SET Name = 'TEST' WHERE Id = 1;"),
      false
    );
  });

  test("Check for SQL commands without WHERE clause", () => {
    assert.equal(checkForWhereClause("DELETE FROM tab;"), true);
    assert.equal(
      checkForWhereClause("UPDATE FROM tab SET Name = 'TEST';"),
      true
    );
  });

  test("Check for SQL commands that are not included in checking process", () => {
    assert.equal(checkForWhereClause("SELECT * FROM tab"), false);
    assert.equal(
      checkForWhereClause("INSERT INTO tab(Age) VALUES (123)"),
      false
    );
  });

  test("Check for SQL commands with comments", () => {
    assert.equal(checkForWhereClause("--DELETE FROM tab;"), false);
  });
});
