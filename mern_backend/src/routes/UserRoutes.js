const express = require('express');
const routes = express.Router()
const userController  = require('../controllers/UserController')


routes.post('/sing-up',  userController.createUser) 
routes.post('/sign-in',  userController.loginUser) 

module.exports = routes