const express=require('express');
const router=express.Router();
const ahtMiddlware=require('./../http/middlware/AuthMiddlaware');
const adminRouter=require('./admin/admin');
const authRouter=require('./auth/auth');


router.use('/admin',ahtMiddlware.AuthToken,adminRouter);

router.use('/auth',authRouter);

module.exports=router;