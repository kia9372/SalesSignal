const Manager = require("../../../../entity/manager");

module.exports = new (class UserRepository {
  async GetLoginUserInfo(userName) {
    let auth = await Manager.findOne({ userName: userName })
      .populate({
        path: "userRole",
        model: "UserRole",
        populate: {
          path: "role",
          model: "Roles",
        },
      })
      .select("_id scurityStamp userRole._id");
    return auth;
  }

  async GetUserById(id) {
    return await Manager.findById(id)
    .populate({
      path: "userRole",
      model: "UserRole",
      populate: {
        path: "role",
        model: "Roles",
      },
    });
  }
})();
