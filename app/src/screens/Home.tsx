import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/types.navigation';

const image = {
  uri: 'https://proyecto-final-isc.s3.amazonaws.com/pexels-daniel-eliashevsky-7689070.jpg',
};

const Home = ({ navigation }: StackScreenProps<AuthStackParamList, 'home'>) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <LinearGradient colors={['#2544B3', 'transparent']} style={styles.gradient1} />
        <LinearGradient colors={['transparent', '#0A94B7']} style={styles.gradient2} />
        <View style={styles.header}>
          <Text style={styles.text1}>HandyPsych</Text>
          <Text style={styles.text2}>Help us help you help yourself</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('logIn')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '60%',
  },
  gradient2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 400,
    height: '60%',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 50,
  },
  buttonText: {
    color: 'black',
    padding: 15,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    color: 'white',
    fontStyle: 'italic',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
