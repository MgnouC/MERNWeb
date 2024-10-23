const express = require('express');
const routes = express.Router()
const productController  = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');


routes.post('/create-product', productController.createProduct);
routes.put('/update-product/:id',authMiddleware ,productController.updateProduct) 
routes.get('/get-details-product/:id' ,productController.getDetailsProduct) 
routes.delete('/delete-product/:id' ,productController.deleteProduct) 
routes.get('/get-all',productController.getAllProduct) 



module.exports = routes