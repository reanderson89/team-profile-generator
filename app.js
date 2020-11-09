const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const colors = require("colors");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { isNumber } = require("util");

const employees = [];

function createTeam(){
    console.log("Let's start with your information first.".brightGreen.underline);
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            validate: (data) => {
                const number = data.match(/^[1-9]\d*$/);
                if (data === "" || data == number){
                    return "Please enter your name".brightRed;
                } 
                    return true;    
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID number?",
            validate: (data) => {
                const number = data.match(/^[1-9]\d*$/);
                if (data === "" || data != number){
                    return "Please enter your ID".brightRed;
                } 
                    return true; 
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
            validate: (data) => {
                if (data === ""){
                    return "Please enter your email address".brightRed;
                } 
                    return true; 
            },
        },
        {
            type: "input",
            name: "office",
            message: "What is your office number?",
            validate: (data) => {
                const number = data.match(/^[1-9]\d*$/);
                if (data === "" || data != number){
                    return "Please enter your ID".brightRed;
                } 
                    return true; 
            },
        },
    ]).then(data => {
        employees.push(new Manager(data.name, data.id, data.email, data.office)); 
        console.log("Time to create your team!".brightGreen.underline)
        createEmployee();
    });
    
}

function createEmployee(){
    inquirer.prompt([
        {
            type: "list",
            name: "position",
            message: "Would you like to add a Team Member?".grey,
            choices: ["Intern".green, "Engineer".green, "No thank you".brightRed],
        },
        {
            type: "confirm",
            name: "doubleCheck",
            message: "Are you sure you are all done?".yellow,
            when: (data) => data.position === "No thank you".brightRed,
        },
        {
            type: "input",
            name: "name",
            message: "What is their name?",
            when: (data) => data.position !== "No thank you".brightRed,
            validate: (data) => {
                const number = data.match(/^[1-9]\d*$/);
                if (data === "" || data == number){
                    return "Please enter their name".brightRed;
                } 
                    return true; 
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID number?",
            when: (data) => data.position !== "No thank you".brightRed,
            validate: (data) => {
                const number = data.match(/^[1-9]\d*$/);
                if (data === "" || data != number){
                    return "Please enter their ID".brightRed;
                } 
                    return true; 
            },

        },
        {
            type: "input",
            name: "email",
            message: "What is their email address?",
            when: (data) => data.position !== "No thank you".brightRed,
            validate: (data) => {
                if (data === ""){
                    return "Please enter their email address".brightRed;
                } 
                    return true; 
            },

        },
        {
            type: "input",
            name: "school",
            message: "What school do they attend?",
            when: (data) => data.position === "Intern".green,
            validate: (data) => {
                const number = data.match(/^[1-9]\d*$/);
                if (data === "" || data == number){
                    return "Please enter their school".brightRed;
                } 
                    return true; 
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is their GitHub username? "+"(No '@' needed)".red,
            when: (data) => data.position === "Engineer".green,
            validate: (data) => {
                if (data === ""){
                    return "Please enter their GitHub username".brightRed;
                } 
                    return true; 
            },
        }
    ]).then(data => {
        if (data.position === "Intern".green) {
            employees.push(new Intern(data.name, data.id, data.email, data.school));
            createEmployee();
        } else if (data.position === "Engineer".green) {
            employees.push(new Engineer(data.name, data.id, data.email, data.github));
            createEmployee();
        } else {
            writeHtml(employees);
        }
        
    })
    };
    
const writeHtml = (data) => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, (err) => {
            if (err) throw err;
        });
    }
    fs.writeFileSync(outputPath, render(data), (err) => {
        if (err) throw err;
    });
    console.log("Your team is ready to go! Please check the 'ouput' folder for your new HTML page.".brightGreen.underline);
};

createTeam();

