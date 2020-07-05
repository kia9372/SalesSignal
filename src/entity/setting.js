const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const settingEnum = require("../enums/settingtype");

const SettingSchema = Schema({
  field: { type: String, enums: [settingEnum], require: true },
  value: { type: String,require:true },
});

module.exports = mongoose.model("Setting", SettingSchema);
