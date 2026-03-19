import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GoalScreen() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const options = [
    'Melhorar minha saúde',
    'Economizar dinheiro',
    'Ter mais foco',
    'Dormir melhor',
    'Provar que consigo',
  ];

  function toggleGoal(goal: string) {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(item => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  }

  async function handleContinue() {
    if (selectedGoals.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um objetivo');
      return;
    }

    await AsyncStorage.setItem('user_goals', JSON.stringify(selectedGoals));

    router.push('/target');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Por que você quer parar?</Text>

      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedGoals.includes(item) && styles.selectedOption
          ]}
          onPress={() => toggleGoal(item)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});