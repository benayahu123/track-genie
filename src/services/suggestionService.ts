import { Habit, CalendarEvent } from '../types';
import calendarService from './calendarService';

interface TimeSlot {
  start: Date;
  end: Date;
  score: number;
}

class SuggestionService {
  private static instance: SuggestionService;

  private constructor() {}

  static getInstance(): SuggestionService {
    if (!SuggestionService.instance) {
      SuggestionService.instance = new SuggestionService();
    }
    return SuggestionService.instance;
  }

  private calculateTimeSlotScore(
    slot: TimeSlot,
    habit: Habit,
    existingEvents: CalendarEvent[]
  ): number {
    let score = 0;

    // Check if the time slot conflicts with existing events
    const hasConflict = existingEvents.some(event => {
      return (
        (slot.start >= event.startDate && slot.start < event.endDate) ||
        (slot.end > event.startDate && slot.end <= event.endDate)
      );
    });

    if (hasConflict) {
      return -1; // Invalid time slot
    }

    // Score based on preferred time
    if (habit.preferredTime) {
      const preferredHour = parseInt(habit.preferredTime.split(':')[0]);
      const slotHour = slot.start.getHours();
      const timeDiff = Math.abs(preferredHour - slotHour);
      score += (24 - timeDiff) / 24; // Higher score for closer to preferred time
    }

    // Score based on day of week preference
    if (habit.daysOfWeek && habit.daysOfWeek.includes(slot.start.getDay())) {
      score += 1;
    }

    // Score based on time window preference
    if (habit.timeWindow) {
      const slotStartHour = slot.start.getHours();
      const slotStartMinute = slot.start.getMinutes();
      const windowStartHour = parseInt(habit.timeWindow.start.split(':')[0]);
      const windowStartMinute = parseInt(habit.timeWindow.start.split(':')[1]);
      const windowEndHour = parseInt(habit.timeWindow.end.split(':')[0]);
      const windowEndMinute = parseInt(habit.timeWindow.end.split(':')[1]);

      const slotTime = slotStartHour * 60 + slotStartMinute;
      const windowStartTime = windowStartHour * 60 + windowStartMinute;
      const windowEndTime = windowEndHour * 60 + windowEndMinute;

      if (slotTime >= windowStartTime && slotTime <= windowEndTime) {
        score += 1;
      }
    }

    return score;
  }

  async suggestTimeSlots(
    habit: Habit,
    date: Date,
    duration: number // in minutes
  ): Promise<TimeSlot[]> {
    try {
      // Get existing events for the day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const existingEvents = await calendarService.getEvents(startOfDay, endOfDay);

      // Generate time slots
      const slots: TimeSlot[] = [];
      const slotDuration = duration * 60 * 1000; // Convert to milliseconds

      // Generate slots every 30 minutes
      for (let time = 0; time < 24 * 60; time += 30) {
        const start = new Date(date);
        start.setHours(Math.floor(time / 60));
        start.setMinutes(time % 60);
        start.setSeconds(0);
        start.setMilliseconds(0);

        const end = new Date(start.getTime() + slotDuration);

        const score = this.calculateTimeSlotScore(slot, habit, existingEvents);
        if (score >= 0) {
          slots.push({ start, end, score });
        }
      }

      // Sort slots by score and return top 5
      return slots
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    } catch (error) {
      console.error('Error suggesting time slots:', error);
      return [];
    }
  }
}

export default SuggestionService.getInstance(); 