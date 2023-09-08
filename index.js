const inquirer = require('inquirer');
const {Circle, Square, Triangle} = require("./lib/shapes");

// An array of questions to be positied to the user using inquirer
const questions = [
    {
        type: "input",
        name: "text",
        message: "Type up to 3 characters for your logo:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Type a color for the text of your logo:",
    },
    {
        type: "list",
        name: "shape-type",
        message: "Choose a shape for your logo:",
        choices: ["Circle", "Square", "Triangle"],
    },
    {
        type: "input",
        name: "shape-color",
        message: "Type a color for the shape of your logo:",
    },
];

// Function to write data to file
function writeToFile(fileName, data) {
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Generated logo");
    });
};

async function init() {
	var svgString = "";
	var fileName = "logo.svg";
    var logoText = "";
    let logoShape;

    //Prompt the user for answers
    const answers = await inquirer.prompt(questions);

	if (answers.text.length > 0 && answers.text.length < 3) {
		logoText = answers.text;
	} else {
		console.log("Please type 1-3 characters");
        return;
	}

	textColor = answers["text-color"];
	shapeColor = answers["shape-color"];
	shapeType = answers["shape-type"];

	if (shapeType === "Square") {
		logoShape = new Square();
	}

	else if (shapeType === "Circle") {
		logoShape = new Circle();
	}

	else if (shapeType === "Triangle") {
		logoShape = new Triangle();
	}
	logoShape.setColor(shapeColor);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(logoText, textColor);
	svg.setShapeElement(logoShape);
	svgString = svg.render();

	writeToFile(fileName, svgString); 
};

init();