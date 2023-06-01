import { Modal, ColorPicker } from 'obsidian';
import CreateButton from './CreateButton';

class TemplateModal extends Modal {
	constructor(app, templateNames) {
		super(app);
		this.templateNames = templateNames;
	}

	onOpen() {
		const {contentEl} = this;
        // Create a header
        const header = contentEl.createEl('h2');
        header.innerText = 'Select a template';

        // Create a div for validation messages
        const validationDiv = contentEl.createEl('div');
        validationDiv.id = 'buttons-validation';

        // Create an input element for the button name
        const nameInput = validationDiv.createEl('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Button name';

        // Create an input element for the button label
        const labelInput = validationDiv.createEl('input');
        labelInput.type = 'text';
        labelInput.placeholder = 'Button label';

		// Create a select element
		const select = contentEl.createEl('select');

		// Add an option for each template
		this.templateNames.forEach(template => {
			const option = select.createEl('option');
			option.value = template.path;
			option.innerText = template.name;
		});

        // Create a field to enter the button color
        const colorInput = new ColorPicker(contentEl);
        colorInput.setColors([
            '#ff0000',
            '#ff8000',
            '#ffff00',
            '#00ff00',
            '#00ffff',
            '#0000ff',
            '#ff00ff',
            '#ffffff',
            '#000000',
        ]);

        // Create a field to enter the new file's folder
        const folderInput = contentEl.createEl('input');
        folderInput.type = 'text';
        folderInput.placeholder = 'Folder';

		// Add a button to create the template
		const button = contentEl.createEl('button');
		button.innerText = 'Create Template';
		button.addEventListener('click', () => {
			// Get the selected template
			const selected = select.options[select.selectedIndex].value;

            // Get the button name
            const buttonName = nameInput.value;

            // Get the button label
            const buttonLabel = labelInput.value;

            // Get the button color
            const buttonColor = colorInput.value;

            // Get the folder
            const folder = folderInput.value;

            // Check for a file named the same as the button in .obsidian/plugins/Template\ Flow/Buttons
            // If it exists, throw an error
            const buttonPath = `.obsidian/plugins/Template Flow/Buttons/${buttonName}.md`;
            const buttonFile = this.app.vault.getAbstractFileByPath(buttonPath);
            if (buttonFile) {
                // Create an error message in the buttons validation div
                const validationDiv = document.getElementById('buttons-validation');
                validationDiv.innerText = 'A button with that name already exists';
                return;
            } else {
                // Call the create button function
                new CreateButton(this.app, selected, buttonName, buttonLabel, buttonColor, folder);
                // Close the modal
                this.close();
            }
 
		});

        // Create a cancel button
        const cancelButton = contentEl.createEl('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.addEventListener('click', () => {
            this.close();
        });

        return button;
    } 
}

export default TemplateModal;