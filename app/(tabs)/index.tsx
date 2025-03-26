import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useHabits } from '@/stores/habitStore';
import { Check, Plus } from 'lucide-react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { habits, toggleHabitCompletion } = useHabits();
  const today = new Date();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Habits</Text>
        <Link href="/new-habit" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView style={styles.habitList}>
        {habits.map((habit) => (
          <TouchableOpacity
            key={habit.id}
            style={[
              styles.habitCard,
              habit.completedDates.includes(today.toISOString().split('T')[0]) && 
              styles.completedHabit
            ]}
            onPress={() => toggleHabitCompletion(habit.id)}
          >
            <View style={styles.habitInfo}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.habitTime}>{habit.preferredTime}</Text>
            </View>
            {habit.completedDates.includes(today.toISOString().split('T')[0]) && (
              <Check size={24} color="#10b981" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitList: {
    padding: 20,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  completedHabit: {
    backgroundColor: '#f0fdf4',
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  habitTime: {
    fontSize: 14,
    color: '#6b7280',
  },
});