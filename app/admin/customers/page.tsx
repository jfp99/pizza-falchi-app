'use client';
import { useState, useEffect } from 'react';
import { Users, Mail, Phone, MapPin, ShoppingBag, Euro, Search, Calendar } from 'lucide-react';

interface Customer {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('lastOrderDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, sortBy, sortOrder]);

  const fetchCustomers = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);

      const response = await fetch(`/api/admin/customers?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-red border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Chargement des clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-charcoal mb-4">
            Gestion des <span className="text-primary-red">Clients</span>
          </h1>
          <p className="text-xl text-gray-600">
            {customers.length} client{customers.length !== 1 ? 's' : ''} enregistré{customers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-red focus:outline-none transition"
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-wrap gap-3">
            <span className="font-semibold text-gray-700 flex items-center">Trier par:</span>
            <button
              onClick={() => handleSort('lastOrderDate')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                sortBy === 'lastOrderDate'
                  ? 'bg-primary-red text-white'
                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
              }`}
            >
              Dernière commande {sortBy === 'lastOrderDate' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('totalOrders')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                sortBy === 'totalOrders'
                  ? 'bg-primary-red text-white'
                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
              }`}
            >
              Commandes {sortBy === 'totalOrders' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('totalSpent')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                sortBy === 'totalSpent'
                  ? 'bg-primary-red text-white'
                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
              }`}
            >
              Montant dépensé {sortBy === 'totalSpent' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('name')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                sortBy === 'name'
                  ? 'bg-primary-red text-white'
                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
              }`}
            >
              Nom {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>

        {/* Customers List */}
        {customers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">Aucun client</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Aucun client ne correspond à votre recherche' : 'Aucun client enregistré pour le moment'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {customers.map(customer => (
              <div key={customer._id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Customer Info */}
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-gradient-to-br from-primary-red to-soft-red p-3 rounded-2xl">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-charcoal mb-2">
                          {customer.name}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-700 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary-red" />
                            {customer.phone}
                          </p>
                          {customer.email && (
                            <p className="text-gray-700 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary-red" />
                              {customer.email}
                            </p>
                          )}
                          {customer.address?.street && (
                            <p className="text-gray-700 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary-red" />
                              {customer.address.street}, {customer.address.postalCode} {customer.address.city}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary-yellow/10 to-primary-yellow/5 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="w-5 h-5 text-primary-red" />
                        <span className="text-sm font-semibold text-gray-600">Commandes</span>
                      </div>
                      <p className="text-3xl font-black text-charcoal">{customer.totalOrders}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Euro className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-gray-600">Total dépensé</span>
                      </div>
                      <p className="text-3xl font-black text-charcoal">{customer.totalSpent.toFixed(2)}€</p>
                    </div>

                    <div className="col-span-2 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-600">Dernière commande</span>
                      </div>
                      <p className="text-lg font-bold text-charcoal">{formatDate(customer.lastOrderDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Client depuis:</span>{' '}
                    {new Date(customer.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                  <div>
                    <span className="font-semibold">Panier moyen:</span>{' '}
                    {customer.totalOrders > 0
                      ? (customer.totalSpent / customer.totalOrders).toFixed(2)
                      : '0.00'}€
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
