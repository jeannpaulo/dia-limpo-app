import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadName() {
      const savedName = await AsyncStorage.getItem('user_name');
      if (savedName) {
        setName(savedName);
      }
    }

    loadName();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {name ? `Olá, ${name} 👋` : 'Dia Limpo'}
      </Text>

      <Text style={styles.subtitle}>
        Sua jornada começa hoje
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/name')}
      >
        <Text style={styles.buttonText}>
          {name ? 'Continuar' : 'Começar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});