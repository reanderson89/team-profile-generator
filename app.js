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

// function createTeam(){
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "position",
//             message: "Would you like to add a Team Member?",
//             choices: ["Manager", "Intern", "Engineer", "No, I'm all done."]
//         }
//     ]).then(data => {
//         if (data.position === "Manager"){
//             createManager();
//         } else if (data.position === "Intern") {
//             createIntern();
//         } else if (data.position === "Engineer") {
//             createEngineer();
//         } else {
//             console.log (managerArray);
//             console.log (internArray);
//             console.log (engineerArray);
//         }
//     });
    
// }

// function createManager(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "managerName",
//             message: "What is their name?",
//         },
//         {
//             type: "input",
//             name: "managerId",
//             message: "What is their ID number?",
//         },
//         {
//             type: "input",
//             name: "managerEmail",
//             message: "What is their email address?",
//         },
//         {
//             type: "input",
//             name: "managerOffice",
//             message: "What is their office number?",
//         }
//     ]).then(data => {
//         managerArray.push(new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice));
//         console.log(managerArray);
//         createTeam();
//     })
//     };

// function createIntern(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "internName",
//             message: "What is their name?",
//         },
//         {
//             type: "input",
//             name: "internId",
//             message: "What is their ID number?",
//         },
//         {
//             type: "input",
//             name: "internEmail",
//             message: "What is their email address?",
//         },
//         {
//             type: "input",
//             name: "internSchool",
//             message: "What school do they go to?",
//         },
//     ]).then(data => {
//         internArray.push(new Intern(data.internName, data.internId, data.internEmail, data.internSchool));
//         console.log(internArray);
//         createTeam();
//     })
//     };

// function createEngineer(){
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "engineerName",
//             message: "What is their name?",
//         },
//         {
//             type: "input",
//             name: "engineerId",
//             message: "What is their ID number?",
//         },
//         {
//             type: "input",
//             name: "engineerEmail",
//             message: "What is their email address?",
//         },
//         {
//             type: "input",
//             name: "engineerGithub",
//             message: "What is their GitHub Username?",
//         },
//     ]).then(data => {
//         engineerArray.push(new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub));
//         console.log(engineerArray);
//         createTeam();
//     })
//     };



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
    console.log("Your team is ready to go!".brightGreen.underline);
};

createTeam();


    

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
