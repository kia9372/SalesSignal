const { check } = require("express-validator");
const path = require("path");

module.exports = new (class GenerValidation {
  CreateHandle() {
    return [
      check("name").notEmpty().withMessage("نام ژانر نمیتواند خالی باشد"),
      check("generPoster").custom(async (value, { req }) => {
        console.log(req.body)
        if (req.file) {
          if (!value) {
            throw new Error(" عکس ژانر را وارد کنید");
          } else {
            const fileExe = [".png", ".jpg", ".jepg", ".svg"];
            if (!fileExe.includes(path.extname(value).toLocaleLowerCase())) {
              throw new Error("فایل انتخابی تصویر نمی باشد");
            }
          }
          return true;
        }
      }),
    ];
  }

  UpdateHandle() {
    return [
      check("name").notEmpty().withMessage("نام ژانر نمیتواند خالی باشد"),
      check("generPoster").custom(async (value, { req }) => {

        if (req.method === "PUT" && value === undefined) return;

        if (!value) {
          throw new Error("عکس ژانر  را وارد کنید");
        } else {
          const fileExe = [".png", ".jpg", ".jepg", ".svg"];
          if (!fileExe.includes(path.extname(value).toLowerCase())) {
            throw new Error("فایل انتخابی تصویر نمی باشد");
          }
        }
      }),
    ];
  }

  DeleteHandle() {
    return [
      check("id").notEmpty().withMessage("شناسه دسته مورد نظر نا معتبر میباشد"),
    ];
  }
})();
