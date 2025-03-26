import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useHabits } from '@/stores/habitStore';
import { ArrowLeft } from 'lucide-react-native';

export default function NewHabitScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');

  const { addHabit } = useHabits();

  const handleSubmit = () => {
    if (!name || !preferredTime) return;

    addHabit({
      name,
      description,
      preferredTime,
      frequency,
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>New Habit</Text>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter habit name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter habit description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferred Time</Text>
          <TextInput
            style={styles.input}
            value={preferredTime}
            onChangeText={setPreferredTime}
            placeholder="e.g., 9:00 AM"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.frequencyButtons}>
            {(['daily', 'weekly', 'custom'] as const).map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.frequencyButton,
                  frequency === f && styles.frequencyButtonActive,
                ]}
                onPress={() => setFrequency(f)}
              >
                <Text
                  style={[
                    styles.frequencyButtonText,
                    frequency === f && styles.frequencyButtonTextActive,
                  ]}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, (!name || !preferredTime) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!name || !preferredTime}
        >
          <Text style={styles.submitButtonText}>Create Habit</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  frequencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  frequencyButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  frequencyButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  frequencyButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});