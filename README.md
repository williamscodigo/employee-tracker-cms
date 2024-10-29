# EMPLOYEE TRACKER CMS ![Static Badge](https://img.shields.io/badge/license-MIT-blue)

## Description

The Employee Tracker is a command-line application designed to simplify the management of a company's employee database. Built using Node.js, Inquirer, and PostgreSQL, this application provides a user-friendly interface that allows business owners to efficiently view and manage various aspects of their workforce.

With the Employee Tracker, you can easily organize and plan your business by accessing vital information such as departments, roles, and employees. This application is tailored to ensure that non-developers can navigate and utilize it without technical expertise, making it an invaluable tool for any business owner seeking to streamline their employee management processes.


## Features

- View All Departments, Roles, Employees: Present employee data in a clear format.

- Add a Department: Prompt users to input the name of a new department, which will be added to the database.

- Add a Role: Allow users to enter the name, salary, and department of a new role, seamlessly adding it to the database.

- Add an Employee: Facilitate the addition of new employees by prompting for their first name, last name, role, and manager, then store this information in the database.

- Update Employee Role: Enable users to select an existing employee and update their role through a straightforward prompt, ensuring that employee records remain current and accurate.

- Update employee managers.

- View employees by manager.

- View employees by department.

- Delete departments, roles, and employees.

- View the total utilized budget of a department, that is view the combined salaries of all employees in each department.

## Installation 

You can run this project in your local evironment, follow these steps:
1. Clone the Repository:

```bash
   git clone git@github.com:williamscodigo/employee-tracker-cms.git

```

2. Navigate to the Project Directory:

```bash
    cd employee-tracker-cms
```

3. Install Dependencies:

```bash
    npm install
```

4. Navigate to the db Directory:

```bash
    cd db
```

5. connect to postgres using your credentials (Enter password when prompted):

```bash
    psql -U username
```

6. run the following commands to create db, tables, and seed it:

```bash
    > \i schema.sql
    > \i seed.sql
```


7. With database created and seeded, stop current connection (ctrl + c), navigate back to Project Directory:

```bash
    cd ..
```

8. Make sure you modify .env file (create file if it doesn't exist):

```
    DB_NAME=db_name
    DB_USER=username
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=5432
```

9. Start the app:

```bash
    npm run start
```

## Usage

Walkthrough Video Link: [https://drive.google.com/file/d/13RF4f9EKVKeQezWGRZyCAKLLu8U2mRqd/view?usp=sharing](https://drive.google.com/file/d/13RF4f9EKVKeQezWGRZyCAKLLu8U2mRqd/view?usp=sharing)

## Technologies Used

- JavaScript
- TypeScript
- Node.js
- inquirer
- postgreSQL
- SQL
- pg

## License
[https://opensource.org/license/mit](https://opensource.org/license/mit)



## Questions
GitHub Link: [https://github.com/williamscodigo](https://github.com/williamscodigo)

## Credits
Worked with [https://github.com/mwahba624](https://github.com/mwahba624) to complete this challenge.
