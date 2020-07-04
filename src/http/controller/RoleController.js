const BaseController = require("./BaseController");
const Role = require("../../entity/role");

module.exports = new (class RoleController extends BaseController {
  async CreateRole(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const role = new Role({ ...req.body });
      role.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }

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

  async GetRoleById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Role.findById({
        _id: req.params.id,
        isDelete: true,
      });
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound();
    }
    return this.BadRerquest(res, validationData[1]);
  }

  async GetAllRoles(req,res,next){
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Role.find({});
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound();
    }
    return this.BadRerquest(res, validationData[1]);
  }


})();
