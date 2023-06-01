// A jest file that tests the CreateButton class from src/CreateButton.js:
//
// // Path: src/tests/CreateButton.test.js

// Import the CreateButton class
import { it } from "node:test";
import CreateButton from "../CreateButton";

// Mock the app object
const app = {
	vault: {
		create: jest.fn(),
		getAbstractFileByPath: jest.fn(),
	},
};

// Mock the uuidv4 function
jest.mock("uuid", () => ({
	v4: jest.fn(() => "1234"),
}));

// Mock the Notice class
jest.mock("obsidian", () => ({
	Notice: jest.fn(),
}));

// Mock the TemplateButton class
jest.mock("../TemplateButton", () => ({
	__esModule: true,
	setButtonText: jest.fn(),
	setCta: jest.fn(),
	setButtonColor: jest.fn(),
}));

// Test the CreateButton class
describe("CreateButton", () => {
	// Test the constructor
	describe("constructor", () => {
		it("should set the app property", () => {
			// Arrange
			const expected = app;

			// Act
			const actual = new CreateButton(app);

			// Assert
			expect(actual.app).toEqual(expected);
		});

		it("should set the template property", () => {
			// Arrange
			const expected = "template";

			// Act
			const actual = new CreateButton(app, "template");

			// Assert
			expect(actual.template).toEqual(expected);
		});

		it("should set the buttonName property", () => {
			// Arrange
			const expected = "buttonName";

			// Act
			const actual = new CreateButton(app, "template", "buttonName");

			// Assert
			expect(actual.buttonName).toEqual(expected);
		});

		it("should set the buttonLabel property", () => {
			// Arrange
			const expected = "buttonLabel";

			// Act
			const actual = new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel"
			);

			// Assert
			expect(actual.buttonLabel).toEqual(expected);
		});

		it("should set the buttonColor property", () => {
			// Arrange
			const expected = "buttonColor";

			// Act
			const actual = new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel",
				"buttonColor"
			);

			// Assert
			expect(actual.buttonColor).toEqual(expected);
		});

		it("should set the saveLocation property", () => {
			// Arrange
			const expected = "saveLocation";

			// Act
			const actual = new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel",
				"buttonColor",
				"saveLocation"
			);

			// Assert
			expect(actual.saveLocation).toEqual(expected);
		});
	});

	// Test the onload method
	describe("onload", () => {
		it("should check if the button file already exists", () => {
			// Arrange
			const expected =
				".obsidian/plugins/Template Flow/Buttons/buttonName.md";

			// Act
			new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel",
				"buttonColor",
				"saveLocation"
			).onload();

			// Assert
			expect(app.vault.getAbstractFileByPath).toHaveBeenCalledWith(
				expected
			);
		});

		it("should create the button file if it doesn't exist", () => {
			// Arrange
			const expected =
				".obsidian/plugins/Template Flow/Buttons/buttonName.md";

			// Act
			new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel",
				"buttonColor",
				"saveLocation"
			).onload();

			// Assert
			expect(app.vault.create).toHaveBeenCalledWith(expected, {
				id: "1234",
				template: "template",
				buttonName: "buttonName",
				buttonLabel: "buttonLabel",
				buttonColor: "buttonColor",
				saveLocation: "saveLocation",
			});
		});

		it("should set the button text", () => {
			// Arrange
			const expected = "buttonLabel";

			// Act
			new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel",
				"buttonColor",
				"saveLocation"
			).onload();

			// Assert
			expect(setButtonText).toHaveBeenCalledWith(expected);
		});

		it("should set the button color", () => {
			// Arrange
			const expected = "buttonColor";

			// Act
			new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel",
				"buttonColor",
				"saveLocation"
			).onload();

			// Assert
			expect(setButtonColor).toHaveBeenCalledWith(expected);
		});

		it("should set the button cta", () => {
			// Arrange
			const expected = "buttonName";

			// Act
			new CreateButton(
				app,
				"template",
				"buttonName",
				"buttonLabel",
				"buttonColor",
				"saveLocation"
			).onload();

			// Assert
			expect(setCta).toHaveBeenCalledWith(expected);
		});
	});
});
