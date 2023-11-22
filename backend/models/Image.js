const mongoose = require('mongoose');



const ImageSchema = mongoose.Schema({
  image:{type:String},
  path:{type:String},
  name:{type:String}


});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;