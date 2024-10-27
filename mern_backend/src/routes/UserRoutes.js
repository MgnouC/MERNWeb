const express = require('express');
const routes = express.Router()
const userController  = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');
const multer = require("multer");


routes.post('/sign-up',  userController.createUser) 
routes.post('/sign-in',  userController.loginUser) 
routes.post('/sign-out',  userController.logoutUser) 

routes.put('/update-user/:id',  userController.updateUser) 
routes.delete('/delete-user/:id' ,userController.deleteUser) 
routes.get('/get-all' ,userController.getAllUser) 
routes.get('/get-detail-user/:id',authUserMiddleware ,userController.getDetailsUser) 
routes.post('/refresh-token',userController.refreshToken) 


module.exports = routes