const mongoose = require('mongoose');

const ProdottiCartSchema = mongoose.Schema({
 
  identificativo:{
    type:String,

  },
  prezzo:{
    type:Number,
   
  },
  dateAdd: {
    type: Date,
    default: Date.now
  }
 
});

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique: true
  },
  prodotti: [ProdottiCartSchema],
  ultimaModifica: {
    type: Date,
    default: Date.now
  }


});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;