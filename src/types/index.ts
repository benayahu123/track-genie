export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday
  preferredTime?: string; // HH:mm format
  timeWindow?: {
    start: string;
    end: string;
  };
  steps?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  habits: string[]; // Array of habit IDs
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[];
  preferredTime?: string;
  timeWindow?: {
    start: string;
    end: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  calendarId: string;
  habitId?: string;
  routineId?: string;
  completed: boolean;
}

export interface UserProgress {
  habitId: string;
  date: Date;
  completed: boolean;
  streak: number;
  notes?: string;
} 