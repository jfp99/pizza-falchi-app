import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const [
      totalOrders,
      totalRevenue,
      totalProducts,
      totalCustomers,
      pendingOrders,
      completedOrders
    ] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
      Product.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'completed' })
    ]);

    const revenue = totalRevenue[0]?.total || 0;

    return NextResponse.json({
      totalOrders,
      totalRevenue: revenue.toFixed(2),
      totalProducts,
      totalCustomers,
      pendingOrders,
      completedOrders
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}