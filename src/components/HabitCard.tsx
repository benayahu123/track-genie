import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onPress: (habit: Habit) => void;
  onComplete: (habit: Habit) => void;
  isCompleted?: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onPress,
  onComplete,
  isCompleted = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isCompleted && styles.completedContainer]}
      onPress={() => onPress(habit)}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{habit.name}</Text>
          <TouchableOpacity
            style={[styles.checkbox, isCompleted && styles.checked]}
            onPress={() => onComplete(habit)}
          >
            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>

        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}

        <View style={styles.details}>
          <Text style={styles.detailText}>
            Frequency: {habit.frequency}
          </Text>
          {habit.preferredTime && (
            <Text style={styles.detailText}>
              Preferred Time: {habit.preferredTime}
            </Text>
          )}
          {habit.daysOfWeek && habit.daysOfWeek.length > 0 && (
            <Text style={styles.detailText}>
              Days: {habit.daysOfWeek.map(day => {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return days[day];
              }).join(', ')}
            </Text>
          )}
        </View>

        {habit.steps && habit.steps.length > 0 && (
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>Steps:</Text>
            {habit.steps.map((step, index) => (
              <Text key={index} style={styles.step}>
                • {step}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    backgroundColor: '#f0f9f0',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  details: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  step: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HabitCard; 