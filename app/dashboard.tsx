import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    async function loadData() {
      const savedName = await AsyncStorage.getItem('user_name');
      const startDate = await AsyncStorage.getItem('start_date');
      const targetDays = await AsyncStorage.getItem('target_days');
      const price = await AsyncStorage.getItem('drink_price');
      const quantity = await AsyncStorage.getItem('drink_quantity');

      if (savedName) setName(savedName);

      if (startDate && targetDays) {
        const start = new Date(startDate);
        const now = new Date();

        const diffMs = now.getTime() - start.getTime();

        const totalHours = diffMs / (1000 * 60 * 60);
        const totalDays = totalHours / 24;

        setDays(Math.floor(totalDays));
        setHours(Math.floor(totalHours % 24));

        const percent = (totalDays / Number(targetDays)) * 100;
        setPercentage(percent > 100 ? 100 : percent);

        if (price && quantity) {
          const daily = Number(price) * Number(quantity);
          const totalMoney = daily * totalDays;
          setMoney(totalMoney);
        }
      }
    }

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Olá, {name} 👋
      </Text>

      <Text style={styles.time}>
        ⏱ {days} dias e {hours} horas sem beber
      </Text>

      <Text style={styles.progressText}>
        Progresso: {percentage.toFixed(1)}%
      </Text>

      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%` }
          ]} 
        />
      </View>

      <Text style={styles.money}>
        💰 R$ {money.toFixed(2)} economizados
      </Text>

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
    fontSize: 26,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 18,
    marginTop: 15,
  },
  progressText: {
    fontSize: 16,
    marginTop: 20,
  },
  progressBarContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  money: {
    fontSize: 18,
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});