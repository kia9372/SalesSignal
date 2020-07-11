const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path=require('path');
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
var cors = require("cors");

module.exports = class Startup {
  constructor() {
    this.CreateServer();
    this.SetMongoose();
    this.SiteConfiguration();
    this.ConfigRouter();
  }
  /**
     Config Server 
    **/
  CreateServer() {
    http.createServer(app).listen(config.serverConfig.port, () => {
      console.log(`Server Run On Port ${config.serverConfig.port}`);
    });
  }
  /**
     Config Mongoose 
     **/
  SetMongoose() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.databaseConfig.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }
  /**
     Config Site Optional 
     **/
  SiteConfiguration() {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      session({
        secret: "salesignalsecretkey",
        resave: true,
        saveUninitialized: true,
        cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 6) },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
      })
    );
    app.use(cookieParser("mysecretkey"));
  }
  /**
   * Set Router
   */

  ConfigRouter() {
    app.use(require("./routes/index"));
  }
};
