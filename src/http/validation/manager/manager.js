const { check } = require("express-validator");
const path = require("path");
const User = require("../../../entity/manager");
const { throws } = require("assert");

module.exports = new (class ManagerValidation {
  CreateHandle() {
    return [
      check("name").notEmpty().withMessage("نام کاربر نمیتواند خالی باشد"),
      check("gender").notEmpty().withMessage("جنسیت نمیتواند خالی باشد"),
      check("isWriter")
        .notEmpty()
        .withMessage("نوع کاربر که نویسنده است یا نه باید مشخص شود"),
      check("family")
        .notEmpty()
        .withMessage("نام خانوادگی کاربر نمیتواند خالی باشد"),
      check("userName")
        .custom((value) => {
          return User.find({ userName: value }).then((user) => {
            if (user.length > 0) {
              return Promise.reject(
                "نام کاربری وارد شده تکراری است . لطفا یک نام کاربری دیگر وارد کنید"
              );
            }
          });
        })
        .withMessage("نام کاربری نمیتواند نکراری باشد")
        .notEmpty()
        .withMessage("نام کاربری نمیتواند خالی باشد"),
      check("password")
        .isLength({ min: 6 })
        .withMessage("رمز عبور نمیتواند کمتر از 6 کارکتر باشد")
        .notEmpty()
        .withMessage("رمز عبور کاربر نمیتواند خالی باشد"),
      check("phoneNumber")
        .custom((value) => {
          return User.find({ phoneNumber: value }).then((user) => {
            console.log(user);
            if (user.length > 0) {
              return Promise.reject(
                " شماره تلفن وارد شده تکراری است . لطفا یک  شماره تلفن دیگر وارد کنید"
              );
            }
          });
        })
        .withMessage(" شماره تلفن نمیتواند نکراری باشد")
        .notEmpty()
        .withMessage("شماره تلفن کاربر نمیتواند خالی باشد"),
    ];
  }

  EditHandle() {
    return [
      check("name").notEmpty().withMessage("نام کاربر نمیتواند خالی باشد"),
      check("phoneNumber")
        .custom((value, { req }) => {
          return User.find({ phoneNumber: value }).then((user) => {
            if (user.length > 0) {
              if (value === user[0].phoneNumber && req.params.id != user[0]._id)
                return Promise.reject(
                  " شماره تلفن وارد شده تکراری است . لطفا یک  شماره تلفن دیگر وارد کنید"
                );
            }
          });
        })
        .notEmpty()
        .withMessage(" شماره تلفن  نمیتواند خالی باشد"),
      check("gender").notEmpty().withMessage("جنسیت نمیتواند خالی باشد"),
      check("family")
        .notEmpty()
        .withMessage("نام خانوادگی کاربر نمیتواند خالی باشد"),
      check("avatar").custom(async (value, { req }) => {
        if (req.file) {
          if (!value) {
            throw new Error(" آواتار را وارد کنید");
          } else {
            const fileExe = [".png", ".jpg", ".jepg", ".svg"];
            if (!fileExe.includes(path.extname(value))) {
              throw new Error("فایل انتخابی تصویر نمی باشد");
            }
          }
        }
      }),
    ];
  }

  EditAccountInfoHandle() {
    return [
      check("userName")
        .custom((value, { req }) => {
          return User.find({ userName: value }).then((user) => {
            if (user.length > 0) {
              if (value === user[0].userName && req.params.id != user[0]._id)
                return Promise.reject(
                  "  نام کاربری وارد شده تکراری است . لطفا یک   نام کاربری دیگر وارد کنید"
                );
            }
          });
        })
        .notEmpty()
        .withMessage("  نام کاربری  نمیتواند خالی باشد"),
      check("confirmuserName")
        .custom((value, { req }) => {
          if (value) {
            if (value != req.body.userName) {
              throw new Error(" نام کاربری و تکرار  نام کاربری یکسان نیستند");
            }
          }
          return true;
        }),
      check("isActive")
        .notEmpty()
        .withMessage(" وضعیت فعال بودن یا نبودن کاربر با مشخص شود "),
      check("isWriter")
        .notEmpty()
        .withMessage("نوع کاربر که نویسنده است یا نه باید مشخص شود")
    ];
  }

  ChangePasswordHandle() {
    return [
      check("password").notEmpty().withMessage("رمز عبور نمیتواند خالی باشد"),
      check("confirmPassword")
        .notEmpty()
        .withMessage("تکرار رمز عبور نمیتواند خالی باشد")
        .custom((value, { req }) => {
          if (value != req.body.password) {
            throw new Error("رمز عبور و تکرار رمز عبور یکسان نیستند");
          }
          return true;
        }),
    ];
  }

  ChangePhoneNumberHandle() {
    return [
      check("phoneNumber")
        .custom((value, { req }) => {
          return User.find({ phoneNumber: value }).then((user) => {
            if (user.length > 0) {
              if (value === user[0].phoneNumber && req.params.id != user[0]._id)
                return Promise.reject(
                  " شماره تلفن وارد شده تکراری است . لطفا یک  شماره تلفن دیگر وارد کنید"
                );
            }
          });
        })
        .notEmpty()
        .withMessage(" شماره تلفن  نمیتواند خالی باشد"),
    ];
  }

  ResetPasswordHandle() {
    return [
      check("userName")
        .notEmpty()
        .withMessage("نام کاربری نمیتواند خالی باشد")
        .custom((value) => {
          return User.find({ userName: value }).then((user) => {
            if (user.length === []) {
              return Promise.reject("نام کاربری وارد شده وجود ندارد");
            }
          });
        })
        .notEmpty()
        .withMessage("نام کاربری نمیتواند خالی باشد"),
      check("password").notEmpty().withMessage("رمز عبور نمیتواند خالی باشد"),
      check("confirmPassword")
        .notEmpty()
        .withMessage("تکرار رمز عبور نمیتواند خالی باشد")
        .custom((value, { req }) => {
          if (value != req.body.password) {
            throw new Error("رمز عبور و تکرار رمز عبور یکسان نیستند");
          }
          return true;
        }),
    ];
  }
})();
