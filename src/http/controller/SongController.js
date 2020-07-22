const BaseController = require("./BaseController");
const Song = require("../../entity/song");
const Utilite = require("../../utilitie/utility");

module.exports = new (class SongController extends BaseController {
  /***
   * Create CreateSong
   */
  async CreateSong(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      const song = new Song({
        name: req.body.name,
        signer: req.body.signer,
        songFile: Utilite.getDirectoryImage(
          `${req.files.songFile[0].destination}/${req.files.songFile[0].originalname}`
        ),
        songPoster: Utilite.getDirectoryImage(
          `${req.files.songPoster[0].destination}/${req.files.songPoster[0].originalname}`
        ),
        gener: req.body.gener,
      });

      song.save();
      return this.Ok(res);
    }
    return this.BadRerquest(res, validationData[1]);
  }
  /***
   * Delete Song
   */
  async DeleteSong(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      Song.findByIdAndUpdate(
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
    }else{
        return this.BadRerquest(res, validationData[1]);
    }
  }
  /***
   * Update UpdateSong
   */
  async UpdateSong(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let song = await Song.findById(req.params.id);
      song.name = req.body.name;
      song.signer = req.body.signer;
      song.songFile = req.files.songFile
        ? Utilite.getDirectoryImage(
            `${req.files.songFile[0].destination}/${req.files.songFile[0].originalname}`
          )
        : song.songFile;
      song.songPoster = req.files.songPoster
        ? Utilite.getDirectoryImage(
            `${req.files.songPoster[0].destination}/${req.files.songPoster[0].originalname}`
          )
        : song.songPoster;
      song.gener = req.body.gener;

      song.save();
      return this.Ok(res);
    } else {
      return await this.BadRerquest(res, validationData[1]);
    }
  }
  /***
   * Get Song By Id
   */
  async GetSongById(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Song.findById({
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
   * Get All Song
   */
  async GetAllSong(req, res, next) {
    let signer = Song.find({});
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
        await Song.find({}).where("isDelete").equals(false).countDocuments()
      );
    }
    return this.Notfound(res);
  }

  /***
   * Get Song For Select
   */
  async GetSongSelect(req, res, next) {
    let validationData = await this.ValidationAction(req, res);
    if (validationData[0]) {
      let role = await Song.find({})
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
