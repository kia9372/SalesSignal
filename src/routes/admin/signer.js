const express = require("express");
const router = express.Router();
const SignerController = require("../../http/controller/SignerController");
const SignerValidation = require("../../http/validation/signer/signer");
const UploadPosterHandler = require("../../utilitie/Multer/SignerPosterUploads");
const UploadProfileHandler = require("../../utilitie/Multer/SignerProfileUploads");
const fileHandlerToField = require("../../http/middlware/FileToField");

router.post(
  "/Create",
  UploadProfileHandler.fields([
    { name: "signerPoster" },
    { name: "signerProfile" },
  ]),
  fileHandlerToField.FileToSignerProfle,
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
  UploadProfileHandler.fields([
    { name: "signerPoster" },
    { name: "signerProfile" },
  ]),
  fileHandlerToField.FileToSignerProfle,
  fileHandlerToField.FileToSignerPoster,
  SignerValidation.UpdateHandle(),
  SignerController.UpdateSigner
);

router.get("/Get/:id", SignerController.GetSignerById);

router.post("/GetAll", SignerController.GetAllSigner);

router.get("/GetsignerSelected", SignerController.GetSignerSelect);

module.exports = router;
