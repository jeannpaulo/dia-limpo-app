import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TargetScreen() {
  const [selected, setSelected] = useState('');
  const [customDays, setCustomDays] = useState('');

  const options = ['7', '15', '30'];

  async function handleContinue() {
    let finalDays = selected;

    if (selected === 'custom') {
      if (customDays === '') {
        Alert.alert('Atenção', 'Digite a quantidade de dias');
        return;
      }
      finalDays = customDays;
    }

    if (finalDays === '') {
      Alert.alert('Atenção', 'Selecione uma meta');
      return;
    }

    await AsyncStorage.setItem('target_days', finalDays);

    // salvar data de início (IMPORTANTÍSSIMO)
    const now = new Date().toISOString();
    await AsyncStorage.setItem('start_date', now);

    router.push('/dashboard');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual é sua meta?</Text>

      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === item && styles.selectedOption
          ]}
          onPress={() => setSelected(item)}
        >
          <Text style={styles.optionText}>{item} dias</Text>
        </TouchableOpacity>
      ))}

      {/* opção personalizada */}
      <TouchableOpacity
        style={[
          styles.option,
          selected === 'custom' && styles.selectedOption
        ]}
        onPress={() => setSelected('custom')}
      >
        <Text style={styles.optionText}>Personalizado</Text>
      </TouchableOpacity>

      {selected === 'custom' && (
        <TextInput
          style={styles.input}
          placeholder="Digite os dias"
          keyboardType="numeric"
          value={customDays}
          onChangeText={setCustomDays}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Começar</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
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