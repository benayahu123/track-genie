import { create } from 'zustand';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  preferredTime: string;
  completedDates: string[];
  steps?: string[];
  createdAt: string;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'completedDates' | 'createdAt'>) => void;
  toggleHabitCompletion: (habitId: string) => void;
  deleteHabit: (habitId: string) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
}

export const useHabits = create<HabitStore>((set) => ({
  habits: [],
  addHabit: (habit) => {
    set((state) => ({
      habits: [
        ...state.habits,
        {
          ...habit,
          id: Math.random().toString(36).substr(2, 9),
          completedDates: [],
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  },
  toggleHabitCompletion: (habitId) => {
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      return {
        habits: state.habits.map((habit) => {
          if (habit.id === habitId) {
            const isCompleted = habit.completedDates.includes(today);
            return {
              ...habit,
              completedDates: isCompleted
                ? habit.completedDates.filter((date) => date !== today)
                : [...habit.completedDates, today],
            };
          }
          return habit;
        }),
      };
    });
  },
  deleteHabit: (habitId) => {
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== habitId),
    }));
  },
  updateHabit: (habitId, updates) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updates } : habit
      ),
    }));
  },
}));