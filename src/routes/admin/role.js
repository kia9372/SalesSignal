const express=require('express');
const router=express.Router();

router.post('/create',(req,res,next)=>{
    res.json('in Create Role');
});

module.exports=router;