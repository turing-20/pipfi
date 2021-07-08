"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios_1 = require("axios");
// import * as FormData from 'form-data';
const FormData = require("form-data");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "pipfi" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("pipfi.share", () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed
        console.log("jashan share");
        // Display a message box to the user
        const editor = vscode.window.activeTextEditor;
        // vscode.window.showInformationMessage("res1");
        if (editor) {
            let document = editor.document;
            // Get the document text
            const documentText = document.getText();
            let bodyFormData = new FormData();
            bodyFormData.append("paste", documentText);
            const headers = bodyFormData.getHeaders();
            axios_1.default
                .post("https://p.ip.fi/", bodyFormData, { headers })
                .then((res) => {
                console.log(res.data, "share");
                vscode.env.clipboard.writeText(res.data).then(() => {
                    vscode.window
                        .showInformationMessage("Link copied if needed:\n" + res.data, "Open URL")
                        .then((selection) => {
                        if (selection == "Open URL") {
                            vscode.env.openExternal(vscode.Uri.parse(res.data));
                        }
                    });
                });
            })
                .catch((err) => {
                console.log(err);
                vscode.window.showInformationMessage("error");
            });
            // vscode.window.showInformationMessage("res");
            // DO SOMETHING WITH `documentText`
        }
    }));
    let disposable2 = vscode.commands.registerCommand("pipfi.selectShare", () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            let document = editor.document;
            const selection = editor.selection;
            const documentText = document.getText(selection);
            let bodyFormData = new FormData();
            bodyFormData.append("paste", documentText);
            const headers = bodyFormData.getHeaders();
            axios_1.default
                .post("https://p.ip.fi/", bodyFormData, { headers })
                .then((res) => {
                console.log(res.data, "selectShare");
                vscode.env.clipboard.writeText(res.data).then(() => {
                    vscode.window
                        .showInformationMessage("Link copied if needed:\n" + res.data, "Open URL")
                        .then((selection) => {
                        if (selection == "Open URL") {
                            vscode.env.openExternal(vscode.Uri.parse(res.data));
                        }
                    });
                });
            })
                .catch((err) => {
                console.log(err);
                vscode.window.showInformationMessage("error");
            });
        }
    }));
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map