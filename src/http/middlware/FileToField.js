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
    if (!req.files.signerPoster) {
      req.body.signerPoster = undefined;
    } else {
      req.body.signerPoster = req.files.signerPoster.originalname;
    }
    next();
  }

  FileToSignerProfle(req, res, next) {
    if (!req.files.signerProfile) {
      req.body.signerProfile = undefined;
    } else {
      req.body.signerProfile = req.files.signerProfile.originalname;
    }
    next();
  }

  FileToSongPoster(req, res, next) {
    if (!req.files.songPoster) {
      req.body.songPoster = undefined;
    } else {
      req.body.songPoster = req.files.songPoster.originalname;
    }
    next();
  }

  FileToSongFile(req, res, next) {
    if (!req.files.songFile) {
      req.body.songFile = undefined;
    } else {
      req.body.songFile = req.files.songFile.originalname;
    }
    next();
  }

  FileToAlbumPoster(req, res, next) {
    if (!req.files.albumPoster) {
      req.body.albumPoster = undefined;
    } else {
      req.body.albumPoster = req.files.albumPoster.originalname;
    }
    next();
  }

  FileToAlbumProFile(req, res, next) {
    if (!req.files.albumeProfile) {
      req.body.albumeProfile = undefined;
    } else {
      req.body.albumeProfile = req.files.albumeProfile.originalname;
    }
    next();
  }

}

module.exports = new FileToField();


module.exports = new FileToField();
