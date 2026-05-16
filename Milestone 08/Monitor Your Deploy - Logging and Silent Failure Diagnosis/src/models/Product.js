import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'clothing', 'books']
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
