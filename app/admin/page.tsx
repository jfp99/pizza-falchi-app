'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart, Users, Pizza, DollarSign, Package,
  ShoppingCart, TrendingUp, Calendar
} from 'lucide-react';

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  completedOrders: number;
}

interface RecentOrder {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/orders/recent')
      ]);
      
      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();
      
      setStats(statsData);
      setRecentOrders(ordersData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Revenue Total',
      value: `${stats.totalRevenue}€`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Commandes',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Produits',
      value: stats.totalProducts.toString(),
      icon: Pizza,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Clients',
      value: stats.totalCustomers.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600">Bienvenue dans votre espace d'administration</p>
        </div>

        {/* Cartes de Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.bgColor} ${card.color} mr-4`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Commandes Récentes */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold">Commandes Récentes</h2>
            </div>
            <div className="p-6">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune commande récente</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map(order => (
                    <div key={order._id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total}€</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions Rapides */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold">Actions Rapides</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => router.push('/admin/products')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-red hover:bg-red-50 transition text-center"
                >
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Gérer les Produits</p>
                </button>
                
                <button 
                  onClick={() => router.push('/admin/orders')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-red hover:bg-red-50 transition text-center"
                >
                  <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Voir les Commandes</p>
                </button>
                
                <button 
                  onClick={() => router.push('/admin/customers')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-red hover:bg-red-50 transition text-center"
                >
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Gérer les Clients</p>
                </button>
                
                <button 
                  onClick={() => router.push('/admin/analytics')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-red hover:bg-red-50 transition text-center"
                >
                  <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Analytiques</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}