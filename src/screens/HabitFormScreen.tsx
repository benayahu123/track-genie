import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Habit } from '../types';

interface HabitFormScreenProps {
  onSubmit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialHabit?: Habit;
  onCancel: () => void;
}

const HabitFormScreen: React.FC<HabitFormScreenProps> = ({
  onSubmit,
  initialHabit,
  onCancel,
}) => {
  const [name, setName] = useState(initialHabit?.name || '');
  const [description, setDescription] = useState(initialHabit?.description || '');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>(
    initialHabit?.frequency || 'daily'
  );
  const [preferredTime, setPreferredTime] = useState(initialHabit?.preferredTime || '');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(
    initialHabit?.daysOfWeek || []
  );
  const [steps, setSteps] = useState<string[]>(initialHabit?.steps || []);
  const [newStep, setNewStep] = useState('');

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      frequency,
      preferredTime,
      daysOfWeek,
      steps,
    });
  };

  const toggleDay = (day: number) => {
    setDaysOfWeek(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

  const addStep = () => {
    if (newStep.trim()) {
      setSteps(prev => [...prev, newStep.trim()]);
      setNewStep('');
    }
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Habit Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter habit name"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />

        <Text style={styles.label}>Frequency</Text>
        <View style={styles.frequencyContainer}>
          {(['daily', 'weekly', 'custom'] as const).map(freq => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.frequencyButton,
                frequency === freq && styles.frequencyButtonActive,
              ]}
              onPress={() => setFrequency(freq)}
            >
              <Text
                style={[
                  styles.frequencyButtonText,
                  frequency === freq && styles.frequencyButtonTextActive,
                ]}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Preferred Time</Text>
        <TextInput
          style={styles.input}
          value={preferredTime}
          onChangeText={setPreferredTime}
          placeholder="HH:mm"
        />

        <Text style={styles.label}>Days of Week</Text>
        <View style={styles.daysContainer}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                daysOfWeek.includes(index) && styles.dayButtonActive,
              ]}
              onPress={() => toggleDay(index)}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  daysOfWeek.includes(index) && styles.dayButtonTextActive,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Steps</Text>
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <Text style={styles.stepText}>{step}</Text>
              <TouchableOpacity
                style={styles.removeStepButton}
                onPress={() => removeStep(index)}
              >
                <Text style={styles.removeStepText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.addStepContainer}>
            <TextInput
              style={[styles.input, styles.stepInput]}
              value={newStep}
              onChangeText={setNewStep}
              placeholder="Add a step"
            />
            <TouchableOpacity style={styles.addStepButton} onPress={addStep}>
              <Text style={styles.addStepText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {initialHabit ? 'Update' : 'Create'} Habit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  frequencyContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  frequencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  frequencyButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  frequencyButtonText: {
    textAlign: 'center',
    color: '#333',
  },
  frequencyButtonTextActive: {
    color: '#fff',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayButton: {
    width: '13%',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    margin: '0.5%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dayButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayButtonText: {
    textAlign: 'center',
    color: '#333',
  },
  dayButtonTextActive: {
    color: '#fff',
  },
  stepsContainer: {
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  stepText: {
    flex: 1,
    color: '#333',
  },
  removeStepButton: {
    padding: 4,
  },
  removeStepText: {
    color: '#ff3b30',
    fontSize: 20,
  },
  addStepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepInput: {
    flex: 1,
    marginBottom: 0,
  },
  addStepButton: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginLeft: 8,
  },
  addStepText: {
    color: '#fff',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HabitFormScreen; 