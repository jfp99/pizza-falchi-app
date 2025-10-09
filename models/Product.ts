import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['pizza', 'boisson', 'dessert', 'accompagnement'],
    required: true
  },
  image: String,
  ingredients: [String],
  available: { type: Boolean, default: true },
  popular: { type: Boolean, default: false },
  spicy: { type: Boolean, default: false },
  vegetarian: { type: Boolean, default: false },
  tags: [String],
  stock: {
    type: Number,
    default: 100,
    min: 0
  },
  minStock: {
    type: Number,
    default: 10
  },
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);