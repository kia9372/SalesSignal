const express=require('express');
const router=express.Router();
const SettingController=require('../../http/controller/SettingController');

router.put('/setRegisterSetting',SettingController.SetRegisterSetting);


module.exports=router;