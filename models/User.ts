import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  phone: String,
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  preferences: [String],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);