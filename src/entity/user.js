const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");
const bcrypte = require("bcrypt");

const UserSchema = Schema({
  name: { type: String, require: true },
  family: { type: String, require: true },
  userName: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, require: true, default: false },
  isDelete: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  avatar: { type: String, default: null },
  scurityStamp: { type: String },
  locked: { type: Boolean, default: false },
  lockedDate: { type: Date, default: null },
  accountFail: { type: Number, default: 0 },
});

UserSchema.pre("save", function (next) {
  this.scurityStamp = uniqueString();
  if (this.isNew) {
    bcrypte.hash(this.password, bcrypte.genSaltSync(15), (err, hash) => {
      if (err) console.log(err);
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});


UserSchema.virtual('userRole',{
  ref : 'UserRole',
  localField : 'userRole',
  foreignField : 'user'
})

UserSchema.methods.ValidationPassword = function (password) {
  return bcrypte.compareSync(password, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
