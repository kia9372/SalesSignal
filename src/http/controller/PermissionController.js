const BaseController = require("./BaseController");
const Permission = require("../../entity/permission");
const Utilite = require("../../utilitie/utility");

module.exports = new (class PermissionController extends BaseController {
  /***
   * Create CreatePermission
   */
  async CreatePermission(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const role = new Permission({ ...req.body });

      role.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Delete Permission
   */
  async DeletePermission(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Permission.findByIdAndUpdate(
        req.params.id,
        { $set: { isDelete: true } },
        { useFindAndModify: false },
        (error, role) => {
          if (error) {
            next(error);
          } else if (!role) {
            return this.Notfound(res);
          }
        }
      );
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Update UpdatePermission
   */
  async UpdatePermission(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let category = await Permission.findById(req.params.id);
      category.name = req.body.name;
      category.parentId = req.body.parentId;
      category.categoryPoster = req.file
        ? Utilite.getDirectoryImage(
            `${req.file.destination}/${req.file.originalname}`
          )
        : category.avatar;
      category.save();
      return this.Ok(res);
    } else {
      return await this.BadRerquest(res, validationData[1]);
    }
  }
  /***
   * Get Permission By Id
   */
  async GetCateogyById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Permission.findById({
        _id: req.params.id,
      })
        .where("isDelete")
        .equals(false)
        .select("name categoryPoster parentId");
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Get All Permission
   */
  async GetAllPermission(req, res, next) {
    let role = await Permission.find({})
      .find({})
      .where("isDelete")
      .equals(false)
      .select("name parentId perId");
    if (role) {
      return this.OkObjectResult(res, role);
    }
    return this.Notfound(res);
  }

  /***
   * Get Permission For Select
   */
  async GetPermissionSelect(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Permission.find({})
        .where("isDelete")
        .equals(false)
        .select("name parentId");
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
})();
