const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const connectToMongo = require('./connectToMongo');

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);

const startServer= async () => {
  try{
  await connectToMongo();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  }catch(err){
    console.log("Error Connecting: ",err)
  }
}

startServer();
