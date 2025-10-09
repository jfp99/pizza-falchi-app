import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';

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

    return NextResponse.json(populatedOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    );
  }
}
