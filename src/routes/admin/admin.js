const express = require("express");
const router = express.Router();
const roleRouter = require("./role");
const userRouter = require("./user");
const managerRouter = require("./manager");
const accessRouter = require("./access");
const settingRouter = require("./setting");
const categoryRouter = require("./category");
const generRouter = require("./gener");
const signerRouter = require("./signer");
const songRouter = require("./song");
const albumRouter = require("./album");

router.use("/role", roleRouter);

router.use("/user", userRouter);

router.use("/manager", managerRouter);

router.use("/category", categoryRouter);

router.use("/permission", accessRouter);

router.use("/gener", generRouter);

router.use("/signer", signerRouter);

router.use("/song", songRouter);

router.use("/album", albumRouter);

router.use("/setting", settingRouter);

module.exports = router;
