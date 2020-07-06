const BaseController = require("./BaseController");
const Manager = require("./../../entity/manager");
const Auth = require("./Repository/LoginRepository");

module.exports = new (class LoginController extends BaseController {
  async LoginManager(req, res, next) {

    const auth = await Auth.LoginManagerValidation(
      req.body.userName,
      req.body.password
    );
    this.Result(res, auth[0], auth[1], auth[2], auth[3]);
  }
})();
