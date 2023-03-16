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
                    menu(); //employee menu would display choices and direct to the appropriate function to do next
                });
            });
        });
    });
}

function updateEmployee()
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
        
        const sqlEmployee = `SELECT id, first_name, last_name FROM employee;`;

        db.query(sqlEmployee, [], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            var employeeList = [];
            for (var i = 0; i < result.length; i++)
            {
                employeeList.push({name: result[i].first_name + " " + result[i].last_name, value: result[i].id});
            }
        
            inquirer.prompt(
                [
                    {
                        type: 'list',
                        message: 'Select employee to update?',
                        name: 'employeeID',
                        choices: employeeList
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
                    {
                        type: 'list',
                        message: 'Select employee to update?',
                        name: 'roleID',
                        choices: roleList
                    },
                    {
                        type: 'list',
                        message: 'Who is the employee\'s manager?',
                        name: 'managerID',
                        choices: employeeList
                    }
                ]
            )
            .then((answers) => {
                console.log("update employee hit");

                const sql = `UPDATE employee 
                SET first_name = "${answers.firstName}", last_name = "${answers.lastName}", 
                role_id = ${answers.roleID}, manager_id = ${answers.managerID} WHERE id = ${answers.employeeID};`;

                db.query(sql, [], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //console.table(result);
                    console.log("employee updated");
                    menu(); //employee menu would display choices and direct to the appropriate function to do next
                });
            });
        });
    });
}

function viewAllRoles()
{
    const sql = `SELECT role.id AS id, title, salary,  department.name AS department
    FROM role 
    JOIN department ON role.department_id = department.id;`;

    db.query(sql, [], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
        menu(); //employee menu would display choices and direct to the appropriate function to do next
    });
}

function addRole()
{

    const sqlDepartment = `SELECT id, name FROM Department;`;

    db.query(sqlDepartment, [], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        var departmentList = [];
        for (var i = 0; i < result.length; i++)
        {
            departmentList.push({name: result[i].name, value: result[i].id});
        }
        inquirer.prompt(
            [
                {
                    type: 'input',
                    message: 'What is the role\'s Title?',
                    name: 'title'
                },
                {
                    type: 'input',
                    message: 'What is the role\'s salary?',
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'What is the role\'s department?',
                    name: 'departmentID',
                    choices: departmentList
                },
            ]
        )
        .then((answers) => {
            console.log("add role hit");

            const sql = `INSERT INTO role (title, salary, department_id) VALUES
                    ("${answers.title}", "${answers.salary}", ${answers.departmentID});`;
            
            
            db.query(sql, [], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                //console.table(result);
                console.log("Role added");
                menu(); //employee menu would display choices and direct to the appropriate function to do next
            }); 
        });
    });
}

function viewAllDepartments()
{
    const sql = `SELECT * FROM department;`;
    db.query(sql, [], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
        menu(); //employee menu would display choices and direct to the appropriate function to do next
    });
}

function addDepartment()
{
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the Departments\'s name?',
                name: 'name'
            },
        ]
    )
    .then((answers) => {

        const sql = `INSERT INTO department (name) VALUES
                ("${answers.name}");`;
        
        
        db.query(sql, [], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            //console.table(result);
            console.log("Department added");
            menu(); //employee menu would display choices and direct to the appropriate function to do next
        }); 
    });
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