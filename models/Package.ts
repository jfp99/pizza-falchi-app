import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number, // Percentage or fixed amount
      required: true,
    },
    items: [
      {
        type: {
          type: String,
          enum: ['pizza', 'boisson', 'any'],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        description: String,
      },
    ],
    icon: {
      type: String,
      default: '🎁',
    },
    color: {
      type: String,
      default: 'blue',
    },
    available: {
      type: Boolean,
      default: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    badge: String,
  },
  {
    timestamps: true,
  }
);

const Package =
  mongoose.models.Package || mongoose.model('Package', PackageSchema);

export default Package;
