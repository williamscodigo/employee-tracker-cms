// ESM
import { faker } from '@faker-js/faker';

// PostgreSQL connection
import { pool, connectToDb } from './connection.mjs';

const seedDepartments = async (num) => {
  for (let i = 0; i < num; i++) {
    const departmentName = faker.commerce.department();

    await pool.query(
      'INSERT INTO department (name) VALUES ($1)',
      [departmentName]
    );
  }
};

const seedRoles = async (num) => {
  const departmentIds = await pool.query('SELECT id FROM department');
  
  for (let i = 0; i < num; i++) {
    const roleName = faker.person.jobTitle();
    const departmentId = departmentIds.rows[Math.floor(Math.random() * departmentIds.rows.length)].department_id;
    const salary = faker.finance.amount(50000, 150000, 2);

    await pool.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
      [roleName, salary, departmentId]
    );
  }
};

const seedEmployees = async (num) => {
  const roleIds = await client.query('SELECT id FROM role');
  const managerIndex = Math.random()*num | 0;

  for (let i = 0; i < num; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const roleId = roleIds.rows[Math.floor(Math.random() * roleIds.rows.length)].role_id;

    if(managerIndex === i) {
        await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [firstName, lastName, roleId, managerIndex]
          );
    }else{
        await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [firstName, lastName, roleId, null]
          );
    }
  }
};

const seedDatabase = async () => {
  try {
    await connectToDb();

    console.log('Seeding departments...');
    await seedDepartments(5);  // Seed 5 departments

    console.log('Seeding roles...');
    await seedRoles(10);  // Seed 10 roles

    console.log('Seeding employees...');
    await seedEmployees(20);  // Seed 20 employees

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    await client.end();
  }
};

seedDatabase();
