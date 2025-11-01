// Google Analytics 4 Tracking Library
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Check if GA is available
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Generic event tracking
export const event = (action: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};

// E-commerce Events

// View Item (Product Detail Page)
export const viewItem = (item: {
  id: string;
  name: string;
  price: number;
  category: string;
  brand?: string;
}) => {
  event('view_item', {
    currency: 'EUR',
    value: item.price,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        item_brand: item.brand || 'Pizza Falchi',
        price: item.price,
        quantity: 1,
      },
    ],
  });
};

// View Item List (Product Catalog)
export const viewItemList = (items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  position?: number;
}>) => {
  event('view_item_list', {
    item_list_name: 'Menu',
    items: items.map((item, index) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: 'Pizza Falchi',
      price: item.price,
      index: item.position || index,
    })),
  });
};

// Select Item (Click on Product)
export const selectItem = (item: {
  id: string;
  name: string;
  price: number;
  category: string;
  position?: number;
}) => {
  event('select_item', {
    item_list_name: 'Menu',
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        item_brand: 'Pizza Falchi',
        price: item.price,
        index: item.position || 0,
      },
    ],
  });
};

// Add to Cart
export const addToCart = (item: {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}) => {
  event('add_to_cart', {
    currency: 'EUR',
    value: item.price * item.quantity,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        item_brand: 'Pizza Falchi',
        price: item.price,
        quantity: item.quantity,
      },
    ],
  });
};

// Remove from Cart
export const removeFromCart = (item: {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}) => {
  event('remove_from_cart', {
    currency: 'EUR',
    value: item.price * item.quantity,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        item_brand: 'Pizza Falchi',
        price: item.price,
        quantity: item.quantity,
      },
    ],
  });
};

// View Cart
export const viewCart = (items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}>, total: number) => {
  event('view_cart', {
    currency: 'EUR',
    value: total,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: 'Pizza Falchi',
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// Begin Checkout
export const beginCheckout = (items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}>, total: number) => {
  event('begin_checkout', {
    currency: 'EUR',
    value: total,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: 'Pizza Falchi',
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// Add Payment Info
export const addPaymentInfo = (
  paymentType: string,
  items: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
  }>,
  total: number
) => {
  event('add_payment_info', {
    currency: 'EUR',
    value: total,
    payment_type: paymentType,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: 'Pizza Falchi',
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// Purchase (Order Completed)
export const purchase = (
  orderId: string,
  items: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
  }>,
  total: number,
  tax?: number,
  shipping?: number,
  coupon?: string
) => {
  event('purchase', {
    transaction_id: orderId,
    currency: 'EUR',
    value: total,
    tax: tax || 0,
    shipping: shipping || 0,
    coupon: coupon || '',
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: 'Pizza Falchi',
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// Add to Wishlist
export const addToWishlist = (item: {
  id: string;
  name: string;
  price: number;
  category: string;
}) => {
  event('add_to_wishlist', {
    currency: 'EUR',
    value: item.price,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        item_brand: 'Pizza Falchi',
        price: item.price,
      },
    ],
  });
};

// Search
export const search = (searchTerm: string) => {
  event('search', {
    search_term: searchTerm,
  });
};

// Custom Events

// Phone Call Click
export const phoneClick = (location: string) => {
  event('phone_click', {
    location,
  });
};

// Review Submission
export const submitReview = (productId: string, rating: number) => {
  event('submit_review', {
    product_id: productId,
    rating,
  });
};

// Newsletter Signup
export const newsletterSignup = (location: string) => {
  event('newsletter_signup', {
    location,
  });
};

// Promo Code Applied
export const promoCodeApplied = (code: string, discount: number) => {
  event('promo_code_applied', {
    promo_code: code,
    discount_amount: discount,
  });
};

// Share Product
export const shareProduct = (productId: string, method: string) => {
  event('share', {
    method,
    content_type: 'product',
    content_id: productId,
  });
};

// Filter Products
export const filterProducts = (filterType: string, filterValue: string) => {
  event('filter_products', {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

// Type definitions for window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}
