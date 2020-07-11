const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");

const GenerSchema = Schema({
  name: { type: String, require: true },
  generPoster: { type: String, require: true },
  isDelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Gener", GenerSchema);
