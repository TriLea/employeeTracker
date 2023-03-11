SELECT id, name FROM department 
ORDER BY id;

SELECT id, title, salary,  department.name AS department
FROM role 
JOIN department ON role.department_id = department.id
ORDER BY id;

SELECT e1.id AS id, e1.first_name AS first_name, e1.last_name AS last_name, 
role.title AS role, 
department.name AS department, role.salary AS salary, 
e2.first_name AS manager_first_name, 
e2.last_name AS manager_last_name,
FROM employee AS e1, employee AS e2, role, department
where e1.role_id = role.id
and role.department_id = department.id
and e1.manager_id = e2.id;

/*and employee.manager_id = (SELECT first_name + " " + last_name FROM employee where id = manager_id)*/

/*
JOIN role ON employee.role_id = role.id
JOIN department ON employee.role_id = 
*/