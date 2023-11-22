const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const User = require('../models/User.js');
const path = require('path');
const fs = require('fs');



const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne( {email} );

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      tokenExpirationDate:user.tokenExpirationDate,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, nome, cognome, indirizzo, citta, cap, cellulare } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    username,

    email,
    password,
  
   
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});


const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      password:user.password,
      email: user.email,
      role:user.role,
      token:user.token

    });
  } else {
    res.status(404)
    throw new Error('User not found');
  }
});


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select('-password')

//   if (user) {
//     res.json(user)
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })



// const deleteUserAdmin = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)

//   if (user) {
//     await user.remove()
//     res.json({message: "Utente Rimosso"})
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({message: "Utente Rimosso"})
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})







module.exports = {
  login,
  createUser,
  getUser,
  // updateUser,
  getAllUsers,
  deleteUser,

  

  
}
