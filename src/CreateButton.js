import { Component } from "obsidian";
import { v4 as uuidv4 } from "uuid";

// A class to create a button in the page
class CreateButton extends Component {
	constructor(
		app,
		template,
		buttonName,
		buttonLabel,
		buttonColor,
		saveLocation
	) {
		super(app);
		this.template = template;
		this.buttonName = buttonName;
		this.buttonLabel = buttonLabel;
		this.buttonColor = buttonColor;
		this.saveLocation = saveLocation;
	}

	onload() {
		// Create a file in .obsidian/plugins/Template\ Flow/Buttons
		const buttonPath = `.obsidian/plugins/Template Flow/Buttons/${this.buttonName}.md`;

		// create the yaml object
		const buttonYaml = {
			id: uuidv4(),
			template: this.template,
			buttonName: this.buttonName,
			buttonLabel: this.buttonLabel,
			buttonColor: this.buttonColor,
			saveLocation: this.saveLocation,
		};

		// Check for a file named the same as the button in .obsidian/plugins/Template\ Flow/Buttons
		// If it exists, throw an error
		const buttonFile = this.app.vault.getAbstractFileByPath(buttonPath);
		if (buttonFile) {
			// Display an error message as a notification that the button already exists
			new Notice("A button with that name already exists");
			return;
		} else {
			// Create the file
			this.app.vault.create(buttonPath, buttonYaml);

			// Create the button
			const button = new TemplateButton(this.app, buttonYaml);
			button
				.setButtonText(this.buttonLabel)
				.setCta()
				.setButtonColor(this.buttonColor);

			return button;
		}

		// Check if that template is already a button file
		// If it is, throw an error
		// If it isn't, create the button file
	}
}

export default CreateButton;
