import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Package from '@/models/Package';

export async function GET() {
  try {
    await connectDB();
    const packages = await Package.find({ available: true }).sort({ popular: -1, createdAt: -1 });
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des offres' },
      { status: 500 }
    );
  }
}
