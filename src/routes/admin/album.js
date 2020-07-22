const express = require("express");
const router = express.Router();
const AlbumController = require("../../http/controller/AlbumController");
const AlbumValidation = require("../../http/validation/album/album");
const UploadAlbumHandler = require("../../utilitie/Multer/AlbumPosterUpload");
const fileHandlerToField = require("../../http/middlware/FileToField");

router.post(
  "/Create",
  UploadAlbumHandler.fields([
    { name: "albumPoster" },
    { name: "albumeProfile" },
  ]),
  fileHandlerToField.FileToAlbumPoster,
  fileHandlerToField.FileToAlbumProFile,
  AlbumValidation.CreateHandle(),
  AlbumController.CreateAlbum
);

router.delete(
  "/Delete/:id",
  AlbumValidation.DeleteHandle(),
  AlbumController.DeleteAlbum
);

router.put(
  "/Update/:id",
  UploadAlbumHandler.fields([
    { name: "albumPoster" },
    { name: "albumeProfile" },
  ]),
  fileHandlerToField.FileToAlbumPoster,
  fileHandlerToField.FileToAlbumProFile,
  AlbumValidation.UpdateHandle(),
  AlbumController.UpdateAlbum
);

router.get("/Get/:id", AlbumController.GetAlbumById);

router.post("/GetAll", AlbumController.GetAllAlbum);

router.get("/GetSongSelected", AlbumController.GetAlbumSelect);

module.exports = router;
