import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  customizations: {
    size: String,
    toppings: [String],
    notes: String
  },
  total: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  email: { type: String },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'online'],
    default: 'cash'
  },
  deliveryType: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true,
    default: 'pickup'
  },
  deliveryAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  phone: { type: String, required: true },
  notes: String,
  estimatedDelivery: Date,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);