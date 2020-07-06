const Manager = require("../../../entity/manager");
const JwtRepo = require("./JWTRepository");

module.exports = new (class AuthRepository {
  async LoginManagerValidation(username, password) {
    return Manager.findOne({ userName: username })
      .where("isAdmin")
      .equals(true)
      .then((user) => {
        if (user) {
          if (user.ValidationPassword(password)) {
            if (!user.isActive) {
              return ["حساب کاربری شما فعال نیست", null, false, 400];
            } else if (user.isDelete) {
              return ["کاربری با چنین مشخصاتی یافت نشد", null, false, 400];
            } else if (user.locked) {
              let date_ob = new Date();
              if (user.lockedDate < new Date(new Date().toUTCString())) {
                user.accountFail = 0;
                user.locked = false;
                user.lockedDate = null;
                user.save();

                return JwtRepo.GenerateToken(user.userName).then((token) => {
                  return [`خوش آمدید`, token, true, 200];
                });
              } else {
                return [
                  `حساب کاربری شما تا تاریخ  ${user.lockedDate} قفل میباشد`,
                  null,
                  false,
                  400,
                ];
              }
            } else {
              return JwtRepo.GenerateToken(user.userName).then((token) => {
                return [`خوش آمدید`, token, true, 200];
              });
            }
          } else {
            if (user.accountFail <= 5) {
              user.accountFail++;
              user.save(() => {
                return [
                  "نام کاربری یا رمز عبور شما اشتباه است",
                  null,
                  false,
                  400,
                ];
              });
              return [
                "نام کاربری یا رمز عبور شما اشتباه است",
                null,
                false,
                400,
              ];
            } else {
              user.locked = true;
              user.lockedDate = new Date().setUTCHours(72);
              user.save(() => {
                return ["حساب کاربری شما بلاک شده است", null, false, 400];
              });
              return ["حساب کاربری شما بلاک شده است", null, false, 400];
            }
          }
        } else {
          return ["کاربری با چنین مشخصاتی یافت نشد", null, false, 400];
        }
      });
  }
})();
