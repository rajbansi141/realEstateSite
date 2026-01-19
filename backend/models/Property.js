const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  type: {
    type: String,
    enum: ['house', 'land'],
    required: [true, 'Please specify property type']
  },
  category: {
    type: String,
    enum: ['buy', 'sell'],
    required: [true, 'Please specify if buying or selling']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide an address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide a city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide a state'],
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    }
  },
  size: {
    type: Number,
    required: [true, 'Please provide property size'],
    min: [0, 'Size cannot be negative']
  },
  sizeUnit: {
    type: String,
    enum: ['sqft', 'sqm', 'acres'],
    default: 'sqft'
  },
  bedrooms: {
    type: Number,
    min: [0, 'Bedrooms cannot be negative'],
    default: 0
  },
  bathrooms: {
    type: Number,
    min: [0, 'Bathrooms cannot be negative'],
    default: 0
  },
  images: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search
propertySchema.index({ title: 'text', description: 'text', 'location.city': 'text', 'location.state': 'text' });

module.exports = mongoose.model('Property', propertySchema);
