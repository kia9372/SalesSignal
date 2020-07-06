const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");

module.exports = class BaseController {
  constructor() {
    autoBind(this);
  }

  BadRerquest(res, message) {
    return res.status(200).send({
      message: message,
      statusCode: 400,
      success: false,
    });
  }

  Ok(res) {
    return res.status(200).send({
      message: "عملیات با موفقیت انجام شد",
      statusCode: 200,
      success: true,
    });
  }

  Result(res, message, data, success, statusCode) {
    return res.status(statusCode).send({
      message: message,
      statusCode: statusCode,
      data: data,
      success: success,
    });
  }

  Notfound(res) {
    res.status(200).send({
      message: "رکورد مورد نظر یافت نشد",
      statusCode: 200,
      success: false,
    });
  }

  OkObjectResult(res, value) {
    return res.status(200).send({
      message: "عملیات با موفقیت انجام شد",
      data: value,
      statusCode: 200,
      success: true,
    });
  }

  async ValidationAction(req, res) {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      let errors = result.array();
      let message = [];
      errors.forEach((element) => {
        message.push(element.msg);
      });
      return [false, message];
    }
    return [true, null];
  }
};
