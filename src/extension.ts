// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
// import * as FormData from 'form-data';
const FormData = require('form-data');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pipfi" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pipfi.main', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		// vscode.window.showInformationMessage("res1");
        if (editor) {
            let document = editor.document;

            // Get the document text
            const documentText = document.getText();

			let bodyFormData = new FormData();
			bodyFormData.append('paste', documentText);
			const headers = bodyFormData.getHeaders();

			axios.post("https://p.ip.fi/",bodyFormData,{headers}).then((res)=>{
				console.log(res.data);

				vscode.env.clipboard.writeText(res.data).then(()=>{
					vscode.window.showInformationMessage(("Link copied if needed:\n"+ res.data),'Open URL').then((selection)=>{
						if(selection=='Open URL'){
							vscode.env.openExternal(vscode.Uri.parse(res.data))
						}
					})
				})
				

			}).catch((err)=>{
				console.log(err);
				vscode.window.showInformationMessage("error");
			})

			// vscode.window.showInformationMessage("res");
            // DO SOMETHING WITH `documentText`
        }
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
