import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Habit, UserProgress } from '../types';

interface ProgressScreenProps {
  habits: Habit[];
  progress: UserProgress[];
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ habits, progress }) => {
  const getHabitProgress = (habitId: string) => {
    return progress.filter(p => p.habitId === habitId);
  };

  const calculateStreak = (habitProgress: UserProgress[]) => {
    if (habitProgress.length === 0) return 0;
    return Math.max(...habitProgress.map(p => p.streak));
  };

  const calculateCompletionRate = (habitProgress: UserProgress[]) => {
    if (habitProgress.length === 0) return 0;
    const completed = habitProgress.filter(p => p.completed).length;
    return (completed / habitProgress.length) * 100;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Track your habit completion and streaks</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{habits.length}</Text>
          <Text style={styles.statLabel}>Total Habits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {habits.filter(h => getHabitProgress(h.id).length > 0).length}
          </Text>
          <Text style={styles.statLabel}>Active Habits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {Math.max(...habits.map(h => calculateStreak(getHabitProgress(h.id))))}
          </Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
      </View>

      <View style={styles.habitsContainer}>
        {habits.map(habit => {
          const habitProgress = getHabitProgress(habit.id);
          const streak = calculateStreak(habitProgress);
          const completionRate = calculateCompletionRate(habitProgress);

          return (
            <View key={habit.id} style={styles.habitCard}>
              <View style={styles.habitHeader}>
                <Text style={styles.habitName}>{habit.name}</Text>
                <Text style={styles.habitFrequency}>{habit.frequency}</Text>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${completionRate}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {completionRate.toFixed(1)}% Complete
                </Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{streak}</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {habitProgress.filter(p => p.completed).length}
                  </Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {habitProgress.length}
                  </Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
              </View>

              {habitProgress.length > 0 && (
                <View style={styles.recentActivity}>
                  <Text style={styles.recentActivityTitle}>Recent Activity</Text>
                  {habitProgress
                    .slice(-3)
                    .reverse()
                    .map((p, index) => (
                      <View key={index} style={styles.activityItem}>
                        <Text style={styles.activityDate}>
                          {new Date(p.date).toLocaleDateString()}
                        </Text>
                        <Text
                          style={[
                            styles.activityStatus,
                            p.completed
                              ? styles.activityCompleted
                              : styles.activityMissed,
                          ]}
                        >
                          {p.completed ? 'Completed' : 'Missed'}
                        </Text>
                      </View>
                    ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  habitsContainer: {
    padding: 16,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  habitFrequency: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  recentActivity: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  recentActivityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  activityDate: {
    fontSize: 14,
    color: '#666',
  },
  activityStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityCompleted: {
    color: '#34c759',
  },
  activityMissed: {
    color: '#ff3b30',
  },
});

export default ProgressScreen; 