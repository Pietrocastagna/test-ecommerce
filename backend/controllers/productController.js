const asyncHandler = require('express-async-handler');
const  { check, validationResult } = require( 'express-validator');
const  Product = require( '../models/Product.js');



// Create Product

const createProduct = asyncHandler(
  
  async (req, res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
     
      nome,
      immagine,
      descrizione,
      bigdescrizione,
      prezzo,
      ...rest
    } = req.body;


  

    try {
      
      let product = await Product.create(
        { 
          nome: req.body.nome,
          immagine: req.body.immagine,
          descrizione: req.body.descrizione,
          bigdescrizione: req.body.bigdescrizione,
          prezzo: req.body.prezzo
        
        }
      );
      return res.json(product);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
});



const getAllProduct = asyncHandler(async (req, res) => {
  
  
  const product = await Product.find(req.params.id);

  if (product) {
    res.json(product);
   
  } else  {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getByIDProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404)
    throw new Error('Product not found');
  }
});






const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.nome = req.body.nome || product.nome,
    product.immagine = req.body.immagine || product.immagine,
    product.descrizione = req.body.descrizione || product.descrizione,
    product.bigdescrizione = req.body.bigdescrizione || product.bigdescrizione,

    product.prezzo = req.body.prezzo || product.prezzo,
    product.dataUltimaModifica = new Date()

    const updatedProduct = await product.save();

    res.json({
      _id: updatedProduct._id,
      nome: updatedProduct.nome,
      immagine:updatedProduct.immagine,
      descrizione:updatedProduct.descrizione,
      prezzo:updatedProduct.prezzo,
      dataUltimaModifica:updatedProduct.dataUltimaModifica
    })
 
  } else {
    
    res.status(404)
    throw new Error('Product not found')
  }
});



const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404)
    throw new Error('Product not found');
  }
});






module.exports = {
 
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getByIDProduct,






}
