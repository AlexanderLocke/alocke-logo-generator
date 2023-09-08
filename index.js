const inquirer = require('inquirer');
const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const { Circle, Square, Triangle } = require("./lib/shapes");

class SVG {
    textElement = '';
    shapeElement = '';

    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

// An array of questions to be posed to the user using inquirer
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

// Function to write data to a file
function writeToFile(fileName, data) {
    filesystem.writeFile(fileName, data, function (err) { // Corrected the variable name
        if (err) {
            return console.log(err);
        }
        console.log("Generated logo");
    });
}

async function init() {
    var svgString = "";
    var fileName = "logo.svg";
    var logoText = "";
    let textColor; // Declare textColor variable
    let shapeColor; // Declare shapeColor variable
    let shapeType;

    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

    if (answers.text.length > 0 && answers.text.length < 4) {
        logoText = answers.text;
    } else {
        console.log("Please type 1-3 characters");
        return;
    }

    textColor = answers["text-color"];
    shapeColor = answers["shape-color"];
    shapeType = answers["shape-type"];

    let logoShape;

    if (shapeType === "Square") {
        logoShape = new Square();
    } else if (shapeType === "Circle") {
        logoShape = new Circle();
    } else if (shapeType === "Triangle") {
        logoShape = new Triangle();
    }

    logoShape.setColor(shapeColor);

    // Create a new Svg instance and add the shape and text elements to it
    var svg = new SVG();
    svg.setTextElement(logoText, textColor);
    svg.setShapeElement(logoShape);
    svgString = svg.render();

    writeToFile(fileName, svgString);
}

init();
