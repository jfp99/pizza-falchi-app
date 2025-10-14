import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
import { sendWhatsAppNotification } from '@/lib/whatsapp';
import { readLimiter, orderLimiter } from '@/lib/rateLimiter';
import { orderSchema } from '@/lib/validations/order';

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await readLimiter(request);
  if (rateLimitResponse) return rateLimitResponse;

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
  // Apply rate limiting for order creation
  const rateLimitResponse = await orderLimiter(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    await connectDB();

    const body = await request.json();

    // Validate input with Zod
    const validationResult = orderSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Données de commande invalides',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Find or create customer
    let customer = await Customer.findOne({ phone: validatedData.phone });

    if (!customer) {
      // Create new customer
      customer = await Customer.create({
        name: validatedData.customerName,
        email: validatedData.email || '',
        phone: validatedData.phone,
        address: validatedData.deliveryAddress || {},
        totalOrders: 1,
        totalSpent: validatedData.total,
        lastOrderDate: new Date(),
      });
    } else {
      // Update existing customer stats
      customer.totalOrders += 1;
      customer.totalSpent += validatedData.total;
      customer.lastOrderDate = new Date();

      // Update customer info if provided and different
      if (validatedData.customerName && validatedData.customerName !== customer.name) {
        customer.name = validatedData.customerName;
      }
      if (validatedData.email && validatedData.email !== customer.email) {
        customer.email = validatedData.email;
      }
      if (validatedData.deliveryAddress && validatedData.deliveryType === 'delivery') {
        customer.address = validatedData.deliveryAddress;
      }

      await customer.save();
    }

    // Calculate estimated delivery time (30-45 minutes from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setMinutes(
      estimatedDelivery.getMinutes() + (validatedData.deliveryType === 'delivery' ? 45 : 30)
    );

    // Create order
    const order = await Order.create({
      customerName: validatedData.customerName,
      email: validatedData.email || '',
      phone: validatedData.phone,
      deliveryType: validatedData.deliveryType,
      deliveryAddress: validatedData.deliveryAddress,
      items: validatedData.items,
      subtotal: validatedData.subtotal,
      tax: validatedData.tax,
      deliveryFee: validatedData.deliveryFee,
      total: validatedData.total,
      paymentMethod: validatedData.paymentMethod,
      notes: validatedData.notes || '',
      estimatedDelivery,
      status: 'pending',
      paymentStatus: 'pending',
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
