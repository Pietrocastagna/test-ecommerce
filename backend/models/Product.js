const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
   
    nome:{
      type:String
    },
    immagine:{
      type:String
    },
    descrizione:{
        type:String
      },
      bigdescrizione:{
        type:String
      },
    prezzo:{
      type:Number
    },

    immagine:{
      type: String,
    },
    dataCreazione: {
      type: Date,
      default: Date.now
    },
    dataUltimaModifica: {
        type: Date,
        default: Date.now
      }
  });
  
  const Sede = mongoose.model('product', ProductSchema);
  
  module.exports = Sede;