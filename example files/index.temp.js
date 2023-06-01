// Description: This is the main file for the plugin, it is the entry point for the plugin.
// This plugin is based on the sample plugin from the Obsidian SDK.
// This plugin adds a configurable button to a page that will prompt 
// the user to input information, create a new page, and insert a template with the information.

import { MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

const DEFAULT_SETTINGS = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {

	async onload() {
		await this.loadSettings();

		// // This adds a simple command that can be triggered anywhere
		// this.addCommand({
		// 	id: 'add-button',
		// 	name: 'Add a button',
		// 	callback: () => {
		// 		new SampleModal(this.app).open();
		// 	}
		// });
		// // This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: 'sample-editor-command',
		// 	name: 'Sample editor command',
		// 	editorCallback: (editor, view) => {
		// 		console.log(editor.getSelection());
		// 		editor.replaceSelection('Sample Editor Command');
		// 	}
		// });
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'add-template-flow-button',
		// 	name: 'Add a template flow button',
		// 	checkCallback: (checking) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// });

		// This adds a command that will create a new template flow button
		this.addCommand({
			id: 'add-template-flow-button',
			name: 'Add a template flow button',
			editorCallback: (editor) => {
				// Get the template folder from the settings
				const templates = this.settings.templatesFolder;
				// Get the names of the files in the template folder
				const templateNames = this.app.vault.getFiles(templates);
				// open the modal with the template names
				new TemplateModal(this.app, templateNames).open();
			  },
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class TemplateModal extends Modal {
	constructor(app, templateNames) {
		super(app);
		this.templateNames = templateNames;
	}

	onOpen() {
		const {contentEl} = this;
		// Create a select element
		const select = contentEl.createEl('select');
		// Add an option for each template
		this.templateNames.forEach(template => {
			const option = select.createEl('option');
			option.value = template.path;
			option.innerText = template.name;
		});
		// Add a button to create the template
		const button = contentEl.createEl('button');
		button.innerText = 'Create Template';
		button.addEventListener('click', () => {
			// Get the selected template
			const selected = select.options[select.selectedIndex].value;
			// Call the create button function
			this.createButton(selected);
			// Close the modal
			this.close();
		}
		);
	}
}
			


class SampleModal extends Modal {
	constructor(app) {
		super(app);
	}

	onOpen() {	
		const {contentEl} = this;
		// set the content of the modal to content
		contentEl.appendChild(content);
		
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

}

class SampleSettingTab extends PluginSettingTab {

	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

// This function creates the button in the current editor at the current cursor position
function createButton(template) {
	// 
}