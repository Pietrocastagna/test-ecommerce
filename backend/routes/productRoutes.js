const express = require('express');

const { 
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getByIDProduct,
    
 } = require('../controllers/productController.js');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware.js');


// Create Product

router.route('/')
.post(protect,  createProduct);

// Update Product

router.route('/update/:id')
.post(protect, updateProduct);



// Delete Product

router.route('/delete/:id')
.delete(protect, admin,  deleteProduct);


// Get All Product

router.route('/')
.get(protect, getAllProduct);

// Get By ID Product

router.route('/:id')
.get(protect, getByIDProduct);









module.exports = router;