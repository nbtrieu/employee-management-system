const { prompt } = require('inquirer');
const db = require('./db'); // requiring the new Db object exported from the index.js in db folder
const logo = require('asciiart-logo');

require('console.table');

initApp();

function initApp() {
  const logoText = logo({ name: 'Employee Manager' }).render();
  console.log(logoText);
  showMenu();
};

function showMenu() {
  prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: 
      // ALTERNATIVELY: We can write each choice as an object with 2 key-value pairs: 
      // name (for display to users) and text (for computer to read)
        [
          'View all departments',
          'View all roles',
          'View all employees',
          'View employees by department',
          'View employees by manager',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'EXIT APP'
        ]
    }
  ])
  .then((userChoice) => {
    // console.log('user choice: ', userChoice);
    let choice = userChoice.options;
    switch (choice) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'View employees by department':
        viewEmployeesByDepartment();
        break;
      case 'View employees by manager':
        viewEmployeesByManager();
        break;
      case 'Add a department':
        addDepartments();
        break;
      case 'Add a role':
        addRoles();
        break;
      case 'Add an employee':
        addEmoloyees();
        break;
      case 'Update an employee role':
        updateEmployeeRoles();
        break;
      default:
        exitApp();
    }
  })
};

function viewDepartments() {
  db.selectAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    console.log('\n');
    console.table(departments);
  })
  .then(() => showMenu());
};

function viewRoles() {
  db.selectAllRoles()
  .then(([rows]) => {
    let roles = rows;
    console.log('\n');
    console.table(roles);
  })
  .then(() => showMenu());
};

function viewEmployees() {
  db.selectAllEmployees()
  .then(([rows]) => {
    let employees = rows;
    console.log('\n');
    console.table(employees);
  })
  .then(() => showMenu());
};

function viewEmployeesByDepartment() {
  db.selectAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id // the department.id will be the value for the key named 'department_Id' in the userChoice object
    })); // returns array of all department objects

    prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'By which department would you like to view employees?',
        choices: departmentChoices
      }
    ])
    .then((userChoice) => db.selectEmployeesByDepartment(userChoice.departmentId))
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => showMenu());
  })  
};

function viewEmployeesByManager() {
  db.selectAllEmployees()
  .then(([rows]) => {
    let employees = rows;
    let managerChoices = [];
    const employeeArray = employees.map(({ id, first_name, last_name, manager }) => ({
      name: `${first_name} ${last_name}`,
      manager: manager,
      value: id // the manager's employee.id will be the value for the key named 'managerOptions' in the userChoice object
    })); // returns array of all employee objects
    // console.log(employeeArray);
    for (let i = 0; i < employeeArray.length; i++) {
      if (employeeArray[i].manager === null) {
        managerChoices.push(employeeArray[i]);
      }
    }

    prompt([
      {
        type: 'list',
        name: 'managerOptions',
        message: 'By which manager would you like to view employees?',
        choices: managerChoices
      }
    ])
    .then(userChoice => db.selectEmployeesbyManager(userChoice.managerOptions))
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => showMenu());
  });
};

function addDepartments() {
  prompt([
    {
      type: 'input',
      name: 'newDepartmentName',
      message: 'What is the name of the new department?'
    }
  ])
  .then((userInput) => {
    db.insertDepartment(userInput.newDepartmentName)
  })
  .then(() => console.log('New department successfully added!'))
  .then(() => viewDepartments());
};

function addRoles() {
  db.selectAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the new role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'To which department does the new role belong?',
        choices: departmentChoices
      }
    ])
    .then((userInput) => {
      console.log(userInput);
      db.insertRole(userInput);
    })
    .then(() => console.log('New role successfully added!'))
    .then(() => viewRoles());
  })
  
}

function exitApp() {
  console.log('You are now exiting the Employee Manager System. Goodbye~');
  process.exit();
}