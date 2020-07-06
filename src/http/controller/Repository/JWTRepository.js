const UserRepository = require("./UserRepo/UserRepository");
var jwt = require("jsonwebtoken");

module.exports = new (class JWTRepository {
  async GenerateToken(userName) {
    var payload = {
        iss: "a57bb14a44455e98800d6a513953fc0",
        sub: "a57bb14a445541e98800d6a513953fc0",
        aud: "SalesSignal.com",
        exp: Math.floor(Date.now() / 1000) + 300,
        iat: Math.floor(Date.now() / 1000)
      };
    return jwt.sign(
      { foo: await UserRepository.GetLoginUserInfo(userName),payload },
      "shhhhh"
    );
  }
})();
