import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FrequencyScreen() {
  const [selected, setSelected] = useState('');

  const options = [
    'Fins de semana',
    '2–3 vezes por semana',
    'Quase todos os dias',
    'Todos os dias',
  ];

  async function handleContinue() {
    if (selected === '') {
      Alert.alert('Atenção', 'Selecione uma opção');
      return;
    }

    await AsyncStorage.setItem('user_frequency', selected);

    router.push('/consumption'); // próxima tela
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Com que frequência você bebe?</Text>

      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === item && styles.selectedOption
          ]}
          onPress={() => setSelected(item)}
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