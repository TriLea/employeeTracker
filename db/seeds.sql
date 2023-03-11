INSERT INTO department (department)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 120000, 2);
     
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1),
       ("Jane", "Doe", 2, 1),
       ("Sally", "Smith", 3, 2);
