import { Plugin } from "obsidian";
import TemplateModal from "./TemplateModal.js";

const DEFAULT_SETTINGS = {
	mySetting: "default",
};

export default class MyPlugin extends Plugin {
	async onload() {
		await this.loadSettings();

		// This adds a command that will create a new template flow button
		this.addCommand({
			id: "add-template-flow-button",
			name: "Add a template flow button",
			editorCallback: (editor) => {
				// Get the template folder from the settings
				const templates = this.settings.templatesFolder;
				// Get the names of the files in the template folder
				const templateNames = this.app.vault.getFiles(templates);
				// open the modal with the template names and save the returned button
				const button = new TemplateModal(
					this.app,
					templateNames
				).open();
				// Create the button in the editor
				editor.replaceRange(button, editor.getCursor());
				// Display a success notification
				new Notice("Button created");
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, "click", (evt) => {
			console.log("click", evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
