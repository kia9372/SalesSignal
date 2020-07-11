const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueString = require("unique-string");
const bcrypte = require("bcrypt");

const ManagerSchema = Schema(
  {
    name: { type: String, require: true },
    family: { type: String, require: true },
    userName: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: true },
    isDelete: { type: Boolean, default: false },
    gender: { type: Number },
    isActive: { type: Boolean, default: false },
    isWriter: { type: Boolean, default: false },
    avatar: { type: String, default: null },
    scurityStamp: { type: String },
    locked: { type: Boolean, default: false },
    lockedDate: { type: Date, default: null },
    accountFail: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
  }
);

ManagerSchema.pre("save", function (next) {
  this.scurityStamp = uniqueString();

  console.log("this.isModifed", this.isModifed);
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
ManagerSchema.virtual("userRole", {
  ref: "UserRole",
  localField: "_id",
  foreignField: "user",
});

ManagerSchema.virtual("displayName")
  .get(function () {
    return `${this.name} ${this.family}`;
  })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(" "));
    const lastName = v.substring(v.indexOf(" ") + 1);
    this.set({ firstName, lastName });
  });

ManagerSchema.methods.ValidationPassword = function (password) {
  return bcrypte.compareSync(password, this.password);
};

module.exports = mongoose.model("Managers", ManagerSchema);
