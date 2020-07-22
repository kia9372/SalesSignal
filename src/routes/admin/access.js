const express=require('express');
const app = express();
const router=express.Router();
const accessController=require('../../http/controller/PermissionController');

router.post('/create',accessController.CreatePermission);

router.get('/GetAll',accessController.GetAllPermission);

router.delete('/Delete/:id',accessController.DeletePermission);

module.exports=router;