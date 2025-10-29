'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { TimeSlot } from '@/types';

interface TimeSlotSelectorProps {
  onSlotSelect: (slot: TimeSlot | null) => void;
  selectedSlot: TimeSlot | null;
}

/**
 * TimeSlotSelector Component
 * Allows customers to select a pickup time slot during checkout
 */
export default function TimeSlotSelector({
  onSlotSelect,
  selectedSlot,
}: TimeSlotSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate next 7 days for date selection
  const getNextSevenDays = () => {
    const days: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const availableDays = getNextSevenDays();

  // Fetch available slots when date changes
  useEffect(() => {
    fetchAvailableSlots(selectedDate);
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: Date) => {
    setLoading(true);
    setError(null);

    try {
      const dateStr = date.toISOString().split('T')[0];
      const response = await fetch(
        `/api/time-slots?date=${dateStr}&onlyAvailable=true`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch time slots');
      }

      const data = await response.json();
      setAvailableSlots(data.slots || []);

      // If no slots available, show error
      if (data.slots.length === 0) {
        setError('Aucun créneau disponible pour cette date');
      }
    } catch (err) {
      setError('Erreur lors du chargement des créneaux');
      console.error('Error fetching time slots:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onSlotSelect(null); // Reset selected slot when date changes
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot._id === selectedSlot?._id) {
      onSlotSelect(null); // Deselect if clicking the same slot
    } else {
      onSlotSelect(slot);
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary-red p-3 rounded-xl">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-charcoal">
            Choisissez votre créneau
          </h3>
        </div>
        <p className="text-gray-600 text-sm ml-[60px]">
          Sélectionnez le jour et l'heure pour récupérer votre commande
        </p>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-charcoal mb-3">
          <Calendar className="w-4 h-4 inline mr-2" />
          Sélectionnez un jour
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {availableDays.map((day, index) => {
            const isSelected =
              day.toDateString() === selectedDate.toDateString();
            const dayLabel = isToday(day) ? "Aujourd'hui" : day.getDate().toString();
            const monthLabel = day.toLocaleDateString('fr-FR', {
              month: 'short',
            });
            const weekdayLabel = day.toLocaleDateString('fr-FR', {
              weekday: 'short',
            });

            return (
              <button
                key={index}
                onClick={() => handleDateSelect(day)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-primary-red to-primary-yellow text-white border-primary-yellow shadow-lg scale-105'
                    : 'bg-white text-charcoal border-gray-200 hover:border-primary-red hover:shadow-md'
                }`}
                aria-label={formatDate(day)}
              >
                <div className="text-center">
                  <div className="text-xs font-medium opacity-80 capitalize">
                    {weekdayLabel}
                  </div>
                  <div className="text-xl font-bold my-1">{dayLabel}</div>
                  <div className="text-xs opacity-80 capitalize">
                    {monthLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-3">
          <Clock className="w-4 h-4 inline mr-2" />
          Créneaux disponibles pour {formatDate(selectedDate)}
        </label>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-red border-t-transparent"></div>
            <p className="text-gray-600 mt-4">Chargement des créneaux...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">{error}</p>
              <p className="text-red-600 text-sm mt-1">
                Essayez de sélectionner une autre date ou contactez-nous
              </p>
            </div>
          </div>
        )}

        {!loading && !error && availableSlots.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableSlots.map((slot) => {
              const isSelected = slot._id === selectedSlot?._id;
              const remainingCapacity = slot.capacity - slot.currentOrders;

              return (
                <button
                  key={slot._id}
                  onClick={() => handleSlotSelect(slot)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? 'bg-gradient-to-br from-primary-red to-primary-yellow text-white border-primary-yellow shadow-lg scale-105'
                      : 'bg-white text-charcoal border-gray-200 hover:border-primary-red hover:shadow-md'
                  }`}
                  aria-label={`Créneau ${slot.startTime} - ${slot.endTime}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Clock
                      className={`w-5 h-5 ${
                        isSelected ? 'text-white' : 'text-primary-red'
                      }`}
                    />
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="text-lg font-bold mb-1">
                    {formatTime(slot.startTime)}
                  </div>
                  <div
                    className={`text-xs ${
                      isSelected ? 'text-white/90' : 'text-gray-600'
                    }`}
                  >
                    {remainingCapacity} place{remainingCapacity > 1 ? 's' : ''}{' '}
                    restante{remainingCapacity > 1 ? 's' : ''}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {!loading && !error && availableSlots.length === 0 && (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-semibold">
              Aucun créneau disponible
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Essayez une autre date ou contactez-nous directement
            </p>
          </div>
        )}
      </div>

      {/* Selected Slot Summary */}
      {selectedSlot && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-green-900 font-bold">Créneau sélectionné</p>
              <p className="text-green-800 text-sm mt-1">
                {formatDate(selectedDate)} à {selectedSlot.startTime} -{' '}
                {selectedSlot.endTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
