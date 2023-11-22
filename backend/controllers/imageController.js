const asyncHandler = require('express-async-handler');
const multer = require("multer")
const mongoose = require('mongoose');
const Image = require('./../models/Image')
  
const createImage = asyncHandler(    async (req, res) => {
    const image = req.file.filename
  
      try {
        
       let imageUp= await Image.create({image:image,
        path:req.file.path,
        name: req.file.filename})
       
        res.json({image:imageUp,
        path:req.file.path,
        name: req.file.filename
    });
      } catch (err) {
        res.json({status: error});
      }
  });

  const getByIDImage = asyncHandler(    async (req, res) => {
    
    try {
      
     const image = await  Image.findById(req.params.id)
        res.json({
            id: image._od,
            image:image.image,
            path:image.path,
            name: image.name});
  
     
    } catch (err) {
      res.json({status: error});
    } 
});


module.exports = {
    createImage,
    // updateImage,
    getByIDImage,
    // deleteImage,
  }