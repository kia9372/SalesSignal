const express=require('express');
const app = express();
const router=express.Router();
const accessController=require('../../http/controller/AccessLevel');

router.get('/list',accessController.GetAllAccessList);

module.exports=router;