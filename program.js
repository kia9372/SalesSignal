const Startup = require("./src/startup");
require("dotenv").config();
global.config=require('./src/config/index');

new Startup();
