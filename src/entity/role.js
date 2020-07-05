const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");

const RoleSchema = Schema({
  name: { type: String, require: true },
  description: { type: String },
  isDelete: { type: Boolean, default: false },
  scurityStamp: { type: String, require: true },
});

RoleSchema.pre("save", function (next) {
  this.scurityStamp = uniqueString();
  next();
});


module.exports = mongoose.model("Roles", RoleSchema);
