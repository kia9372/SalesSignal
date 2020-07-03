const express=require('express');
const router=express.Router();
const roleRouter=require('./role');

router.use('/role',roleRouter);

module.exports=router;