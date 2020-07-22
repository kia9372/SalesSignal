const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = Schema({
  name: { type: String, require: true },
  parentId: { type: String },
  perId: { type: String, require: true },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Permission", PermissionSchema);