import express from 'express';
import Application from '../models/Application.js';
import { authMiddleware } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

// Submit application
router.post('/', authMiddleware, [
  body('type').isIn(['insurance', 'loan']).withMessage('Invalid application type'),
  body('subType').notEmpty().withMessage('Sub-type is required'),
  body('personalInfo.fullName').trim().isLength({ min: 2 }).withMessage('Full name is required'),
  body('personalInfo.email').isEmail().withMessage('Valid email is required'),
  body('personalInfo.phone').isMobilePhone().withMessage('Valid phone number is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationData = {
      ...req.body,
      user: req.user.userId
    };

    const application = new Application(applicationData);
    await application.save();

    await application.populate('user');

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
});

// Get user applications
router.get('/my-applications', authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Get single application
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate('user');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Error fetching application' });
  }
});

export default router;