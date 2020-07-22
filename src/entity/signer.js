const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");

const SignerSchema = Schema({
  name: { type: String, require: true },
  gener:{type:Schema.Types.ObjectId,ref:'Gener'},
  signerProfile: { type: String, require: true },
  signerPoster: { type: String, require: true },
  isDelete: { type: Boolean, default: false },
},{
  toJSON: { virtuals: true },
});

SignerSchema.virtual('song',{
  ref:'Song',
  localField:'_id',
  foreignField:'song'
})


module.exports = mongoose.model("Signer", SignerSchema);
