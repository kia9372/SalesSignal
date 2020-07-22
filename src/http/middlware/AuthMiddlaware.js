const middlware = require("./Middlware");
var jwt = require("jsonwebtoken");
const UnAuth = require("../../utilitie/UnAuthourizeTokenException");
const UserRepo = require("../../http/controller/Repository/UserRepo/UserRepository");

class Auth extends middlware {
  async AuthToken(req, res, next) {
    let allow = true;

    jwt.verify(req.headers["authorization"], "shhhhh", (err, decoded) => {
      if (err) {
        if (err) {
          allow = false;
        }
      } else {
        UserRepo.GetUserById(decoded.info._id).then((user) => {
          if (!user) throw new UnAuth();
          console.log(decoded.info.userRole[0]);
          if (user.scurityStamp != decoded.info.scurityStamp) {
            allow = false;
            console.log(allow);
          }
          if (
            user.userRole[0].role.scurityStamp !=
            decoded.info.userRole[0].role.scurityStamp
          ) {
            allow = false;
            console.log(allow);
          }
        });
      }
    });
    if (allow) {
      next();
    } else {
      throw new UnAuth();
    }
  }
}

module.exports = new Auth();
