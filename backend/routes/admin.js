const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/admin/stats
router.get('/stats', protect, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalProducts = await Product.countDocuments({ isActive: true });
    const pendingOrders = await Order.countDocuments({ orderStatus: 'placed' });
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const lowStock = await Product.find({
      isActive: true,
      'sizes.stock': { $lte: 3 }
    }).select('name brand sizes');

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalProducts,
      pendingOrders,
      recentOrders,
      lowStock
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
