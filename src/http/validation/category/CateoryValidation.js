const { check } = require("express-validator");
const Category = require("../../../entity/category");
const path = require("path");

module.exports = new (class CreateCategoryValidation {
  CreateHandle() {
    return [
      check("name").notEmpty().withMessage("نام دسته نمیتواند خالی باشد"),
      check("parentId").custom(async (value, { req }) => {
        if (value !== "null") {
          return Category.findById(value).then((data) => {
            if (!data)
              throw new Error(
                " زیر دسته مورد نشر وجود ندارد . لطفا یک زیر دسته دیگر انتخاب کنید "
              );
          });
        }
        return true;
      }),
      check("categoryPoster").custom((value, { req }) => {
        if (req.file) {
          if (!value) {
            throw new Error(" آواتار را وارد کنید");
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
      check("name").notEmpty().withMessage("نام دسته نمیتواند خالی باشد"),
      check("parentId").custom(async (value, { req }) => {
        if (value !== "null") {
          return Category.findById(value).then((data) => {
            if (!data)
              throw new Error(
                " زیر دسته مورد نشر وجود ندارد . لطفا یک زیر دسته دیگر انتخاب کنید "
              );
          });
        }
        return true;
      }),
      check("categoryPoster").custom(async (value, { req }) => {

        if (req.method === "PUT" && value === undefined) return;

        if (!value) {
          throw new Error("تصویر دوره را وارد کنید");
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
