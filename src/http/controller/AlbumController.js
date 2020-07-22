const BaseController = require("./BaseController");
const Album = require("../../entity/album");
const Utilite = require("../../utilitie/utility");

module.exports = new (class AlbumController extends BaseController {
  /***
   * Create CreateAlbum
   */
  async CreateAlbum(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const song = new Album({
        name: req.body.name,
        signer: req.body.signer,
        albumeProfile: Utilite.getDirectoryImage(
          `${req.files.albumeProfile[0].destination}/${req.files.albumeProfile[0].originalname}`
        ),
        albumPoster: Utilite.getDirectoryImage(
          `${req.files.albumPoster[0].destination}/${req.files.albumPoster[0].originalname}`
        ),
        gener: req.body.gener,
      });

      song.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Delete Album
   */
  async DeleteAlbum(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Album.findByIdAndUpdate(
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
    } else {
      return this.BadRerquest(res, validationData[1]);
    }
  }
  /***
   * Update UpdateAlbum
   */
  async UpdateAlbum(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let song = await Album.findById(req.params.id);
      song.name = req.body.name;
      song.signer = req.body.signer;
      song.albumeProfile = req.files.albumeProfile
        ? Utilite.getDirectoryImage(
            `${req.files.albumeProfile[0].destination}/${req.files.albumeProfile[0].originalname}`
          )
        : song.albumeProfile;
      song.albumPoster = req.files.albumPoster
        ? Utilite.getDirectoryImage(
            `${req.files.albumPoster[0].destination}/${req.files.albumPoster[0].originalname}`
          )
        : song.albumPoster;
      song.gener = req.body.gener;

      song.save();
      return this.Ok(res);
    } else {
      return await this.BadRerquest(res, validationData[1]);
    }
  }
  /***
   * Get Album By Id
   */
  async GetAlbumById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Album.findById({
        _id: req.params.id,
      })
        .where("isDelete")
        .equals(false)
        .select("name gener signer");
      if (role) {
        return this.OkObjectResult(res, role);
      }
      return this.Notfound(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Get All Album
   */
  async GetAllAlbum(req, res, next) {
    let album = Album.find({});
    let sortField = req.body.sidx;
    if (req.body.filters) {
      let filters = JSON.parse(req.body.filters);
      filters.forEach((element) => {
        if (element["op"] === "eq") {
          album.where(element["field"]).equals(element["data"]);
        } else if (element["op"] === "gte") {
          let f = element["field"];
          album.find({ f: { $gte: element["data"] } });
        } else if (element["op"] === "lte") {
          album.find({ field: { $lte: element["data"] } });
        } else if (element["op"] === "cn") {
          album.find({ name: { $regex: `(.*)${element["data"]}(.*)` } });
        }
      });
    }

    let role = await album
      .find({})
      .populate("gener", "name")
      .populate("signer", "name")
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
        await Album.find({}).where("isDelete").equals(false).countDocuments()
      );
    }
    return this.Notfound(res);
  }

  /***
   * Get Album For Select
   */
  async GetAlbumSelect(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Album.find({})
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
