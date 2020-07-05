const BaseController = require("./BaseController");
const Manager = require("../../entity/manager");
const fs = require("fs");
const settingRepository = require("./Repository/SettingRepository");
const Utilite = require("../../utilitie/utility");
const UserRole = require("../../entity/userRole");
const settingEnum = require("../../enums/settingtype");

module.exports = new (class ManagerController extends BaseController {
  /***
   * Create Manager
   */
  async CreateManager(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      const user = new Manager({ ...req.body });
      user.save((error, user) => {
        settingRepository
          .GetSetting(settingEnum.REGISTER_SETTING)
          .then((setting) => {
            let userRole = new UserRole({
              role: setting.adminRegister,
              user: user._id,
            });
            userRole.save();
          });
      });

      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * Edit Manager
   */
  async EditManager(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      let user = await Manager.findById(req.params.id);
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
  async EditAccountInfoManager(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      let user = await Manager.findById(req.params.id);
      user.phoneNumber = req.body.phoneNumber;
      user.isActive = req.body.isActive;

      user.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * Change PhoneNumber Manager
   */
  async ChangePhoneNumber(req, res, next) {
    const result = await this.ValidationAction(req, res);
    if (result[0]) {
      await Manager.findById(req.params.id).then((user) => {
        if (!user) return this.Notfound(res);
        user.phoneNumber = req.body.phoneNumber;
        user.save();
      });
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }

  /***
   * Delete Manager
   */
  async DeleteManager(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      const user = Manager.findByIdAndUpdate(
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
   * ChangeManagerActivation
   */
  async ChangeManagerActivation(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      const user = Manager.findByIdAndUpdate(req.params.id).then((user) => {
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
      await Manager.findById(req.params.id).then((user) => {
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
      await Manager.find({ userName: req.body.userName }).then((user) => {
        if (!user) return this.Notfound(res);
        Utilite.HashField(req.body.password).then((hash) => {
          console.log("in controller", hash);
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
    const manager = await Manager.findById(req.params.id)
      .where("isDelete")
      .equals(false)
      .where("isAdmin")
      .equals(true)
      .select(" name family userName");
    if (!manager) return this.Notfound(res);
    return this.OkObjectResult(res, manager);
  }
  /***
   * Get Account Info
   */
  async GetAccountInfo(req, res, next) {
    const manager = await Manager.findById(req.params.id)
      .where("isDelete")
      .equals(false)
      .where("isAdmin")
      .equals(true)
      .select(" phoneNumber isActive");
    if (!manager) return this.Notfound(res);
    return this.OkObjectResult(res, manager);
  }
  /***
   * Get All Managers
   */
  async GetAllManagers(req, res, next) {
    const manager = await Manager.find({})
      .where("isDelete")
      .equals(false)
      .where("isAdmin")
      .equals(true)
      .select("name family userName isActive");
    if (!manager) return this.Notfound(res);
    return this.OkObjectResult(res, manager);
  }
})();
