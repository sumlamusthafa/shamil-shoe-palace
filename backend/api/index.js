const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('../routes/auth'));
app.use('/api/products', require('../routes/products'));
app.use('/api/orders', require('../routes/orders'));
app.use('/api/payment', require('../routes/payment'));
app.use('/api/admin', require('../routes/admin'));

app.get('/', (req, res) => res.json({ message: 'Shamil Shoe Palace API running ✅' }));
app.get('/api', (req, res) => res.json({ message: 'Shamil Shoe Palace API running ✅' }));

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB error:', err);
    isConnected = false;
  }
};

connectDB();

module.exports = app;
