const multer = require("multer");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

const GetDirectory = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDay();
  return `src/public/uploads/avatar/${year}/${month}/${day}`;
};

const AvataStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = GetDirectory();
    mkdirp(dir).then((made) => {
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    let fileName = GetDirectory() + "/" + file.originalname;
    cb(null, file.originalname);
  },
});

const UploadAvatar = multer({
  storage: AvataStorage,
});

module.exports = UploadAvatar;
