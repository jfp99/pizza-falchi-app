import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * TimeRange Interface
 * Represents opening and closing time for a day
 */
export interface ITimeRange {
  open: string; // Format: "HH:MM" (e.g., "18:00")
  close: string; // Format: "HH:MM" (e.g., "21:30")
}

/**
 * Exception Interface
 * Represents special dates with different hours or closure
 */
export interface IException {
  date: Date;
  isClosed: boolean;
  reason?: string; // e.g., "Holiday", "Special Event"
  customHours?: ITimeRange;
}

/**
 * OpeningHours Interface
 * Represents the pizzeria's opening hours configuration
 */
export interface IOpeningHours extends Document {
  // Day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  dayOfWeek: number;
  isOpen: boolean; // Is the pizzeria open on this day?
  hours?: ITimeRange; // Opening hours if isOpen = true
  exceptions: IException[]; // Special dates with different hours
  slotDuration: number; // Duration of each time slot in minutes (default: 10)
  ordersPerSlot: number; // Number of orders per slot (default: 2)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * OpeningHours Schema
 */
const OpeningHoursSchema = new Schema<IOpeningHours>(
  {
    dayOfWeek: {
      type: Number,
      required: [true, 'Day of week is required'],
      min: [0, 'Day of week must be between 0 and 6'],
      max: [6, 'Day of week must be between 0 and 6'],
      unique: true,
      index: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    hours: {
      open: {
        type: String,
        required: function () {
          return this.isOpen;
        },
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)'],
      },
      close: {
        type: String,
        required: function () {
          return this.isOpen;
        },
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)'],
      },
    },
    exceptions: [
      {
        date: {
          type: Date,
          required: true,
          index: true,
        },
        isClosed: {
          type: Boolean,
          required: true,
          default: false,
        },
        reason: {
          type: String,
          trim: true,
          maxlength: [200, 'Reason cannot exceed 200 characters'],
        },
        customHours: {
          open: {
            type: String,
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)'],
          },
          close: {
            type: String,
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)'],
          },
        },
      },
    ],
    slotDuration: {
      type: Number,
      required: true,
      default: 10,
      min: [5, 'Slot duration must be at least 5 minutes'],
      max: [60, 'Slot duration cannot exceed 60 minutes'],
    },
    ordersPerSlot: {
      type: Number,
      required: true,
      default: 2,
      min: [1, 'Orders per slot must be at least 1'],
      max: [10, 'Orders per slot cannot exceed 10'],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Indexes for optimized queries
 */
// Index for finding exceptions by date
OpeningHoursSchema.index({ 'exceptions.date': 1 });

/**
 * Validation: Ensure close time is after open time
 */
OpeningHoursSchema.pre('save', function (next) {
  if (this.isOpen && this.hours) {
    const openMinutes = this.timeToMinutes(this.hours.open);
    const closeMinutes = this.timeToMinutes(this.hours.close);

    if (closeMinutes <= openMinutes) {
      return next(new Error('Closing time must be after opening time'));
    }
  }

  // Validate custom hours in exceptions
  if (this.exceptions && this.exceptions.length > 0) {
    for (const exception of this.exceptions) {
      if (!exception.isClosed && exception.customHours) {
        const openMinutes = this.timeToMinutes(exception.customHours.open);
        const closeMinutes = this.timeToMinutes(exception.customHours.close);

        if (closeMinutes <= openMinutes) {
          return next(
            new Error('Exception closing time must be after opening time')
          );
        }
      }
    }
  }

  next();
});

/**
 * Instance Methods
 */

// Convert time string (HH:MM) to minutes since midnight
OpeningHoursSchema.methods.timeToMinutes = function (time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Convert minutes since midnight to time string (HH:MM)
OpeningHoursSchema.methods.minutesToTime = function (minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Get hours for a specific date (considering exceptions)
OpeningHoursSchema.methods.getHoursForDate = function (
  date: Date
): { isOpen: boolean; hours?: ITimeRange; reason?: string } {
  // Normalize date to midnight for comparison
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  // Check for exceptions first
  const exception = this.exceptions.find((exc: IException) => {
    const excDate = new Date(exc.date);
    excDate.setHours(0, 0, 0, 0);
    return excDate.getTime() === targetDate.getTime();
  });

  if (exception) {
    if (exception.isClosed) {
      return {
        isOpen: false,
        reason: exception.reason || 'Closed for special reason',
      };
    }

    if (exception.customHours) {
      return {
        isOpen: true,
        hours: exception.customHours,
        reason: exception.reason,
      };
    }
  }

  // Return regular hours for this day of week
  if (this.isOpen && this.hours) {
    return {
      isOpen: true,
      hours: this.hours,
    };
  }

  return {
    isOpen: false,
    reason: 'Regular closing day',
  };
};

// Check if a specific date/time is within opening hours
OpeningHoursSchema.methods.isTimeWithinHours = function (
  date: Date,
  time: string
): boolean {
  const hoursInfo = this.getHoursForDate(date);

  if (!hoursInfo.isOpen || !hoursInfo.hours) {
    return false;
  }

  const timeMinutes = this.timeToMinutes(time);
  const openMinutes = this.timeToMinutes(hoursInfo.hours.open);
  const closeMinutes = this.timeToMinutes(hoursInfo.hours.close);

  return timeMinutes >= openMinutes && timeMinutes < closeMinutes;
};

// Add an exception for a specific date
OpeningHoursSchema.methods.addException = async function (
  exception: IException
): Promise<IOpeningHours> {
  // Remove existing exception for the same date if any
  this.exceptions = this.exceptions.filter((exc: IException) => {
    const excDate = new Date(exc.date);
    const newDate = new Date(exception.date);
    excDate.setHours(0, 0, 0, 0);
    newDate.setHours(0, 0, 0, 0);
    return excDate.getTime() !== newDate.getTime();
  });

  this.exceptions.push(exception);
  return await this.save();
};

// Remove an exception for a specific date
OpeningHoursSchema.methods.removeException = async function (
  date: Date
): Promise<IOpeningHours> {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  this.exceptions = this.exceptions.filter((exc: IException) => {
    const excDate = new Date(exc.date);
    excDate.setHours(0, 0, 0, 0);
    return excDate.getTime() !== targetDate.getTime();
  });

  return await this.save();
};

/**
 * Static Methods
 */

// Get all opening hours with exceptions
OpeningHoursSchema.statics.getAllWithExceptions = async function (): Promise<
  IOpeningHours[]
> {
  return await this.find().sort({ dayOfWeek: 1 });
};

// Get opening hours for a specific day of week
OpeningHoursSchema.statics.getByDayOfWeek = async function (
  dayOfWeek: number
): Promise<IOpeningHours | null> {
  return await this.findOne({ dayOfWeek });
};

// Check if pizzeria is open on a specific date
OpeningHoursSchema.statics.isOpenOnDate = async function (
  date: Date
): Promise<boolean> {
  const dayOfWeek = date.getDay();
  const openingHours = await this.findOne({ dayOfWeek });

  if (!openingHours) {
    return false;
  }

  const hoursInfo = openingHours.getHoursForDate(date);
  return hoursInfo.isOpen;
};

// Get all exceptions within a date range
OpeningHoursSchema.statics.getExceptionsByDateRange = async function (
  startDate: Date,
  endDate: Date
): Promise<IException[]> {
  const allOpeningHours = await this.find();
  const exceptions: IException[] = [];

  allOpeningHours.forEach((oh: IOpeningHours) => {
    oh.exceptions.forEach((exc: IException) => {
      if (exc.date >= startDate && exc.date <= endDate) {
        exceptions.push(exc);
      }
    });
  });

  return exceptions.sort((a, b) => a.date.getTime() - b.date.getTime());
};

/**
 * Virtual Properties
 */

// Day name (e.g., "Monday", "Tuesday")
OpeningHoursSchema.virtual('dayName').get(function () {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return days[this.dayOfWeek];
});

// Hours as readable string (e.g., "18:00 - 21:30")
OpeningHoursSchema.virtual('hoursDisplay').get(function () {
  if (!this.isOpen || !this.hours) {
    return 'Fermé';
  }
  return `${this.hours.open} - ${this.hours.close}`;
});

/**
 * Export Model
 */
const OpeningHours: Model<IOpeningHours> =
  mongoose.models.OpeningHours ||
  mongoose.model<IOpeningHours>('OpeningHours', OpeningHoursSchema);

export default OpeningHours;
