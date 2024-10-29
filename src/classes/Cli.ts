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

  
//method to view all departments
viewAllDepartments(): void {
  // Query database
pool.query('SELECT * FROM department', (err: Error, result: QueryResult) => {
if (err) {
  console.log(err);
} else if (result) {
  console.table(result.rows);
  this.startCliMenu();
}
  });
}

//method to view all roles
viewAllRoles(): void {
  const sqlQuery = `
    SELECT 
      r.id AS "Role ID",
      r.title AS "Role Title",
      r.salary AS "Salary",
      d.name AS "Department"
    FROM 
      role r
    JOIN 
      department d ON r.department_id = d.id
  `;

  pool.query(sqlQuery, (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows); // Displays the roles with department names
      this.startCliMenu(); // Returns to the main CLI menu
    }
  });
}


//method to view all employees
viewAllEmployees(): void {
  const sqlQuery = `
    SELECT 
      e.id AS "Employee ID",
      e.first_name AS "First Name",
      e.last_name AS "Last Name",
      r.title AS "Title",
      d.name AS "Department",
      r.salary AS "Salary",
      CONCAT(m.first_name, ' ', m.last_name) AS "Manager Name"
    FROM 
      employee e
    JOIN 
      role r ON e.role_id = r.id
    JOIN 
      department d ON r.department_id = d.id
    LEFT JOIN 
      employee m ON e.manager_id = m.id
  `;

  pool.query(sqlQuery, (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows); // Displays the data in a table format
      this.startCliMenu(); // Returns to the main CLI menu
    }
  });
}

//method to view employees by manager - extra*
viewEmployeesByManager(): void {
  // Query to get all employees for the manager selection list
  pool.query('SELECT id, first_name, last_name FROM employee', (err, employeesResult) => {
    if (err) {
      console.log(err);
    } else if (employeesResult) {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'managerName',
            message: 'Which manager would you like to view employees for?',
            choices: employeesResult.rows.map((employee) => employee.first_name + ' ' + employee.last_name),
          },
        ])
        .then((answers) => {
          const managerId = employeesResult.rows.find((employee) => employee.first_name + ' ' + employee.last_name === answers.managerName).id;
          
          // Query to select employees with required fields
          pool.query(
            `SELECT e.id AS "Employee ID", 
                    e.first_name AS "First Name", 
                    e.last_name AS "Last Name", 
                    r.title AS "Title", 
                    d.name AS "Department", 
                    r.salary AS "Salary", 
                    COALESCE(m.first_name || ' ' || m.last_name, 'No Manager') AS "Manager Name"
             FROM employee e
             JOIN role r ON e.role_id = r.id
             JOIN department d ON r.department_id = d.id
             LEFT JOIN employee m ON e.manager_id = m.id
             WHERE e.manager_id = $1`,
            [managerId],
            (err, result) => {
              if (err) {
                console.log(err);
              } else if (result) {
                console.table(result.rows);
                this.startCliMenu();
              }
            }
          );
        });
    }
  });
}



//method to view employees by department - extra*
viewEmployeesByDepartment(): void {
  // Query to get all departments for selection
  pool.query('SELECT * FROM department', (err, result) => {
    if (err) {
      console.log(err);
    } else if (result) {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'departmentName',
            message: 'Which department would you like to view employees for?',
            choices: result.rows.map((department) => department.name),
          },
        ])
        .then((answers) => {
          const departmentId = result.rows.find((department) => department.name === answers.departmentName).id;
          
          // Query to select employees with required fields
          pool.query(
            `SELECT e.id AS "Employee ID", 
                    e.first_name AS "First Name", 
                    e.last_name AS "Last Name", 
                    r.title AS "Title", 
                    d.name AS "Department", 
                    r.salary AS "Salary", 
                    COALESCE(m.first_name || ' ' || m.last_name, 'No Manager') AS "Manager Name"
             FROM employee e
             JOIN role r ON e.role_id = r.id
             JOIN department d ON r.department_id = d.id
             LEFT JOIN employee m ON e.manager_id = m.id
             WHERE d.id = $1`,
            [departmentId],
            (err, result) => {
              if (err) {
                console.log(err);
              } else if (result) {
                console.table(result.rows);
                this.startCliMenu();
              }
            }
          );
        });
    }
  });
}


