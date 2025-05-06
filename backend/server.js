const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

mongoose.connect('mongodb+srv://fakhruddinhussain65:Mp1qNuJ2Xkje6G08@cluster-store.hvrmzh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));