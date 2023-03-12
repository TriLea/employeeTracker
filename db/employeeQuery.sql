SELECT e1.id AS id, e1.first_name AS first_name, e1.last_name AS last_name, 
role.title AS role, 
department.name AS department, role.salary AS salary, 
e2.first_name AS manager_first_name, 
e2.last_name AS manager_last_name,
FROM employee AS e1, employee AS e2, role, department
where e1.role_id = role.id
and role.department_id = department.id
and e1.manager_id = e2.id;

SELECT id FROM role WHERE title = ${roleName};

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("${}", "${}", , );