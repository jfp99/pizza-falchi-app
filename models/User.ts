import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer', 'cashier'], default: 'customer' },
  phone: String,
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  preferences: [String],
  // Permissions for granular access control (primarily for cashier role)
  permissions: {
    // Orders management
    orders: {
      read: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    // Products management
    products: {
      read: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    // Customers management
    customers: {
      read: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    // Time slots management
    timeSlots: {
      read: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    // Opening hours management
    openingHours: {
      read: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    // Statistics and analytics (admin only)
    analytics: {
      read: { type: Boolean, default: false },
    },
  },
}, { timestamps: true });

/**
 * Pre-save middleware to set permissions based on role
 */
UserSchema.pre('save', function (next) {
  // Auto-set permissions for admin role
  if (this.role === 'admin') {
    this.permissions = {
      orders: { read: true, create: true, update: true, delete: true },
      products: { read: true, create: true, update: true, delete: true },
      customers: { read: true, create: true, update: true, delete: true },
      timeSlots: { read: true, create: true, update: true, delete: true },
      openingHours: { read: true, create: true, update: true, delete: true },
      analytics: { read: true },
    };
  }

  // Auto-set permissions for cashier role
  if (this.role === 'cashier' && !this.permissions?.orders?.read) {
    this.permissions = {
      orders: { read: true, create: true, update: true, delete: false },
      products: { read: true, create: false, update: false, delete: false },
      customers: { read: true, create: true, update: true, delete: false },
      timeSlots: { read: true, create: true, update: true, delete: false },
      openingHours: { read: true, create: false, update: false, delete: false },
      analytics: { read: false },
    };
  }

  // Customer role has no admin permissions
  if (this.role === 'customer') {
    this.permissions = {
      orders: { read: false, create: false, update: false, delete: false },
      products: { read: false, create: false, update: false, delete: false },
      customers: { read: false, create: false, update: false, delete: false },
      timeSlots: { read: false, create: false, update: false, delete: false },
      openingHours: { read: false, create: false, update: false, delete: false },
      analytics: { read: false },
    };
  }

  next();
});

/**
 * Instance method to check if user has permission
 */
UserSchema.methods.hasPermission = function (resource: string, action: string): boolean {
  if (this.role === 'admin') return true;
  if (!this.permissions || !this.permissions[resource]) return false;
  return this.permissions[resource][action] === true;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);