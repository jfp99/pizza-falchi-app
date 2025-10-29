import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * TimeSlot Interface
 * Represents a 10-minute time slot for order scheduling
 */
export interface ITimeSlot extends Document {
  date: Date;
  startTime: string; // Format: "HH:MM" (e.g., "18:00")
  endTime: string; // Format: "HH:MM" (e.g., "18:10")
  capacity: number; // Maximum orders per slot (default: 2)
  currentOrders: number; // Number of currently assigned orders
  orders: mongoose.Types.ObjectId[]; // References to Order documents
  isAvailable: boolean; // Computed: currentOrders < capacity
  status: 'active' | 'full' | 'closed';
  createdAt: Date;
  updatedAt: Date;

  // Instance methods
  canAcceptOrder(): boolean;
  addOrder(orderId: mongoose.Types.ObjectId | string): Promise<ITimeSlot>;
  removeOrder(orderId: mongoose.Types.ObjectId | string): Promise<ITimeSlot>;
}

/**
 * TimeSlot Model Interface
 * Includes static methods
 */
export interface ITimeSlotModel extends Model<ITimeSlot> {
  findAvailableSlots(date: Date): Promise<ITimeSlot[]>;
  findNextAvailable(fromDate?: Date): Promise<ITimeSlot | null>;
  getSlotsByDateRange(startDate: Date, endDate: Date): Promise<ITimeSlot[]>;
}

/**
 * TimeSlot Schema
 */
const TimeSlotSchema = new Schema<ITimeSlot>(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
      index: true,
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)'],
    },
    capacity: {
      type: Number,
      required: true,
      default: 2,
      min: [1, 'Capacity must be at least 1'],
      max: [10, 'Capacity cannot exceed 10'],
    },
    currentOrders: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Current orders cannot be negative'],
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'full', 'closed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Indexes for optimized queries
 */
// Compound index for finding slots by date and time
TimeSlotSchema.index({ date: 1, startTime: 1 });

// Index for finding available slots
TimeSlotSchema.index({ date: 1, isAvailable: 1, status: 1 });

// Index for status queries
TimeSlotSchema.index({ status: 1 });

/**
 * Pre-save middleware to compute isAvailable and update status
 */
TimeSlotSchema.pre('save', function (next) {
  // Compute isAvailable based on capacity
  this.isAvailable = this.currentOrders < this.capacity;

  // Auto-update status based on availability
  if (this.status !== 'closed') {
    this.status = this.isAvailable ? 'active' : 'full';
  }

  // Ensure currentOrders matches orders array length
  if (this.orders && this.orders.length !== this.currentOrders) {
    this.currentOrders = this.orders.length;
  }

  next();
});

/**
 * Instance Methods
 */

// Check if slot can accept a new order
TimeSlotSchema.methods.canAcceptOrder = function (): boolean {
  return this.isAvailable && this.status === 'active' && this.currentOrders < this.capacity;
};

// Add an order to the slot
TimeSlotSchema.methods.addOrder = async function (
  orderId: mongoose.Types.ObjectId
): Promise<ITimeSlot> {
  if (!this.canAcceptOrder()) {
    throw new Error('Time slot is not available for new orders');
  }

  this.orders.push(orderId);
  this.currentOrders += 1;

  return await this.save();
};

// Remove an order from the slot
TimeSlotSchema.methods.removeOrder = async function (
  orderId: mongoose.Types.ObjectId
): Promise<ITimeSlot> {
  const orderIndex = this.orders.findIndex((id) => id.equals(orderId));

  if (orderIndex === -1) {
    throw new Error('Order not found in this time slot');
  }

  this.orders.splice(orderIndex, 1);
  this.currentOrders -= 1;

  return await this.save();
};

/**
 * Static Methods
 */

// Find available slots for a given date
TimeSlotSchema.statics.findAvailableSlots = async function (
  date: Date
): Promise<ITimeSlot[]> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await this.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    isAvailable: true,
    status: 'active',
  }).sort({ startTime: 1 });
};

// Find next available slot from a given date/time
TimeSlotSchema.statics.findNextAvailable = async function (
  fromDate: Date = new Date()
): Promise<ITimeSlot | null> {
  return await this.findOne({
    date: { $gte: fromDate },
    isAvailable: true,
    status: 'active',
  })
    .sort({ date: 1, startTime: 1 })
    .exec();
};

// Get slots by date range
TimeSlotSchema.statics.getSlotsByDateRange = async function (
  startDate: Date,
  endDate: Date
): Promise<ITimeSlot[]> {
  return await this.find({
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: 1, startTime: 1 });
};

/**
 * Virtual Properties
 */

// Full time range as string (e.g., "18:00 - 18:10")
TimeSlotSchema.virtual('timeRange').get(function () {
  return `${this.startTime} - ${this.endTime}`;
});

// Remaining capacity
TimeSlotSchema.virtual('remainingCapacity').get(function () {
  return this.capacity - this.currentOrders;
});

/**
 * Export Model
 */
const TimeSlot: ITimeSlotModel =
  (mongoose.models.TimeSlot as ITimeSlotModel) ||
  mongoose.model<ITimeSlot, ITimeSlotModel>('TimeSlot', TimeSlotSchema);

export default TimeSlot;
