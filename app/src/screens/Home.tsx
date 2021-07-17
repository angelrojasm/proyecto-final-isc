import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '../components';
import tailwind from 'tailwind-rn';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#2544B3', 'transparent']} style={styles.background} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A94B7',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '50%',
  },
});

export default Home;
