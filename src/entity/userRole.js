const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserRoleSchema = Schema({
  role: { type: Schema.Types.ObjectId, ref:'Roles' },
  user: { type: Schema.Types.ObjectId, ref:'Managers'}
});

module.exports = mongoose.model("UserRole", UserRoleSchema);