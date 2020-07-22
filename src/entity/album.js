const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = Schema(
  {
    name: { type: String, require: true },
    gener: { type: Schema.Types.ObjectId, ref: "Gener" },
    signer: { type: Schema.Types.ObjectId, ref: "Signer" },
    albumeProfile: { type: String, require: true },
    albumPoster: { type: String, require: true },
    isDelete: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Album", AlbumSchema);
