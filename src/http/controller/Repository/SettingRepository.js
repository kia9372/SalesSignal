const Setting = require("../../../entity/setting");

module.exports = new (class SettingRepository {
  async GetSetting(fieldName) {
    let setting=await Setting.find({ field: fieldName });
    return JSON.parse(setting[0].value);
}
})();
