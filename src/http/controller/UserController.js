const BaseController = require("./BaseController");
const User = require("../../entity/user");
const fs = require("fs");
const Utilite = require("../../utilitie/utility");

module.exports = new (class UserController extends BaseController {
  /***
   * Create User
   */
  async CreateUser(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      const user = new User({ ...req.body });
      user.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * Edit User
   */
  async EditUser(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      const user = await User.findById(req.params.id);
      user.userName = req.body.userName;
      user.name = req.body.name;
      user.family = req.body.family;
      user.avatar = req.file
        ? Utilite.getDirectoryImage(
            `${req.file.destination}/${req.file.originalname}`
          )
        : null;

      user.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }

    /***
   * Edit Account Info
   */
  async EditAccountInfoUser(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      let user = await User.findById(req.params.id);
      user.phoneNumber = req.body.phoneNumber;
      user.isActive = req.body.isActive;

      user.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * Change PhoneNumber User
   */
  async ChangePhoneNumber(req, res, next) {
    const result = await this.ValidationAction(req, res);
    if (result[0]) {
      await User.findById(req.params.id).then((user) => {
        if (!user) return this.Notfound(res);
        user.phoneNumber = req.body.phoneNumber;
        user.save();
      });
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * Delete User
   */
  async DeleteUser(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      const user = User.findByIdAndUpdate(
        req.params.id,
        { $set: { isDelete: true } },
        { useFindAndModify: false },
        (error, user) => {
          if (error) {
            console.log(error);
            next(error);
          } else if (!user) {
            return this.Notfound(res);
          } else {
            return this.Ok(res);
          }
        }
      );
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * ChangeUserActivation
   */
  async ChangeUserActivation(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      const user = User.findByIdAndUpdate(req.params.id).then((user) => {
        if (!user) return this.Notfound(res);
        user.isActive = !user.isActive;
        user.save((err) => {
          if (err) return next(err);
          return this.Ok(res);
        });
      });
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * ChangePassword
   */
  async ChangePassword(req, res, next) {
    const result = await this.ValidationAction(req, res);
    if (result[0]) {
      await User.findById(req.params.id).then((user) => {
        if (!user) return this.Notfound(res);
        Utilite.HashField(req.body.password).then((hash) => {
          user.password = hash;
          user.save();
        });
      });
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * ResetPassword
   */
  async ResetPassword(req, res, next) {
    const result = await this.ValidationAction(req, res);
    if (result[0]) {
      await User.find({ userName: req.body.userName }).then((user) => {
        if (!user) return this.Notfound(res);
        Utilite.HashField(req.body.password).then((hash) => {
          user.password=hash;
        });
        user.save();
      });
      this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
    /***
   * Get Personal Info
   */
  async GetPersonalInfo(req, res, next) {
    const user = await User.findById(req.params.id)
      .where("isDelete")
      .equals(false)
      .where("isAdmin")
      .equals(false)
      .select(" name family userName");
    if (!user) return this.Notfound(res);
    return this.OkObjectResult(res, user);
  }
  /***
   * Get Account Info
   */
  async GetAccountInfo(req, res, next) {
    const user = await User.findById(req.params.id)
      .where("isDelete")
      .equals(false)
      .where("isAdmin")
      .equals(false)
      .select(" phoneNumber isActive");
    if (!user) return this.Notfound(res);
    return this.OkObjectResult(res, user);
  }

   /***
   * Get All Users
   */
  async GetAllUsers(req, res, next) {
    const user = await User.find({})
      .where("isDelete")
      .equals(false)
      .where("isAdmin")
      .equals(false)
      .select("name family userName isActive");
    if (!user) return this.Notfound(res);
    return this.OkObjectResult(res, user);
  }
})();
