import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ available: true }).sort({ category: 1, name: 1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement des produits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();

    const product = await Product.create({
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      image: body.image,
      ingredients: body.ingredients || [],
      available: body.available !== undefined ? body.available : true,
      popular: body.popular || false,
      spicy: body.spicy || false,
      vegetarian: body.vegetarian || false,
      tags: body.tags || [],
      stock: body.stock || 100,
      minStock: body.minStock || 10
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}