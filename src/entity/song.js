const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");

const SongSchema = Schema({
  name: { type: String, require: true },
  gener:{type:Schema.Types.ObjectId,ref:'Gener'},
  signer:{type:Schema.Types.ObjectId,ref:'Signer'},
  songFile: { type: String, require: true },
  songPoster: { type: String, require: true },
  isDelete: { type: Boolean, default: false },
},{
    toJSON: { virtuals: true },
  });

module.exports = mongoose.model("Song", SongSchema);
