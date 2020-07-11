const BaseController = require("./BaseController");
const Role = require("../../entity/role");

module.exports = new (class RoleController extends BaseController {

  /***
   * Create Role
   */
  async CreateRole(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const role = new Role({ ...req.body });
      role.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Delete Role
   */
  async DeleteRole(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Role.findByIdAndUpdate(
        req.params.id,
        { $set: { isDelete: true } },
        { useFindAndModify: false },
        (error, role) => {
          if (error) next(error);
          if (!role) return this.Notfound(res);
          return this.Ok(res);
        }
      );
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Update Role
   */
  async UpdateRole(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Role.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { useFindAndModify: false },
        (error, role) => {
          if (error) return this.BadRerquest(res, error);
          role.save();
          return this.Ok(res);
        }
      );
      return this.Ok(res);
    }
    return await this.BadRerquest(res, validationData[1]);
  }
  /***
   * Get Role By Id
   */
  async GetRoleById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Role.findById({
        _id: req.params.id,
      })
        .where("isDelete")
        .equals(false)
        .select('name description');
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Get All Role
   */
  async GetAllRoles(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Role.find({}).where("isDelete").equals(false).select('name description');
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }

    /***
   * Get Role For Select
   */
  async GetRolesSelect(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Role.find({}).where("isDelete").equals(false).select('name description');
      if (role) {
        return this.OkObjectResultPager(res, role,await Role.count().where('isDelete').equals(false));
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
})();
