const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['school', 'office', 'athletic', 'casual', 'ladies', 'slippers', 'sandals', 'bata', 'mens-slippers']
  },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  images: [{ type: String }],
  sizes: [{
    size: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 }
  }],
  color: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
