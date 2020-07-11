const express = require("express");
const router = express.Router();
const ManagerController = require("../../http/controller/ManagerController");
const ManagerValidation = require("../../http/validation/manager/manager");
const UploadAvatar = require("../../utilitie/Multer/avatarUpload");
const fileHandlerToField=require('../../http/middlware/FileToField');

router.post(
  "/create",
  ManagerValidation.CreateHandle(),
  ManagerController.CreateManager
);

router.put(
  "/updatePersonalInfo/:id",
  UploadAvatar.single("avatar"),
  fileHandlerToField.FileToAvatar,
  ManagerValidation.EditHandle(),
  ManagerController.EditManager
);

router.put(
    "/updateAccountInfo/:id",
    ManagerValidation.EditAccountInfoHandle(),
    ManagerController.EditAccountInfoManager
  );

  router.put(
    "/ChangeRole/:id",
    ManagerController.ChangeManagerRole
  );

router.delete("/delete/:id", ManagerController.DeleteManager);

router.put("/changeActivation/:id", ManagerController.ChangeManagerActivation);

router.put(
  "/changePassword/:id",
  ManagerValidation.ChangePasswordHandle(),
  ManagerController.ChangePassword
);

router.put(
  "/changePhoneNumber/:id",
  ManagerValidation.ChangePhoneNumberHandle(),
  ManagerController.ChangePhoneNumber
);

router.put(
  "/resetPassword",
  ManagerValidation.ResetPasswordHandle(),
  ManagerController.ResetPassword
);

router.get(
    "/personalInformation/:id",
    ManagerController.GetPersonalInfo
  );

  router.get(
    "/accountInformation/:id",
    ManagerController.GetAccountInfo
  );

  router.post(
    "/getAll",
    ManagerController.GetAllManagers
  );

  router.get(
    "/GetManagerImage/:id",
    ManagerController.GetManagerImage
  );

// router.get('/get/:id',ManagerController.GetRoleById);

// router.get('/getall',ManagerController.GetAllRoles);

module.exports = router;
