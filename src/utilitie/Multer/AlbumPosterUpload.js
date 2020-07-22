const multer = require("multer");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

const GetDirectory = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDay();
  return `src/public/uploads/album/profile/${year}/${month}/${day}`;
};

const AlbumPosterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.files);
    let dir = GetDirectory();
    mkdirp(dir).then((made) => {
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    console.log(req.files);
    let fileName = GetDirectory() + "/" + file.originalname;
    cb(null, file.originalname);
  },
});

const UploadSigner = multer({
  storage: AlbumPosterStorage,
});

module.exports = UploadSigner;
