const express = require("express");
const router = express.Router();
const UserController = require("../../http/controller/UserController");
const UserValidation = require("../../http/validation/user/UserValidation");
const UploadAvatar = require("../../utilitie/avatarUpload");
const fileHandlerToField=require('../../http/middlware/FileToField');

router.post(
  "/create",
  UserValidation.CreateHandle(),
  UserController.CreateUser
);

router.put(
  "/updatePersonalInfo/:id",
  UploadAvatar.single("avatar"),
  fileHandlerToField.FileToAvatar,
  UserValidation.EditHandle(),
  UserController.EditUser
);

router.put(
    "/updateAccountInfo/:id",
    UserValidation.EditAccountInfoHandle(),
    UserController.EditAccountInfoUser
  );

router.delete("/delete/:id", UserController.DeleteUser);

router.put("/changeActivation/:id", UserController.ChangeUserActivation);

router.put(
  "/changePassword/:id",
  UserValidation.ChangePasswordHandle(),
  UserController.ChangePassword
);

router.put(
  "/changePhoneNumber/:id",
  UserValidation.ChangePhoneNumberHandle(),
  UserController.ChangePhoneNumber
);

router.put(
  "/resetPassword",
  UserValidation.ResetPasswordHandle(),
  UserController.ResetPassword
);


router.get(
  "/personalInformation/:id",
  UserController.GetPersonalInfo
);

router.get(
  "/accountInformation/:id",
  UserController.GetAccountInfo
);

router.get(
  "/getAll",
  UserController.GetAllUsers
);

module.exports = router;
