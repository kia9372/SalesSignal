const BaseController = require("./BaseController");
const Setting = require("../../entity/setting");
const SettingEnum = require("../../enums/settingtype");
const { json } = require("body-parser");

module.exports = new (class SettingController extends BaseController {
  async SetRegisterSetting(req, res, next) {
    const regsiter = await Setting.findOne({
        field: SettingEnum.REGISTER_SETTING
    });
    if (regsiter) {
      regsiter.value = JSON.stringify(req.body);
      regsiter.save();
      this.Ok(res);
    }
    return this.BadRerquest(res, null);
  }
})();
