const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const teamArray = []; // to store team, gets passed to buildteam() which renders html

const db = mysql.createConnection(
    {
      host: 'localhost', //3001?
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Aperture1', 
      database: '' //fix
    },
    console.log(`Connected to the movies_db database.`) // fix
);

function menu()
{
    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['Add employee', 
                'Update employee',
                 'View all roles', 
                 'Add role', 
                'View all departments', 
                'Add department']
            }
        ]
        
    )
    .then((choice)=> {

        switch(choice.choices) {
            case "":
                addEmployee();
            break;

            case "":
                updateEmployee();
            break;

            case "":
                viewAllRoles();
            break;

            case "":
                addRole();
            break;

            case "":
                viewAllDepartments();
            break;

            case "":
                addDepartment();
            break;

            default:
                console.log("incorrect input");
        }
    })
}

function addEmployee()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employee\'s manager?',
                name: 'manager'
            }
        ]
    )
    .then((answers) => {
        //save the data?
        // const sql = `INSERT INTO movies (movie_name) 
        // VALUES (?)`;
        // const params = [body.movie_name];

        menu(); //employee meny would display choices
        //and direct to the appropriate function
    })
}

function updateEmployee()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employee\'s manager?',
                name: 'manager'
            }
        ]
    )
    .then((answers) => {
        //save the data?
        // const sql = `INSERT INTO movies (movie_name) 
        // VALUES (?)`;
        // const params = [body.movie_name];

        menu(); //employee meny would display choices
        //and direct to the appropriate function
    })
}

function viewAllRoles()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employee\'s manager?',
                name: 'manager'
            }
        ]
    )
    .then((answers) => {
        //save the data?
        // const sql = `INSERT INTO movies (movie_name) 
        // VALUES (?)`;
        // const params = [body.movie_name];

        menu(); //employee meny would display choices
        //and direct to the appropriate function
    })
}

function addRole()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employee\'s manager?',
                name: 'manager'
            }
        ]
    )
    .then((answers) => {
        //save the data?
        // const sql = `INSERT INTO movies (movie_name) 
        // VALUES (?)`;
        // const params = [body.movie_name];

        menu(); //employee meny would display choices
        //and direct to the appropriate function
    })
}

function viewAllDepartments()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employee\'s manager?',
                name: 'manager'
            }
        ]
    )
    .then((answers) => {
        //save the data?
        // const sql = `INSERT INTO movies (movie_name) 
        // VALUES (?)`;
        // const params = [body.movie_name];

        menu(); //employee meny would display choices
        //and direct to the appropriate function
    })
}

function addDepartment()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the employee\'s role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employee\'s manager?',
                name: 'manager'
            }
        ]
    )
    .then((answers) => {
        //save the data?
        // const sql = `INSERT INTO movies (movie_name) 
        // VALUES (?)`;
        // const params = [body.movie_name];

        menu(); //employee meny would display choices
        //and direct to the appropriate function
    })
}
