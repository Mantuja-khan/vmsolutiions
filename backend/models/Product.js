import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number
  },
  category: {
    type: String,
    required: true,
    enum: ['laptop', 'accessories', 'services', 'software']
  },
  images: [{
    type: String,
    required: true
  }],
  specifications: {
    type: Map,
    of: String
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  hasOffer: {
    type: Boolean,
    default: false
  },
  offerDetails: {
    discount: Number,
    validUntil: Date,
    description: String
  },
  brand: String,
  model: String,
  warranty: String,
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);