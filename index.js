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

function questionSet1() //name //function to start the app?
{
    inquirer.prompt(
    
        [
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What is your ID?',
                name: 'ID'
            },
        ]
    )
    .then((answers) => {
        const managerObj = new Manager(answers.name, answers.ID)

        const sql = `INSERT INTO movies (movie_name) 
        VALUES (?)`;
        const params = [body.movie_name];

        questionSetTwo(); //employee meny would display choices
        //and direct to the appropriate function
    })
}

function () //name //function to start the app?
{
    inquirer.prompt(
    
        [
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What is your ID?',
                name: 'ID'
            },
        ]
    )
    .then((answers) => {
        const managerObj = new Manager(answers.name, answers.ID)

        employeeMenu(); //employee meny would display choices
        //and direct to the appropriate function
    })
}

//call start