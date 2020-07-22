const multer = require("multer");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

const GetDirectory = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDay();
  return `src/public/uploads/song/poster/${year}/${month}/${day}`;
};

const SongPosterStorage = multer.diskStorage({
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

const UploadSigner = multer({
  storage: SongPosterStorage,
});

module.exports = UploadSigner;
