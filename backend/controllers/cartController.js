const asyncHandler = require("express-async-handler");

const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

const Cart = require("../models/Cart.js");

// Create Cart

const createCart = asyncHandler(async (req, res) => {
  const userId = req.params.user;

  try {
    let cart = await Cart.create({
      user: req.user.id,
    });

    return res.json(cart);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

const getByIDCart = asyncHandler(async (req, res) => {
  const foundCart = await Cart.findOne({ user: req.user.id });


  if (foundCart) {
    res.json(foundCart);
  } else {
    res.status(404);
    throw new Error("ProductCart not found");
  }
});

// update Cart

const updateCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });


  if (cart) {
    (cart.user = cart.user),
      (cart.prodotti = cart.prodotti),
      (cart.ultimaModifica = new Date());

    const updatedCart = await cart.save();

    res.json({
      _id: updatedCart._id,
      user: updatedCart.user,
      prodotti: updatedCart.prodotti,
      ultimamodifica: updatedCart.ultimaModifica,
    });
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

// delete Cart

const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (cart) {
    await cart.remove();
    res.json({ message: "Cart removed" });
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

////////// ProductCart

const createProductCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const foundProductCart = await Cart.findOne({ user: req.user.id });

    if (foundProductCart) {
      foundProductCart.prodotti.unshift({
        identificativo: req.body.identificativo,
        prezzo: req.body.prezzo,
      });

      await foundProductCart.save();

      res.json(foundProductCart);
    } else {
      res.status(400);
      throw new Error("Product already exists");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateProductCart = asyncHandler(async (req, res) => {
  const foundCart = await Cart.findById(req.params.id);
  parametro = foundCart.productCart;
  const productCart = foundCart.productCart.find(
    (d) => d._id.toString() === req.params._id
  );

  if (ProductCart) {
    productCart.title = req.body.title || productCart.title;
    productCart.start = req.body.start || productCart.start;
    productCart.ore = req.body.ore || productCart.ore;
    productCart.end = req.body.end || productCart.end;
    productCart.tipoEvento = req.body.tipoEvento || productCart.tipoEvento;
    productCart.notaProductCart =
      req.body.notaProductCart || productCart.notaProductCart;

    productCart.dipendenteID =
      req.body.dipendenteID || productCart.dipendenteID;
    productCart.numeroIdentificativo =
      req.body.numeroIdentificativo || productCart.numeroIdentificativo;

    const updatedProductCart = await foundCart.save();
    res.json({
      title: updatedProductCart.title,
      start: updatedProductCart.start,
      ore: updatedProductCart.ore,
      end: updatedProductCart.end,
      tipoEvento: updatedProductCart.tipoEvento,
      notaProductCart: updatedProductCart.notaProductCart,
      dipendenteID: updateProductCart.dipendenteID,
      numeroIdentificativo: updateProductCart.numeroIdentificativo,
    });
  } else {
    res.status(404);
    throw new Error("ProductCart not found");
  }
});

const deleteProductCart = async (req, res) => {
  try {
    const foundCart = await Cart.findByIdAndUpdate(req.params.id);

    foundCart.prodotti = foundCart.prodotti.filter(
      (d) => d._id.toString() !== req.params.cart_id
    );
    await foundCart.save();
    return res.status(200).json(foundCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getAllProductCart = asyncHandler(async (req, res) => {
  const foundProductCart = await Cart.findById(req.params.id);
  const productCart = foundProductCart.productCart;

  if (productCart) {
    res.json({
      productCart,
    });
  } else {
    res.status(404);
    throw new Error("ProductCart not found");
  }
});

const getByIDProductCart = asyncHandler(async (req, res) => {
  const foundProductCart = await Cart.findOne({ user: req.user.id });
  const productCartselect = foundProductCart.prodotti.find(
    (d) => d._id.toString() !== req.params.cart_id
  );

  if (productCartselect) {
    res.json({
      _id: productCartselect._id,
      title: productCartselect.title,
      start: productCartselect.startd,
      ore: productCartselect.ore,
      end: productCartselect.end,
      tipoEvento: productCartselect.tipoEvento,
      notaProductCart: productCartselect.notaProductCart,
      dipendenteID: productCartselect.dipendenteID,
      numeroIdentificativo: productCartselect.numeroIdentificativo,
    });
  } else {
    res.status(404);
    throw new Error("ProductCart not found");
  }
});

module.exports = {
  createCart,
  updateCart,
  getByIDCart,
  deleteCart,

  createProductCart,
  updateProductCart,
  deleteProductCart,
  getAllProductCart,
  getByIDProductCart,
};
