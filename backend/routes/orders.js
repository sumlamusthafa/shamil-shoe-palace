const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/orders — public (guest checkout)
router.post('/', async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;

    // Calculate total & validate stock
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
      const sizeEntry = product.sizes.find(s => s.size === item.size);
      if (!sizeEntry || sizeEntry.stock < item.quantity)
        return res.status(400).json({ message: `Insufficient stock for size ${item.size} of ${product.name}` });
      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        brand: product.brand,
        size: item.size,
        quantity: item.quantity,
        price: product.price,
        image: product.images[0] || ''
      });
    }

    const order = await Order.create({ customer, items: orderItems, totalAmount, paymentMethod });

    // Deduct stock
    for (const item of items) {
      await Product.updateOne(
        { _id: item.productId, 'sizes.size': item.size },
        { $inc: { 'sizes.$.stock': -item.quantity } }
      );
    }

    res.status(201).json({ order, message: 'Order placed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders/track/:orderNumber — public order tracking
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({
      orderNumber: order.orderNumber,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      trackingUpdates: order.trackingUpdates,
      items: order.items,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders — admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.orderStatus = status;
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const total = await Order.countDocuments(filter);
    res.json({ orders, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:id/status — admin only
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { orderStatus, message } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus,
        $push: { trackingUpdates: { status: orderStatus, message: message || `Order ${orderStatus}` } }
      },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
