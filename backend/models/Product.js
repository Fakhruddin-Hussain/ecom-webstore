const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  description: String,
  price: Number,
  quantity: Number
});

module.exports = mongoose.model('Product', productSchema);