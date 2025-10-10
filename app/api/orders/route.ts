import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query = status ? { status } : {};
    const orders = await Order.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (!body.customerName || !body.phone || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Informations manquantes' },
        { status: 400 }
      );
    }

    // Validate delivery address if delivery type is delivery
    if (body.deliveryType === 'delivery') {
      if (!body.deliveryAddress || !body.deliveryAddress.street || !body.deliveryAddress.city || !body.deliveryAddress.postalCode) {
        return NextResponse.json(
          { error: 'Adresse de livraison incomplète' },
          { status: 400 }
        );
      }
    }

    // Find or create customer
    let customer = await Customer.findOne({ phone: body.phone });

    if (!customer) {
      // Create new customer
      customer = await Customer.create({
        name: body.customerName,
        email: body.email,
        phone: body.phone,
        address: body.deliveryAddress || {},
        totalOrders: 1,
        totalSpent: body.total,
        lastOrderDate: new Date(),
      });
    } else {
      // Update existing customer stats
      customer.totalOrders += 1;
      customer.totalSpent += body.total;
      customer.lastOrderDate = new Date();

      // Update customer info if provided and different
      if (body.customerName && body.customerName !== customer.name) {
        customer.name = body.customerName;
      }
      if (body.email && body.email !== customer.email) {
        customer.email = body.email;
      }
      if (body.deliveryAddress && body.deliveryType === 'delivery') {
        customer.address = body.deliveryAddress;
      }

      await customer.save();
    }

    // Calculate estimated delivery time (30-45 minutes from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + (body.deliveryType === 'delivery' ? 45 : 30));

    // Create order
    const order = await Order.create({
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      deliveryType: body.deliveryType,
      deliveryAddress: body.deliveryAddress,
      items: body.items,
      subtotal: body.subtotal,
      tax: body.tax,
      deliveryFee: body.deliveryFee,
      total: body.total,
      paymentMethod: body.paymentMethod,
      notes: body.notes,
      estimatedDelivery,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Populate product details
    const populatedOrder = await Order.findById(order._id).populate('items.product');

    // Send WhatsApp notification
    try {
      const whatsappUrl = await sendWhatsAppNotification({
        orderId: populatedOrder._id.toString().slice(-6).toUpperCase(),
        customerName: populatedOrder.customerName,
        phone: populatedOrder.phone,
        total: populatedOrder.total,
        items: populatedOrder.items.map((item: any) => ({
          name: item.product?.name || 'Produit',
          quantity: item.quantity,
          price: item.price
        })),
        deliveryType: populatedOrder.deliveryType,
        deliveryAddress: populatedOrder.deliveryAddress,
        paymentMethod: populatedOrder.paymentMethod
      });

      // Return the WhatsApp URL in the response so frontend can optionally use it
      return NextResponse.json({
        ...populatedOrder.toObject(),
        whatsappNotificationUrl: whatsappUrl
      }, { status: 201 });
    } catch (whatsappError) {
      console.error('WhatsApp notification error:', whatsappError);
      // Don't fail the order creation if WhatsApp fails
      return NextResponse.json(populatedOrder, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    );
  }
}
