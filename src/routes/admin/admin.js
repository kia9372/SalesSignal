const express=require('express');
const router=express.Router();
const roleRouter=require('./role');
const userRouter=require('./user');
const managerRouter=require('./manager');
const accessRouter=require('./access');
const settingRouter=require('./setting');
const categoryRouter=require('./category');
const generRouter=require('./gener');
const signerRouter=require('./signer');



router.use('/role',roleRouter);

router.use('/user',userRouter);

router.use('/manager',managerRouter);

router.use('/category',categoryRouter);

router.use('/access',accessRouter);

router.use('/gener',generRouter);

router.use('/signer',signerRouter);

router.use('/setting',settingRouter);

module.exports=router;