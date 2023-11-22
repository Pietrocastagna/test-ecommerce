const express = require('express');

const { 
    createCart,
    updateCart,
    getByIDCart,
    deleteCart,

  

    createProductCart,
    deleteProductCart,
    updateProductCart,
    getByIDProductCart,
    getAllProductCart

    

    
 } = require('../controllers/cartController.js');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware.js');










// Create Cart

router.route('/:user')
.post(protect, createCart);

// Update Cart

router.route('/update/:user')
.put(protect, updateCart);

// Delete Cart

router.route('/delete/:id')
.delete(protect,  deleteCart);

// Get By ID Cart

router.route('/get/:user')
.get(protect, getByIDCart);




/////////////////////////////////////


// Create ProductCart

router.route('/productcart/:id')
.post(protect, createProductCart);

// Update ProductCart

router.route('/productcart/update/:id/:cart_id')
.post(protect, updateProductCart);

// Delete ProductCart

router.route('/productcart/delete/:id/:cart_id')
.delete(protect, deleteProductCart);

// Get All ProductCart

router.route('/productcart/:id')
.get(protect, getAllProductCart);

// Get By ID ProductCart

router.route('/productcart/:id/:cart_id')
.get(protect, getByIDProductCart);






module.exports = router;