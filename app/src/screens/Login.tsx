import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList, RootStackParamList } from '../navigation/types.navigation';
import { logIn } from '../firebase/Auth';
import api from '../api';
import { SessionContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = {
  uri: 'https://proyecto-final-isc.s3.amazonaws.com/pexels-daniel-eliashevsky-7689070.jpg',
};

const Login = ({ navigation }: StackScreenProps<RootStackParamList, 'Auth'>) => {
  const [email, onEmailInput] = useState('');
  const [password, onPasswordInput] = useState('');
  const userContext = useContext(SessionContext);

  const handleLogin = async (): Promise<void> => {
    let { uid }: any = await logIn(email, password);
    if (uid) {
      try {
        await userContext?.logIn(uid);
        await AsyncStorage.setItem('uid', uid);
        navigation.replace('Root');
      } catch (err) {}
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <LinearGradient colors={['transparent', '#808080']} style={styles.gradient} />
        <KeyboardAvoidingView style={styles.inputItems}>
          <Text style={styles.text1}>Email</Text>
          <TextInput
            value={email}
            placeholder="Email"
            placeholderTextColor="#606060"
            style={styles.input}
            onChangeText={(text) => {
              onEmailInput(text.toLowerCase());
            }}></TextInput>
          <Text style={styles.text1}>Password</Text>
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor="#606060"
            secureTextEntry
            style={styles.input}
            onChangeText={onPasswordInput}></TextInput>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.help}>
            Don't have an account?{' '}
            <Text style={styles.register} onPress={() => navigation.replace('register')}>
              Register
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputItems: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 400,
    height: '60%',
  },
  button: {
    height: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'transparent',
    marginBottom: 30,
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  buttonContainer: {
    backgroundColor: '#ff793f',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  help: {
    color: 'white',
    marginTop: 25,
    position: 'relative',
    top: 60,
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
  },
  register: {
    fontWeight: 'bold',
  },
});

export default Login;
