import RNCalendarEvents from 'react-native-calendar-events';
import { CalendarEvent } from '../types';

class CalendarService {
  private static instance: CalendarService;
  private authorized: boolean = false;

  private constructor() {}

  static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const authorized = await RNCalendarEvents.requestPermissions();
      this.authorized = authorized === 'authorized';
      return this.authorized;
    } catch (error) {
      console.error('Error requesting calendar permissions:', error);
      return false;
    }
  }

  async getCalendars() {
    try {
      const calendars = await RNCalendarEvents.findCalendars();
      return calendars;
    } catch (error) {
      console.error('Error fetching calendars:', error);
      return [];
    }
  }

  async getEvents(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    try {
      const events = await RNCalendarEvents.fetchAllEvents(startDate, endDate);
      return events.map(event => ({
        id: event.id,
        title: event.title,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        description: event.description,
        calendarId: event.calendar.id,
        completed: false
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  async createEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent | null> {
    try {
      const createdEvent = await RNCalendarEvents.saveEvent(event.title, {
        description: event.description,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        calendarId: event.calendarId,
      });

      return {
        ...event,
        id: createdEvent.id
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  async updateEvent(event: CalendarEvent): Promise<boolean> {
    try {
      await RNCalendarEvents.saveEvent(event.title, {
        id: event.id,
        description: event.description,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        calendarId: event.calendarId,
      });
      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      return false;
    }
  }

  async deleteEvent(eventId: string): Promise<boolean> {
    try {
      await RNCalendarEvents.removeEvent(eventId);
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }
}

export default CalendarService.getInstance(); 