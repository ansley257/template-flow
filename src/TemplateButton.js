// A class to create a button in the page

import { ButtonComponent } from "obsidian";

class TemplateButton extends ButtonComponent (buttonYaml) {
    constructor(app, buttonYaml) {
        super(app);
        this.buttonYaml = buttonYaml;
    }

    onClick() {
        // Open a modal to enter variables
        new VariablesModal(this.app, buttonYaml).open();
    }


}

export default TemplateButton;