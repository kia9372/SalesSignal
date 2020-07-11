const express=require('express');
const router=express.Router();
const Role=require('../../entity/role');
const RoleController=require('../../http/controller/RoleController');
const RoleValidation=require('../../http/validation/role/RoleValidation');

router.post('/create',RoleValidation.CreateHandle(),RoleController.CreateRole);

router.delete('/delete/:id',RoleValidation.DeleteHandle(),RoleController.DeleteRole);

router.put('/update/:id',RoleValidation.UpdateHandle(),RoleController.UpdateRole);

router.get('/get/:id',RoleController.GetRoleById);

router.get('/getall',RoleController.GetAllRoles);

router.get('/GetRoleSelected',RoleController.GetAllRoles);

module.exports=router;