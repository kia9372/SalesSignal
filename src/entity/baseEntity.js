const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var util = require("util");

const BaseSchema = new Schema({
  owner: { type: String },
  updateDate: { type: String },
  updateBy: { type: String },
  deleteDate: { type: String },
  deleteby: { type: String },
  createDate: { type: String },
  createBy: { type: String },
});

util.inherits(BaseSchema, Schema);
