const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const router = express.Router();

// POST /api/payment/create-intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents (LKR)
      currency: 'lkr',
      metadata: { orderId }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/payment/confirm
router.post('/confirm', async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: 'paid',
          stripePaymentId: paymentIntentId,
          orderStatus: 'confirmed',
          $push: { trackingUpdates: { status: 'confirmed', message: 'Payment received. Order confirmed!' } }
        },
        { new: true }
      );
      res.json({ success: true, order });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
