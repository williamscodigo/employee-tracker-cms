// import classes
import Cli from "./classes/Cli.js";

//run static method to display logo
Cli.displayLogo();

// create a new instance of the Cli class
const cli = new Cli();

// start the cli
cli.startCliMenu();
