// importing classes from other files
import inquirer from "inquirer";
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';


// connect to the database
await connectToDb();

// define the Cli class
class Cli {
  //static method to display logo 
  static displayLogo(): void {
    console.log('|_____________________________________________________|');
    console.log('|                     WELCOME                         |');
    console.log('|                       TO                            |');
    console.log('|                 EMPLOYEE TRACKER                    |');
    console.log('|_____________________________________________________|');
  }

  

  // method to view all departments
  viewAllDepartments(): void {
    console.log('Viewing all departments...\n');
  }

  // method to view all roles
  viewAllRoles(): void {
    console.log('Viewing all roles...\n');
  }

  // method to view all employees
  viewAllEmployees(): void {
    console.log('Viewing all employees...\n');
  }

  // method to add a department
  addDepartment(): void {
    console.log('Adding a department...\n');
  }

  // method to add a role
  addRole(): void {
    console.log('Adding a role...\n');
  }

  // method to add an employee
  addEmployee(): void {
    console.log('Adding an employee...\n');
  }

  // method to update an employee role
  updateEmployeeRole(): void {
    console.log('Updating an employee role...\n');
  }



  // method to start the cli
  startCliMenu(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'mainMenu',
          message:
            'What would you like to do?',
          choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
        },
      ])
      .then((answers) => {
        // check what the user wants to do - base on the answer, call the respective method
        
        switch (answers.mainMenu) {
          case 'View All Departments':
            this.viewAllDepartments();
            break;
          case 'View All Roles':
            this.viewAllRoles();
            break;
          case 'View All Employees':
            this.viewAllEmployees();
            break;
          case 'Add Department':
            this.addDepartment();
            break;
          case 'Add Role':
            this.addRole();
            break;
          case 'Add Employee':
            this.addEmployee();
            break;
          case 'Update Employee Role':
            this.updateEmployeeRole();
            break;
          case 'Quit':
            console.log('Goodbye!');
            break
        }
      });
  }
}

// export the Cli class
export default Cli;
