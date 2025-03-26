import { View, Text, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useHabits } from '@/stores/habitStore';

export default function CalendarScreen() {
  const { habits } = useHabits();

  const markedDates = habits.reduce((acc, habit) => {
    habit.completedDates.forEach((date) => {
      if (!acc[date]) {
        acc[date] = { marked: true, dotColor: '#6366f1' };
      }
    });
    return acc;
  }, {} as { [key: string]: { marked: boolean; dotColor: string } });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>

      <RNCalendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#6b7280',
          selectedDayBackgroundColor: '#6366f1',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#6366f1',
          dayTextColor: '#2d3748',
          textDisabledColor: '#a0aec0',
          dotColor: '#6366f1',
          selectedDotColor: '#ffffff',
          arrowColor: '#6366f1',
          monthTextColor: '#2d3748',
          indicatorColor: '#6366f1',
        }}
        markedDates={markedDates}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Monthly Summary</Text>
        <Text style={styles.summaryText}>
          {Object.keys(markedDates).length} habits completed this month
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  calendar: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summary: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#6b7280',
  },
});