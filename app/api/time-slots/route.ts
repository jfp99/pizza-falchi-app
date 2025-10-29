/**
 * Time Slots API Routes
 * GET: Fetch time slots by date range
 * POST: Generate time slots for specified dates
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import TimeSlot from '@/models/TimeSlot';
import {
  getSlotsByDateRange,
  getAvailableSlotsForDate,
  bulkGenerateTimeSlots,
} from '@/lib/timeSlots';

/**
 * GET /api/time-slots
 * Fetch time slots with optional filters
 * Query params:
 * - date: Specific date (ISO format)
 * - startDate: Start of date range (ISO format)
 * - endDate: End of date range (ISO format)
 * - onlyAvailable: Filter to only available slots (boolean)
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const onlyAvailable = searchParams.get('onlyAvailable') === 'true';

    // Single date query
    if (date) {
      const targetDate = new Date(date);

      if (isNaN(targetDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        );
      }

      const slots = onlyAvailable
        ? await getAvailableSlotsForDate(targetDate)
        : await TimeSlot.find({
            date: {
              $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
              $lt: new Date(targetDate.setHours(23, 59, 59, 999)),
            },
          })
            .populate('orders')
            .sort({ startTime: 1 });

      return NextResponse.json({
        success: true,
        slots,
        count: slots.length,
      });
    }

    // Date range query
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format for date range' },
          { status: 400 }
        );
      }

      if (start > end) {
        return NextResponse.json(
          { error: 'Start date must be before end date' },
          { status: 400 }
        );
      }

      const slots = await getSlotsByDateRange(start, end, onlyAvailable);

      return NextResponse.json({
        success: true,
        slots,
        count: slots.length,
      });
    }

    // Default: Get slots for next 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const slots = await getSlotsByDateRange(today, nextWeek, onlyAvailable);

    return NextResponse.json({
      success: true,
      slots,
      count: slots.length,
    });
  } catch (error) {
    console.error('GET /api/time-slots error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch time slots',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/time-slots
 * Generate time slots for specified dates
 * Body:
 * - startDate: Start date (ISO format)
 * - numberOfDays: Number of days to generate slots for (default: 7)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { startDate, numberOfDays = 7 } = body;

    if (!startDate) {
      return NextResponse.json(
        { error: 'startDate is required' },
        { status: 400 }
      );
    }

    const start = new Date(startDate);

    if (isNaN(start.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format for startDate' },
        { status: 400 }
      );
    }

    if (numberOfDays < 1 || numberOfDays > 30) {
      return NextResponse.json(
        { error: 'numberOfDays must be between 1 and 30' },
        { status: 400 }
      );
    }

    // Generate slots
    const result = await bulkGenerateTimeSlots(start, numberOfDays);

    return NextResponse.json({
      success: true,
      message: `Generated slots for ${result.success} days`,
      result,
    });
  } catch (error) {
    console.error('POST /api/time-slots error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate time slots',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
