const express = require("express");
const router = express.Router();
const SignerController = require("../../http/controller/SignerController");
const SignerValidation = require("../../http/validation/signer/signer");
const UploadHandler = require("../../utilitie/Multer/SignerUploads");
const fileHandlerToField = require("../../http/middlware/FileToField");

router.post(
  "/Create",
  UploadHandler.single("signerProfile"),
  fileHandlerToField.FileToSignerProfle,
  UploadHandler.single("signerPoster"),
  fileHandlerToField.FileToSignerPoster,
  SignerValidation.CreateHandle(),
  SignerController.CreateSigner
);

router.delete(
  "/Delete/:id",
  SignerValidation.DeleteHandle(),
  SignerController.DeleteSigner
);

router.put(
  "/Update/:id",
  UploadHandler.single("generPoster"),
  fileHandlerToField.FileToGenerPoster,
  SignerValidation.UpdateHandle(),
  SignerController.UpdateSigner
);

router.get("/Get/:id", SignerController.GetSignerById);

router.post("/GetAll", SignerController.GetAllSigner);

router.get("/GetGenerSelected", SignerController.GetSignerSelect);

module.exports = router;
