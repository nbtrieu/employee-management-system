const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: employees_db
});

connection.connect((error) => {
  if (error) throw error;
});

class Db {
  constructor(connection) {
    this.connection = connection;
  }

  selectAllDepartments() {
    return this.connection.promise().query(`SELECT * FROM department;`);
  }

  selectAllRoles() {
    return this.connection.promise().query(`SELECT * FROM role;`);
  }

  selectAllEmployees() {
    return this.connection.promise().query(
      `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, 
      role.title AS title, department.name AS department, role.salary AS salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`
    );
  }

  selectEmployeesByDepartment(department_id) {
    return this.connection.promise().query(
      `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, 
      role.title AS title, department.name AS department, role.salary AS salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN department ON role.department_id = department.id
      WHERE department.id = ?`,
      department_id
    );
  }

  insertDepartment(newDepartment) {
    return this.connection.promise().query(`INSERT INTO department SET ?`, newDepartment);
  }

  insertRole(newRole) {
    return this.connection.promise().query(`INSERT INTO role SET ?`, newRole);
  }

  insertEmployee(newEmployee) {
    return this.connection.promise().query(`INSERT INTO employee SET ?`, newEmployee);
  }

  updateEmployeeRole(employee_id, role_id) {
    return this.connection.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role_id, employee_id]);
  }

  // maybe add delete functions too?
}

module.exports = new Db(connection);
