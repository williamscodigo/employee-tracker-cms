
/**NOTE: looking at simple-crud-...  WE DON'T NEED EXPRESS FOR THIS CHALLENGE SO WE WON'T-WORK/NEED-TO-WORRY ABOUT ROUTES, BUT WE DO WORK WITH DATABASE SO WE NEED TO START THE DB AND CONNECT TO IT AND MAKE QUERIES BASED ON inquirer INPUT DATA */

/*
//NOTE THIS CODE SECTION IS FROM simple-crud-... which make use of connections.ts to start the db and connect to it

import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DELETE FROM course_name where id =3;
// Hardcoded query: DELETE FROM course_names WHERE id = 3;
// pool.query(`DELETE FROM course_names WHERE id = $1`, [3], (err: Error, result: QueryResult) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`${result.rowCount} row(s) deleted!`);
//   }
// });

// // Query database
// pool.query('SELECT * FROM course_names', (err: Error, result: QueryResult) => {
//   if (err) {
//     console.log(err);
//   } else if (result) {
//     console.log(result.rows);
//   }
// });

//CODE BELOW THIS POINT IN SIMPLE-CRUD-... USES EXPRESS RTs WHICH WE WONT USE IN THIS CHALLENGE BUT WE MIGHT USE THE CODE TO INSERT, SELECT ETC INSIDE THOSE RTs.
*/

/**NOTE THIS IMPORTS AND CODE IS FOR CHALLENGE 8 AND IS ONLY HERE TO BE USE AS GUIDE FOR CHALLENGE 10 - we will also use week 10 activities including mini project and also the simple-crud-... exmaple code from substitute teacher at references/sql/simple-crud-... */

// import classes
import Cli from "./classes/Cli.js";

//run static method to display logo
Cli.displayLogo();

// create a new instance of the Cli class
const cli = new Cli();

// start the cli
cli.startCliMenu();
