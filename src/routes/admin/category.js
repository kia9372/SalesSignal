const express=require('express');
const router=express.Router();
const CategoryController=require('../../http/controller/CategoryController');
const CategoryValidation=require('../../http/validation/category/CateoryValidation');
const UploadHandler=require('../../utilitie/Multer/categoryPosterUpload');
const fileHandlerToField=require('../../http/middlware/FileToField');

router.post('/Create',UploadHandler.single('categoryPoster'),fileHandlerToField.FileToCategoryPoster,CategoryValidation.CreateHandle(),CategoryController.CreateCategory);

router.delete('/Delete/:id',CategoryValidation.DeleteHandle(),CategoryController.DeleteCategory);

router.put('/Update/:id',UploadHandler.single('categoryPoster'),fileHandlerToField.FileToCategoryPoster,CategoryValidation.UpdateHandle(),CategoryController.UpdateCategory);

router.get('/Get/:id',CategoryController.GetCateogyById);

router.post('/GetAll',CategoryController.GetAllCategory);

router.get('/GetCategorySelected',CategoryController.GetCategorySelect);

module.exports=router;