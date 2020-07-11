const UserRepository = require("./UserRepo/UserRepository");
var jwt = require("jsonwebtoken");

module.exports = new (class JWTRepository {
  async GenerateToken(userName) {
    var payload = {
        iss: "a57bb14a44455e98800d6a513953fc0",
        sub: "a57bb14a445541e98800d6a513953fc0",
        aud: "SalesSignal.com",
        expiresIn:.6,
        iat:.6
      };
    return jwt.sign(
      { info: await UserRepository.GetLoginUserInfo(userName),payload },
      "shhhhh",
      {expiresIn:60*24}
    );
  }
})();
