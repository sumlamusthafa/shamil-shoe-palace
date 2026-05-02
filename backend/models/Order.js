const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String }
    }
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    brand: String,
    size: Number,
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    image: String
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: { type: String, enum: ['card', 'cod'], default: 'card' },
  stripePaymentId: { type: String },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  trackingUpdates: [{
    status: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  notes: { type: String, default: '' }
}, { timestamps: true });

// Auto-generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `SSP-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
