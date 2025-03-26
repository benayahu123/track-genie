import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useHabits } from '@/stores/habitStore';
import { subDays, format } from 'date-fns';

export default function ProgressScreen() {
  const { habits } = useHabits();
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(today, i));

  const completionData = last7Days.reverse().map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return habits.reduce((acc, habit) => {
      return acc + (habit.completedDates.includes(dateStr) ? 1 : 0);
    }, 0);
  });

  const labels = last7Days.map(date => format(date, 'MM/dd'));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Last 7 Days</Text>
          <LineChart
            data={{
              labels,
              datasets: [{ data: completionData }],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
            bezier
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{habits.length}</Text>
            <Text style={styles.statLabel}>Total Habits</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {Math.round(
                (completionData.reduce((a, b) => a + b, 0) /
                  (habits.length * 7)) *
                  100
              )}%
            </Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    padding: 20,
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
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
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
});