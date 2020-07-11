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

  FileToCategoryPoster(req, res, next) {
    if (!req.file) {
      req.body.categoryPoster = undefined;
    } else {
      req.body.categoryPoster = req.file.originalname;
    }
    next();
  }

  FileToGenerPoster(req, res, next) {
    if (!req.file) {
      req.body.generPoster = undefined;
    } else {
      req.body.generPoster = req.file.originalname;
    }
    next();
  }

  FileToSignerPoster(req, res, next) {
    if (!req.file) {
      req.body.signerPoster = undefined;
    } else {
      req.body.signerPoster = req.file.originalname;
    }
    next();
  }

  FileToSignerProfle(req, res, next) {
    if (!req.file) {
      req.body.signerProfile = undefined;
    } else {
      req.body.signerProfile = req.file.originalname;
    }
    next();
  }

}

module.exports = new FileToField();


module.exports = new FileToField();
