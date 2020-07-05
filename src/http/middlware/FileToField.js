const middlware = require("./Middlware");

class FileToField extends middlware {
  FileToAvatar(req, res, next) {
    if (!req.file) {
      req.body.avatar = undefined;
    } else {
      req.body.avatar = req.file.originalname;
    }
    next();
  }
}

module.exports = new FileToField();