//method to add a department
addDepartment(): void {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter department name:',
      },
    ])
    .then((answers) => {
      //get the department name
      const departmentName = answers.departmentName;

      //save the department to the database
      pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName], (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Department added successfully!');
          //display the menu again
          this.startCliMenu();
        }
      });
    });
}

//method to add a role
addRole(): void {
  pool.query('SELECT * FROM department', (err, result) => {
    if (err) {console.log(err);
    } else if (result){
      inquirer
      .prompt
      ([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'What is the title of the role?',
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'roleDepartment',
          message: 'What is the department of the role?',
          choices: result.rows.map((department) => department.name),
        },
      ])
      .then((answers) => {
        const departmentId = result.rows.find((department) => department.name === answers.roleDepartment).id;
        pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.roleTitle, answers.roleSalary, departmentId], (err, result) => {
          if (err) {console.log(err);
          } else if (result){
            console.log('Role added successfully');
            this.startCliMenu();
          }
        });
      });
    }
  });
}

//method to add an employee
async addEmployee(): Promise<void> {
  try {
    const employeesResult = await pool.query('SELECT * FROM employee');
    const rolesResult = await pool.query('SELECT * FROM role');

    const employees = employeesResult.rows;
    const roles = rolesResult.rows;

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of the employee?',
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of the employee?',
      },
      {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the role of the employee?',
        choices: roles.map((role) => role.title),
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        choices: ['None', ...employees.map((employee) => employee.first_name + ' ' + employee.last_name)],
      },
    ]);

    const roleId = roles.find((role) => role.title === answers.employeeRole).id;
    const managerId = answers.employeeManager === 'None' ? null : employees.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employeeManager).id;

    
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.employeeFirstName, answers.employeeLastName, roleId, managerId]);

    console.log('Employee added successfully');
    this.startCliMenu();
  } catch (err) {
    console.log(err);
  }
}

//method to update an employee role 
updateEmployeeRole(): void {
  pool.query('SELECT * FROM employee', (err, employeesResult) => {
    if (err) {console.log(err);
    } else if (employeesResult){
      pool.query('SELECT * FROM role', (err, rolesResult) => {
        if (err) {console.log(err);
        } else if (rolesResult){
          inquirer
          .prompt
          ([
            {
              type: 'list',
              name: 'employeeName',
              message: 'Which employee would you like to update?',
              choices: employeesResult.rows.map((employee) => employee.first_name + ' ' + employee.last_name),
            },
            {
              type: 'list',
              name: 'roleTitle',
              message: 'What is the new role of the employee?',
              choices: rolesResult.rows.map((role) => role.title),
            },
          ])
          .then((answers) => {
            const employeeId = employeesResult.rows.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employeeName).id;
            const roleId = rolesResult.rows.find((role) => role.title === answers.roleTitle).id;
            pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId], (err, result) => {
              if (err) {console.log(err);
              } else if (result){
                console.log('Employee role updated successfully');
                this.startCliMenu();
              }
            });
          });
        }
      });
    }
  });
}

//method to update an employee manager - extra*
updateEmployeeManager(): void {
  pool.query('SELECT * FROM employee', (err, employeesResult) => {
    if (err) {console.log(err);
    } else if (employeesResult){
      inquirer
      .prompt
      ([
        {
          type: 'list',
          name: 'employeeName',
          message: 'Which employee would you like to update?',
          choices: employeesResult.rows.map((employee) => employee.first_name + ' ' + employee.last_name),
        },
        {
          type: 'list',
          name: 'managerName',
          message: 'Who is the employee\'s new manager?',
          choices: ['None', ...employeesResult.rows.map((employee) => employee.first_name + ' ' + employee.last_name)],
        },
      ])
      .then((answers) => {
        const employeeId = employeesResult.rows.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employeeName).id;
        const managerId = answers.managerName === 'None' ? null : employeesResult.rows.find((employee) => employee.first_name + ' ' + employee.last_name === answers.managerName).id;
        pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId], (err, result) => {
          if (err) {console.log(err);
          } else if (result){
            console.log('Employee manager updated successfully');
            this.startCliMenu();
          }
        });
      });
    }
  });
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
          choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees By Manager', 'View Employees By Department', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Update Employee Manager', 'Delete Employee', 'Delete Department', 'Delete Role', 'Quit'],
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
          case 'View Employees By Manager':
            this.viewEmployeesByManager();
            break;
          case 'View Employees By Department':
            this.viewEmployeesByDepartment();
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
          case 'Update Employee Manager':
            this.updateEmployeeManager();
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
