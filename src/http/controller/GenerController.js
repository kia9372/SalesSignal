const BaseController = require("./BaseController");
const Gener = require("../../entity/gener");
const Utilite = require("../../utilitie/utility");

module.exports = new (class GenerController extends BaseController {
  /***
   * Create CreateGener
   */
  async CreateGener(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const gener = new Gener({
        name: req.body.name,
        generPoster: Utilite.getDirectoryImage(
          `${req.file.destination}/${req.file.originalname}`
        ),
      });

      gener.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Delete Gener
   */
  async DeleteGener(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Gener.findByIdAndUpdate(
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
   * Update UpdateGener
   */
  async UpdateGener(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let gener = await Gener.findById(req.params.id);
      gener.name = req.body.name;
      gener.generPoster = req.file
        ? Utilite.getDirectoryImage(
            `${req.file.destination}/${req.file.originalname}`
          )
        : gener.avatar;
        gener.save();
      return this.Ok(res);
    } else {
      return await this.BadRerquest(res, validationData[1]);
    }
  }
  /***
   * Get Gener By Id
   */
  async GetGenerById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Gener.findById({
        _id: req.params.id,
      })
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
  /***
   * Get All Gener
   */
  async GetAllGener(req, res, next) {
    let gener = Gener.find({});
    let sortField = req.body.sidx;
    if (req.body.filters) {
      let filters = JSON.parse(req.body.filters);
      filters.forEach((element) => {
        if (element["op"] === "eq") {
          gener.where(element["field"]).equals(element["data"]);
        } else if (element["op"] === "gte") {
          let f = element["field"];
          gener.find({ f: { $gte: element["data"] } });
        } else if (element["op"] === "lte") {
          gener.find({ field: { $lte: element["data"] } });
        } else if (element["op"] === "cn") {
          gener.find({ name: { $regex: `(.*)${element["data"]}(.*)` } });
        }
      });
    }

    let role = await gener
      .find({})
      .where("isDelete")
      .equals(false)
      .skip((req.body.page - 1) * req.body.rows)
      .limit(req.body.rows)
      .sort(`{${sortField}:${req.body.sort}}`)
      .select("name description");
    if (role) {
      return this.OkObjectResultPager(
        res,
        role,
        await Gener.find({}).where("isDelete").equals(false).countDocuments()
      );
    }
    return this.Notfound(res);
  }

  /***
   * Get Gener For Select
   */
  async GetGenerSelect(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Gener.find({})
        .where("isDelete")
        .equals(false)
        .select("name");
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
})();
