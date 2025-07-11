import express from 'express';
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { adminMiddleware } from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '10y' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      admin: { email, role: 'admin' }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
});

// Get dashboard stats
router.get('/dashboard', adminMiddleware, async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalApplications, totalUsers] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Application.countDocuments(),
      User.countDocuments({ role: { $ne: 'admin' } })
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentApplications = await Application.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalApplications,
        totalUsers
      },
      recentOrders: recentOrders || [],
      recentApplications: recentApplications || []
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard data',
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalApplications: 0,
        totalUsers: 0
      },
      recentOrders: [],
      recentApplications: []
    });
  }
});

// Product management
router.get('/products', adminMiddleware, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(products || []);
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({ message: 'Error fetching products', data: [] });
  }
});

router.post('/products', adminMiddleware, async (req, res) => {
  try {
    const productData = {
      ...req.body,
      isActive: true,
      ratings: {
        average: 0,
        count: 0
      }
    };

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

router.put('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

router.delete('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Add offer to product
router.patch('/products/:id/offer', adminMiddleware, async (req, res) => {
  try {
    const { hasOffer, offerDetails } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { 
        hasOffer,
        offerDetails: hasOffer ? offerDetails : null
      },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Update product offer error:', error);
    res.status(500).json({ message: 'Error updating product offer' });
  }
});

// Order management
router.get('/orders', adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('items.product', 'name images price')
      .sort({ createdAt: -1 })
      .lean();
    
    res.json(orders || []);
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({ message: 'Error fetching orders', data: [] });
  }
});

router.patch('/orders/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name email phone').populate('items.product', 'name images price');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Application management
router.get('/applications', adminMiddleware, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .lean();
    
    res.json(applications || []);
  } catch (error) {
    console.error('Get admin applications error:', error);
    res.status(500).json({ message: 'Error fetching applications', data: [] });
  }
});

router.patch('/applications/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true, runValidators: true }
    ).populate('user', 'name email phone');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
});

// User management
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    
    res.json(users || []);
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ message: 'Error fetching users', data: [] });
  }
});

export default router;