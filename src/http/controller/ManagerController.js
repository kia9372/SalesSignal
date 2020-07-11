const BaseController = require("./BaseController");
const Manager = require("../../entity/manager");
const fs = require("fs");
const settingRepository = require("./Repository/SettingRepository");
const Utilite = require("../../utilitie/utility");
const UserRole = require("../../entity/userRole");
const settingEnum = require("../../enums/settingtype");
const { RSA_NO_PADDING } = require("constants");

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
      user.name = req.body.name;
      user.gender = req.body.gender;
      user.phoneNumber = req.body.phoneNumber;
      user.family = req.body.family;
      user.avatar = req.file
        ? Utilite.getDirectoryImage(
            `${req.file.destination}/${req.file.originalname}`
          )
        : user.avatar;

      user.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, result[1]);
  }
  /***
   * Change Manager Role
   */
  async ChangeManagerRole(req, res, next) {
    let result = await this.ValidationAction(req, res);
    if (result[0]) {
      let user = await UserRole.find({ user: req.body.id });
      if (user.length <= 0) return this.Notfound(res);
      user[0].role = req.body.roleId;
      user[0].save((err, userRole) => {
        Manager.findById(userRole.user).then((user) => {
          user.save();
        });
      });
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
      user.userName = req.body.userName;
      user.isActive = req.body.isActive;
      user.isWriter = req.body.isWriter;
      console.log(req.body);
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
            next(error);
          } else if (!user) {
            return this.Notfound(res);
          } else {
            return this.Ok(res);
          }
        }
      );
    } else {
      return this.BadRerquest(res, result[1]);
    }
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
      .populate("userRole", "role")
      .where("isDelete")
      .equals(false)
      .where("isAdmin")
      .equals(true)
      .select(" name family gender phoneNumber");
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
      .select(" userName isWriter isActive");
    if (!manager) return this.Notfound(res);
    return this.OkObjectResult(res, manager);
  }
  /***
   * Get All Managers
   */
  async GetAllManagers(req, res, next) {
    let filresValue = [];
    let manag = Manager.find({});
    let filters = JSON.parse(req.body.filters);
    let sortField = req.body.sidx;
    let sortValue = `{${sortField}:${req.body.sort}}`;

    if (filters) {
      filters.forEach((element) => {
        if (element["op"] === "eq") {
          manag.where(element["field"]).equals(element["data"]);
        } else if (element["op"] === "gte") {
          let f = element["field"];
          manag.find({ f: { $gte: element["data"] } });
        } else if (element["op"] === "lte") {
          manag.find({ field: { $lte: element["data"] } });
        } else if (element["op"] === "cn") {
          manag.find({ userName: { $regex: `(.*)${element["data"]}(.*)` } });
        }
      });
    }

    const manager = await manag
      .select("name family userName phoneNumber avatar displayName isActive")
      .where("isAdmin")
      .equals(true)
      .skip((req.body.page - 1) * req.body.rows)
      .limit(req.body.rows)
      .sort(`{${sortField}:${req.body.sort}}`);
    if (!manager) return this.Notfound(res);
    return this.OkObjectResultPager(
      res,
      manager,
      await Manager.countDocuments()
        .where("isDelete")
        .equals(false)
        .where("isAdmin")
        .equals(true)
    );
  }

  /***
   * GetManagerImage
   */
  async GetManagerImage(req, res, next) {
    let manager = await Manager.findById(req.params.id).select("avatar");
    if (!manager.avatar) {
      return this.Notfound(res);
    }
    fs.readFile(`./src/public${manager.avatar}`, (error, data) => {
      if (error) throw err;
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(data); // Send the file data to the browser.
    });
  }
})();
