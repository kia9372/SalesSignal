const { check } = require("express-validator");

module.exports = new class CreateRoleValidation {
  CreateHandle() {
    return [check("name").notEmpty().withMessage("نام نقش نمیتواند خالی باشد")];
  }

  UpdateHandle() {
    return [check("name").notEmpty().withMessage("نام نقش نمیتواند خالی باشد")];
  }

  DeleteHandle() {
    return [
      check("id").notEmpty().withMessage("شناسه نقش مورد نظر نا معتبر میباشد"),
    ];
  }
}();
