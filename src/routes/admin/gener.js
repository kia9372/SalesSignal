const express = require("express");
const router = express.Router();
const GenerController = require("../../http/controller/GenerController");
const GenerValidation = require("../../http/validation/gener/GenerValidation");
const UploadHandler = require("../../utilitie/Multer/GenerPosterUpload");
const fileHandlerToField = require("../../http/middlware/FileToField");

router.post(
  "/Create",
  UploadHandler.single("generPoster"),
  fileHandlerToField.FileToGenerPoster,
  GenerValidation.CreateHandle(),
  GenerController.CreateGener
);

router.delete(
  "/Delete/:id",
  GenerValidation.DeleteHandle(),
  GenerController.DeleteGener
);

router.put(
  "/Update/:id",
  UploadHandler.single("generPoster"),
  fileHandlerToField.FileToGenerPoster,
  GenerValidation.UpdateHandle(),
  GenerController.UpdateGener
);

router.get("/Get/:id", GenerController.GetGenerById);

router.post("/GetAll", GenerController.GetAllGener);

router.get("/GetGenerSelected", GenerController.GetGenerSelect);

module.exports = router;
