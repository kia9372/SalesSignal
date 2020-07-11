const BaseController = require("./BaseController");
const Category = require("../../entity/category");
const Utilite = require("../../utilitie/utility");

module.exports = new (class CategoryController extends BaseController {
  /***
   * Create CreateCategory
   */
  async CreateCategory(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const role = new Category({
        name: req.body.name,
        parentId: req.body.parentId,
        categoryPoster: Utilite.getDirectoryImage(
          `${req.file.destination}/${req.file.originalname}`
        ),
      });

      role.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Delete Category
   */
  async DeleteCategory(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Category.findByIdAndUpdate(
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
   * Update UpdateCategory
   */
  async UpdateCategory(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let category = await Category.findById(req.params.id);
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
   * Get Category By Id
   */
  async GetCateogyById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Category.findById({
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
   * Get All Category
   */
  async GetAllCategory(req, res, next) {
    let category = Category.find({});
    let sortField = req.body.sidx;
    if (req.body.filters) {
      let filters = JSON.parse(req.body.filters);
      filters.forEach((element) => {
        if (element["op"] === "eq") {
          category.where(element["field"]).equals(element["data"]);
        } else if (element["op"] === "gte") {
          let f = element["field"];
          category.find({ f: { $gte: element["data"] } });
        } else if (element["op"] === "lte") {
          category.find({ field: { $lte: element["data"] } });
        } else if (element["op"] === "cn") {
          category.find({ userName: { $regex: `(.*)${element["data"]}(.*)` } });
        }
      });
    }

    let role = await category
      .find({})
      .where("isDelete")
      .equals(false)
      .skip((req.body.page - 1) * req.body.rows)
      .limit(req.body.rows)
      .sort(`{${sortField}:${req.body.sort}}`)
      .select("name categoryPoster description");
    if (role) {
      return this.OkObjectResultPager(
        res,
        role,
        await Category.find({}).where("isDelete").equals(false).countDocuments()
      );
    }
    return this.Notfound(res);
  }

  /***
   * Get Category For Select
   */
  async GetCategorySelect(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Category.find({})
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
