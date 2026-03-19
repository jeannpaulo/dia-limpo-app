import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ConsumptionScreen() {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleContinue() {
    if (price === '' || quantity === '') {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    await AsyncStorage.setItem('drink_price', price);
    await AsyncStorage.setItem('drink_quantity', quantity);

    router.push('/goal');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre seu consumo</Text>

      <TextInput
        style={styles.input}
        placeholder="Preço da bebida (ex: 2.50)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade média (ex: 3)"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
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