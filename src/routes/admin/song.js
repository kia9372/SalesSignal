const express = require("express");
const router = express.Router();
const SongController = require("../../http/controller/SongController");
const SongValidation = require("../../http/validation/song/song");
const UploadPosterHandler = require("../../utilitie/Multer/SignerPosterUploads");
const UploadSongHandler = require("../../utilitie/Multer/SongFileUpload");
const fileHandlerToField = require("../../http/middlware/FileToField");

router.post(
  "/Create",
  UploadSongHandler.fields([
    { name: "songFile" },
    { name: "songPoster" },
  ]),
  fileHandlerToField.FileToSongPoster,
  fileHandlerToField.FileToSongPoster,
  SongValidation.CreateHandle(),
  SongController.CreateSong
);

router.delete(
  "/Delete/:id",
  SongValidation.DeleteHandle(),
  SongController.DeleteSong
);

router.put(
  "/Update/:id",
  UploadSongHandler.fields([
    { name: "songFile" },
    { name: "songPoster" },
  ]),
  fileHandlerToField.FileToSignerProfle,
  fileHandlerToField.FileToSignerPoster,
  SongValidation.UpdateHandle(),
  SongController.UpdateSong
);

router.get("/Get/:id", SongController.GetSongById);

router.post("/GetAll", SongController.GetAllSong);

router.get("/GetSongSelected", SongController.GetSongSelect);

module.exports = router;
