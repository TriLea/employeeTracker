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
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
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
                    'Add department', 
                    'Quit' 
                ]
            }
        ] 
    )
    .then((answer)=> { 

        switch(answer.choice) {
            case "Add employee":
                addEmployee();
            break;

            case "Update employee":
                updateEmployee();
            break;

            case "View all roles":
                viewAllRoles();
            break;

            case "Add role":
                addRole();
            break;

            case "View all departments":
                viewAllDepartments();
            break;

            case "Add department":
                addDepartment();
            break;

            case "Quit":
                quit();
            break;

            default:
                console.log("incorrect input");
        }
    })
}

function addEmployee()
{
    const sqlRole = `SELECT id, title FROM role;`;

    db.query(sqlRole, [], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        var roleList = [];
        for (var i = 0; i < result.length; i++)
        {
            roleList.push({name: result[i].title, value: result[i].id});
        }
        
        const sqlManager = `SELECT id, first_name, last_name FROM employee;`;

        db.query(sqlManager, [], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            var managerList = [];
            for (var i = 0; i < result.length; i++)
            {
                managerList.push({name: result[i].first_name + " " + result[i].last_name, value: result[i].id});
            }

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
                        type: 'list',
                        message: 'What is the employee\'s role?',
                        name: 'roleID',
                        choices: roleList
                    },
                    {
                        type: 'list',
                        message: 'Who is the employee\'s manager?', //ask for last name also
                        name: 'managerID',
                        choices: managerList
                    }
                ]
            )
            .then((answers) => {
                console.log("add employee hit");
                console.log(answers);

                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
                    ("${answers.firstName}", "${answers.lastName}", ${answers.roleID}, ${answers.managerID});`;

                db.query(sql, [], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //console.table(result);
                    console.log("employee added");
                });

                menu(); //employee menu would display choices and direct to the appropriate function to do next
            });
        });
    });
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
        console.log("update employee hit");
        
        menu(); //employee menu would display choices and direct to the appropriate function to do next
    })
}

function viewAllRoles()
{
    inquirer.prompt(
        [
            //console.table
        ]
    )
    .then((answers) => {
        console.log("view all roles hit");

        const sql = `SELECT role.id AS id, title, salary,  department.name AS department
        FROM role 
        JOIN department ON role.department_id = department.id
        ORDER BY role.id;`

        db.query(sql, [], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(result);
        });
        
        menu(); //employee menu would display choices and direct to the appropriate function to do next
    })
}

function addRole()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s id',
                name: 'id'
            },
            {
                type: 'input',
                message: 'What is the employee\'s title?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the employee\'s salary?',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'Who is the employee\'s department?',
                name: 'department'
            }
        ]
    )
    .then((answers) => {
        console.log("add role hit");
        
        menu(); //employee menu would display choices and direct to the appropriate function to do next
    })
}

function viewAllDepartments()
{
    inquirer.prompt(
        [
            //console.table
        ]
    )
    .then((answers) => {
        console.log("view all departments hit");
        
        menu(); //employee menu would display choices and direct to the appropriate function to do next
    })
}

function addDepartment()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employee\'s id?',
                name: 'id'
            },
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
        ]
    )
    .then((answers) => {
        console.log("add department hit");
        
        menu(); //employee menu would display choices and direct to the appropriate function to do next
    })
}

function quit()
{
    console.log("Goodbye");
    //maybe save something here first?
    //return false;
    process.exit();
}

menu();

// while (menu())
// {
// }