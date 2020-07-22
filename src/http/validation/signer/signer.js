const { check } = require("express-validator");
const path = require("path");
const Gener=require('../../../entity/gener');

module.exports = new (class SignerValidation {
  CreateHandle() {
    return [
      check("name").notEmpty().withMessage("نام خواننده نمیتواند خالی باشد"),
      check("gener")
      .custom(async (value)=>{
        const gener=await Gener.findById(value);
        if(!gener)
            throw new Error('يانر وارد شده وجود ندارد')
      })
      .notEmpty().withMessage(" ژانر نمیتواند خالی باشد"),
      check("signerPoster").custom(async (value, { req }) => {
        if (req.file) {
          if (!value) {
            throw new Error(" عکس پوستر را وارد کنید");
          } else {
            const fileExe = [".png", ".jpg", ".jepg", ".svg"];
            if (!fileExe.includes(path.extname(value).toLocaleLowerCase())) {
              throw new Error("فایل انتخابی تصویر نمی باشد");
            }
          }
          return true;
        }
      }),
      check("signerProfile").custom(async (value, { req }) => {
        if (req.file) {
          if (!value) {
            throw new Error(" عکس پروفایل را وارد کنید");
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
      check("name").notEmpty().withMessage("نام خواننده نمیتواند خالی باشد"),
      check("gener")
      .custom(async (value)=>{
        const gener=await Gener.findById(value);
        if(!gener)
            throw new Error('يانر وارد شده وجود ندارد')
      })
      .notEmpty().withMessage(" ژانر نمیتواند خالی باشد"),
      check("signerPoster").custom(async (value, { req }) => {

        if (req.method === "PUT" && value === undefined) return;

        if (!value) {
          throw new Error("عکس پوستر خواننده  را وارد کنید");
        } else {
          const fileExe = [".png", ".jpg", ".jepg", ".svg"];
          if (!fileExe.includes(path.extname(value).toLowerCase())) {
            throw new Error("فایل انتخابی تصویر نمی باشد");
          }
        }
      }),
      check("signerProfile").custom(async (value, { req }) => {

        if (req.method === "PUT" && value === undefined) return;

        if (!value) {
          throw new Error("عکس  پروفایل  رخواننده ا وارد کنید");
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
