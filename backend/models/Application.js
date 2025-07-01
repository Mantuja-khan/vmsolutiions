import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['insurance', 'loan']
  },
  subType: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    maritalStatus: String,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  financialInfo: {
    monthlyIncome: Number,
    employmentType: String,
    companyName: String,
    workExperience: Number,
    panNumber: String,
    aadharNumber: String
  },
  specificDetails: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: String
}, {
  timestamps: true
});

export default mongoose.model('Application', applicationSchema);