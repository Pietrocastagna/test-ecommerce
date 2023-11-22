 require("dotenv").config({ path: `${__dirname}/.env` });
const path = require("path");
const express = require("express");
const cors = require("cors");

const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require("./routes/productRoutes.js")
const cartRoutes = require("./routes/cartRoutes.js")
const imageRoutes = require("./routes/imageRoutes.js")

const connectDB = require( './config/db.js');





const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors())



app.get("/", (req, res)=>{
  res.send("<h3> Benvenuti al Shop </h3>");
})





// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/upload', imageRoutes);



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder


  // app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 8000;

app.listen(PORT,  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
