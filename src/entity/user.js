const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");

const UserSchema = Schema({
  name: { type: String, require: true },
  description: { type: String },
  scurityStamp: { type: String, require: true },
});

UserSchema.pre("save", function (next) {
  this.scurityStamp = uniqueString();
  next();
});

module.exports = mongoose.model("Users", UserSchema);
