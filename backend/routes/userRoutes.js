const express = require('express');
const router = express.Router();
const {
 
  createUser,
  getUser,
  // updateUser,
  getAllUsers,
  deleteUser,
  login,

  
  

} = require( '../controllers/userController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');




// Register Routes

router.route('/')
.post(createUser);

// Login Routes

router.route('/login')
.post(login);


// Get All 

router.route('/')
.get(protect, admin, getAllUsers);



// Get by ID (Admin)
router
  .route('/details/:id')
  .get(protect, getUser);

// Update by ID (user)

// router
// .route('/anagrafica/:id')
// .put(protect, updateUser);


// Delete by ID (user)
router.route('/delete/:id')
.delete(protect, deleteUser);




 




  
  
  module.exports = router;
