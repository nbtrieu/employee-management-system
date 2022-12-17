const { prompt } = require('inquirer');
const mysql = require('mysql2');
// const db = require('./db');
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
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ]
    }
  ])
  .then((userChoice) => {
    console.log('user choice: ', userChoice);
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