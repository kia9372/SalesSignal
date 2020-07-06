const express=require('express');
const router=express.Router();
const authController=require('../../http/controller/LoginController');


router.post('/manager/login',authController.LoginManager)

module.exports=router;