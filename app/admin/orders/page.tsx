'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/types';
import { Package, Truck, Clock, Phone, Mail, MapPin, CheckCircle, XCircle, ChefHat } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  const fetchOrders = async () => {
    try {
      const url = selectedStatus === 'all'
        ? '/api/orders'
        : `/api/orders?status=${selectedStatus}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      preparing: 'bg-orange-100 text-orange-800 border-orange-300',
      ready: 'bg-green-100 text-green-800 border-green-300',
      completed: 'bg-gray-100 text-gray-800 border-gray-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      preparing: 'En préparation',
      ready: 'Prête',
      completed: 'Terminée',
      cancelled: 'Annulée'
    };
    return labels[status] || status;
  };

  const statusOptions = [
    { value: 'all', label: 'Toutes' },
    { value: 'pending', label: 'En attente' },
    { value: 'confirmed', label: 'Confirmées' },
    { value: 'preparing', label: 'En préparation' },
    { value: 'ready', label: 'Prêtes' },
    { value: 'completed', label: 'Terminées' },
    { value: 'cancelled', label: 'Annulées' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-red border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Chargement des commandes...</p>
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
            Gestion des <span className="text-primary-red">Commandes</span>
          </h1>
          <p className="text-xl text-gray-600">
            {orders.length} commande{orders.length !== 1 ? 's' : ''} {selectedStatus !== 'all' ? `(${getStatusLabel(selectedStatus)})` : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-wrap gap-3">
            {statusOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  selectedStatus === option.value
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">Aucune commande</h3>
            <p className="text-gray-600">Aucune commande ne correspond à vos critères</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-3xl p-8 shadow-lg">
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-charcoal">
                        #{order._id?.slice(-8).toUpperCase()}
                      </h3>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {new Date(order.createdAt!).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.deliveryType === 'delivery' ? (
                      <Truck className="w-6 h-6 text-primary-red" />
                    ) : (
                      <Package className="w-6 h-6 text-primary-red" />
                    )}
                    <span className="font-bold text-charcoal">
                      {order.deliveryType === 'delivery' ? 'Livraison' : 'À emporter'}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-bold text-charcoal mb-4 flex items-center gap-2">
                      <span className="text-primary-red">👤</span> Client
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-semibold">Nom:</span> {order.customerName}
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary-red" />
                        {order.phone}
                      </p>
                      {order.email && (
                        <p className="text-gray-700 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary-red" />
                          {order.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.deliveryType === 'delivery' && order.deliveryAddress && (
                    <div>
                      <h4 className="font-bold text-charcoal mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary-red" /> Adresse
                      </h4>
                      <p className="text-gray-700">
                        {order.deliveryAddress.street}<br />
                        {order.deliveryAddress.postalCode} {order.deliveryAddress.city}
                      </p>
                    </div>
                  )}

                  {/* Estimated Time */}
                  {order.estimatedDelivery && (
                    <div>
                      <h4 className="font-bold text-charcoal mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary-red" /> Heure estimée
                      </h4>
                      <p className="text-gray-700">
                        {new Date(order.estimatedDelivery).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="font-bold text-charcoal mb-4">Articles commandés</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-warm-cream rounded-xl p-4">
                        <div className="flex-1">
                          <p className="font-semibold text-charcoal">{item.product.name}</p>
                          <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                          {item.customizations?.notes && (
                            <p className="text-sm text-gray-500 italic">Note: {item.customizations.notes}</p>
                          )}
                        </div>
                        <p className="font-bold text-charcoal">{item.total.toFixed(2)}€</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="mb-6 bg-soft-yellow-lighter rounded-xl p-4">
                    <h4 className="font-bold text-charcoal mb-2">📝 Notes</h4>
                    <p className="text-gray-700">{order.notes}</p>
                  </div>
                )}

                {/* Pricing */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Sous-total</span>
                    <span>{order.subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>TVA</span>
                    <span>{order.tax.toFixed(2)}€</span>
                  </div>
                  {order.deliveryFee > 0 && (
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Livraison</span>
                      <span>{order.deliveryFee.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xl font-bold text-charcoal border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span className="text-primary-red">{order.total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Status Update Buttons */}
                <div className="flex flex-wrap gap-3">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order._id!, 'confirmed')}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Confirmer
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id!, 'cancelled')}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition"
                      >
                        <XCircle className="w-5 h-5" />
                        Annuler
                      </button>
                    </>
                  )}
                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(order._id!, 'preparing')}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
                    >
                      <ChefHat className="w-5 h-5" />
                      En préparation
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order._id!, 'ready')}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition"
                    >
                      <Package className="w-5 h-5" />
                      Prête
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order._id!, 'completed')}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Terminée
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
