// WhatsApp notification helper
export const sendWhatsAppNotification = async (orderDetails: {
  orderId: string;
  customerName: string;
  phone: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  deliveryType: string;
  deliveryAddress?: {
    street: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
}) => {
  // Your WhatsApp number (restaurant owner)
  const restaurantWhatsApp = '33442920308'; // 04 42 92 03 08 in international format

  // Format order items
  const itemsList = orderDetails.items
    .map((item) => `• ${item.quantity}x ${item.name} (${(item.price * item.quantity).toFixed(2)}€)`)
    .join('\n');

  // Format delivery address
  const addressText = orderDetails.deliveryType === 'delivery' && orderDetails.deliveryAddress
    ? `📍 Adresse: ${orderDetails.deliveryAddress.street}, ${orderDetails.deliveryAddress.postalCode} ${orderDetails.deliveryAddress.city}`
    : orderDetails.deliveryType === 'pickup'
    ? '🏪 À emporter'
    : '🍽️ Sur place';

  // Create WhatsApp message
  const message = `🍕 *NOUVELLE COMMANDE* 🍕

📦 Commande #${orderDetails.orderId}

👤 Client: ${orderDetails.customerName}
📞 Tél: ${orderDetails.phone}

🛒 Articles:
${itemsList}

${addressText}

💳 Paiement: ${orderDetails.paymentMethod === 'cash' ? 'Espèces' : orderDetails.paymentMethod === 'card' ? 'Carte' : 'En ligne'}

💰 *Total: ${orderDetails.total.toFixed(2)}€*

---
Via Pizza Falchi App`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp API endpoint
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${restaurantWhatsApp}&text=${encodedMessage}`;

  // For server-side, we'll just return the URL
  // In a production environment, you'd use WhatsApp Business API or Twilio
  return whatsappUrl;
};

// Helper to format phone number for WhatsApp
export const formatPhoneForWhatsApp = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // If starts with 0, replace with 33 (France)
  if (cleaned.startsWith('0')) {
    return '33' + cleaned.substring(1);
  }

  return cleaned;
};
