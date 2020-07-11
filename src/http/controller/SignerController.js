const BaseController = require("./BaseController");
const Signer = require("../../entity/signer");
const Utilite = require("../../utilitie/utility");

module.exports = new (class SignerController extends BaseController {
  /***
   * Create CreateSigner
   */
  async CreateSigner(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const signer = new Signer({
        name: req.body.name,
        signerPoster: Utilite.getDirectoryImage(
          `${req.file.destination}/${req.file.originalname}`
        ),
        signerProfile: Utilite.getDirectoryImage(
          `${req.file.destination}/${req.file.originalname}`
        ),
        gener: req.body.gener,
      });

      signer.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Delete Signer
   */
  async DeleteSigner(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Signer.findByIdAndUpdate(
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
   * Update UpdateSigner
   */
  async UpdateSigner(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let signer = await Signer.findById(req.params.id);
      signer.name = req.body.name;
      signer.signerPoster = req.file
        ? Utilite.getDirectoryImage(
            `${req.file.destination}/${req.file.originalname}`
          )
        : signer.signerPoster;
      signer.signerProfile = req.file
        ? Utilite.getDirectoryImage(
            `${req.file.destination}/${req.file.originalname}`
          )
        : signer.signerProfile;

      signer.save();
      return this.Ok(res);
    } else {
      return await this.BadRerquest(res, validationData[1]);
    }
  }
  /***
   * Get Signer By Id
   */
  async GetSignerById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Signer.findById({
        _id: req.params.id,
      })
        .where("isDelete")
        .equals(false)
        .select("name gener");
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Get All Signer
   */
  async GetAllSigner(req, res, next) {
    let signer = Signer.find({});
    let sortField = req.body.sidx;
    if (req.body.filters) {
      let filters = JSON.parse(req.body.filters);
      filters.forEach((element) => {
        if (element["op"] === "eq") {
          signer.where(element["field"]).equals(element["data"]);
        } else if (element["op"] === "gte") {
          let f = element["field"];
          signer.find({ f: { $gte: element["data"] } });
        } else if (element["op"] === "lte") {
          signer.find({ field: { $lte: element["data"] } });
        } else if (element["op"] === "cn") {
          signer.find({ name: { $regex: `(.*)${element["data"]}(.*)` } });
        }
      });
    }

    let role = await signer
      .find({})
      .where("isDelete")
      .equals(false)
      .skip((req.body.page - 1) * req.body.rows)
      .limit(req.body.rows)
      .sort(`{${sortField}:${req.body.sort}}`)
      .select("name");
    if (role) {
      return this.OkObjectResultPager(
        res,
        role,
        await Signer.find({}).where("isDelete").equals(false).countDocuments()
      );
    }
    return this.Notfound(res);
  }

  /***
   * Get Signer For Select
   */
  async GetSignerSelect(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Signer.find({})
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
