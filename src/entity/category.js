const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");

const CategorySchema = Schema({
  name: { type: String, require: true },
  parentId: { type: String },
  categoryPoster: { type: String, require: true },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Category", CategorySchema);
