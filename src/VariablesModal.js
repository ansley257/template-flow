// A class that extends modal to create a modal to enter variables

import { Modal, TextComponent, ColorPicker, ButtonComponent } from "obsidian";
import DateComponent from "./DateComponent";
import EmailComponent from "./EmailComponent";
import UrlComponent from "./UrlComponent";
import NumberComponent from "./NumberComponent";
import PasswordComponent from "./PasswordComponent";
import ImageComponent from "./ImageComponent";
import FileComponent from "./FileComponent";
import RangeComponent from "./RangeComponent";
import TelComponent from "./TelComponent";
import TimeComponent from "./TimeComponent";

class VariablesModal extends Modal {
	constructor(app, buttonYaml) {
		super(app);
		this.buttonYaml = buttonYaml;
	}

	onOpen() {
		 // Get the template
		 const template = this.buttonYaml.template;
        
		 // read the template file
		 const templateFile = this.app.vault.getAbstractFileByPath(template);
 
		 // Get the template content
		 const templateContent = templateFile.content;
 
		 // Get the variable definitions that are identified by '----' and '----'
		 const variableDefs = templateContent.match(/(?<=\-\-\-\-)(.*?)(?=\-\-\-\-)/g);
 
		// Create a header
		const { contentEl } = this;
		const header = contentEl.createEl("h2");
		header.innerText = "Enter variables";

		// Create a div for validation messages
		const validationDiv = contentEl.createEl("div");
		validationDiv.id = "variables-validation";

		// Create a div for the variables
		const variablesDiv = contentEl.createEl("div");
		variablesDiv.id = "variables";

		// Create an input element for each variable
		this.variableDefs.forEach((variable) => {
			// Create a div for the variable
			const variableDiv = variablesDiv.createEl("div");
			variableDiv.addClass("variable");

			// Create a label for the variable
			const variableLabel = variableDiv.createEl("label");
			variableLabel.innerText = variable.label;

			// Create an input for the variable
			const variableInput = null;
			switch (variable.type) {
				case "text":
					variableInput = new TextComponent(variableDiv);
					if (variable.default)
						variableInput.inputEl.placeholder = variable.default;
					variableInput.inputEl.id = variable.name;
					break;
				case "color":
					variableInput = new ColorPicker(variableDiv);
					variableInput.setColors([
						"#ff0000",
						"#ff8000",
						"#ffff00",
						"#00ff00",
						"#00ffff",
						"#0000ff",
						"#ff00ff",
						"#ffffff",
						"#000000",
					]);
					variableInput.inputEl.id = variable.name;
					break;
				case "date":
					variableInput = new DateComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "email":
					variableInput = new EmailComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "url":
					variableInput = new UrlComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "number":
					variableInput = new NumberComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "password":
					variableInput = new PasswordComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "image":
					variableInput = new ImageComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "file":
					variableInput = new FileComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "range":
					variableInput = new RangeComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "tel":
					variableInput = new TelComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				case "time":
					variableInput = new TimeComponent(variableDiv);
					variableInput.inputEl.id = variable.name;
					break;
				default:
					this.app.alertWarn(
						`Unknown variable type: ${variable.type}`
					);
					this.close();
			}
		});

		// Create a button to submit the variables
		const submitButton = new ButtonComponent(contentEl);
		submitButton.setButtonText("Submit");
		submitButton.onClick(() => {
			// Get the variables
			const variables = {};
			this.variableDefs.forEach((variable) => {
				variables[variable.name] = document.getElementById(
					variable.name
				).value;
			});
			// Call the submit function
			this.Submit(variables);
		});
	}

	onSubmit(variables) {
		// Get the template
		const template = this.buttonYaml.template;

		// read the template file
		const templateFile = this.app.vault.getAbstractFileByPath(template);

		// Get the template content
		const templateContent = templateFile.content;

		// Get the variable definitions that are identified by '----' and '----'
		const usedVariables = templateContent.match(/(?<=\-\-\-\-)(.*?)(?=\-\-\-\-)/g);

		// for each variable, replace the variable in the text with the value
		variables.forEach((variable) => {
			templateContent.replace(
				`{{${variable.name}}}`,
				variable.value ? variable.value : (variable.default ? variable.default : "**MISSING**")
			);
		});

		// Create a new file with the content
		const newFile = this.app.vault.create(
			`${Folder}/${templateFile.basename}.md`,
			templateContent
		);

	}

}

export default VariablesModal;
