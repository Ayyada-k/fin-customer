// models/Customer.js
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  memberNumber: { 
    type: Number, 
    required: true, 
    unique: true,
    min: 1
  },
  interests: { 
    type: String, 
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;