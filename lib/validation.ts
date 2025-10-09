import { Product, Order } from '@/types';

export const validateProduct = (product: Partial<Product>): string[] => {
  const errors: string[] = [];

  if (!product.name || product.name.trim().length === 0) {
    errors.push('Product name is required');
  }

  if (!product.price || product.price <= 0) {
    errors.push('Product price must be greater than 0');
  }

  if (!product.category) {
    errors.push('Product category is required');
  } else if (!['pizza', 'boisson', 'dessert', 'accompagnement'].includes(product.category)) {
    errors.push('Invalid product category');
  }

  return errors;
};

export const validateOrder = (order: Partial<Order>): string[] => {
  const errors: string[] = [];

  if (!order.items || order.items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (!order.customerName || order.customerName.trim().length === 0) {
    errors.push('Customer name is required');
  }

  if (!order.phone || order.phone.trim().length === 0) {
    errors.push('Phone number is required');
  }

  if (!order.deliveryType) {
    errors.push('Delivery type is required');
  } else if (!['delivery', 'pickup'].includes(order.deliveryType)) {
    errors.push('Invalid delivery type');
  }

  if (order.deliveryType === 'delivery') {
    if (!order.deliveryAddress) {
      errors.push('Delivery address is required for delivery orders');
    } else {
      if (!order.deliveryAddress.street) {
        errors.push('Street address is required');
      }
      if (!order.deliveryAddress.city) {
        errors.push('City is required');
      }
      if (!order.deliveryAddress.postalCode) {
        errors.push('Postal code is required');
      }
    }
  }

  if (!order.total || order.total <= 0) {
    errors.push('Order total must be greater than 0');
  }

  return errors;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // French phone number format
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};
