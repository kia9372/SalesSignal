const express=require('express');
const router=express.Router();
const roleRouter=require('./role');
const userRouter=require('./user');
const managerRouter=require('./manager');
const settingRouter=require('./setting');


router.use('/role',roleRouter);

router.use('/user',userRouter);

router.use('/manager',managerRouter);

router.use('/setting',settingRouter);

module.exports=router;