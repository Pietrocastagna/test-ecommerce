const express = require('express');

const { 
    createImage,
    updateImage,
    getByIDImage,
    deleteImage,
  
 } = require('../controllers/imageController.js');
 const router = express.Router();

 const upload = require('../middleware/uploadMiddleware.js')


router.route('/')
.post( upload.single('image'), createImage);

router.route('/:id')
.get(getByIDImage);


module.exports = router;