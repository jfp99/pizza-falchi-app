import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
  page: { type: String, required: true },
  userAgent: String,
  ip: String,
  referrer: String,
  sessionId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  duration: Number, // in seconds
});

const PhoneCallSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  customerName: String,
  purpose: {
    type: String,
    enum: ['order', 'inquiry', 'complaint', 'other'],
    default: 'order'
  },
  duration: Number, // in seconds
  notes: String,
  handled: { type: Boolean, default: false },
  handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
});

export const Visit = mongoose.models.Visit || mongoose.model('Visit', VisitSchema);
export const PhoneCall = mongoose.models.PhoneCall || mongoose.model('PhoneCall', PhoneCallSchema);