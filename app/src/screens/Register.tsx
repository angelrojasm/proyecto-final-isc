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
import { signUp } from '../firebase/Auth';
import { useNavigation } from '@react-navigation/native';
import api from '../api';

const image = {
  uri: 'https://proyecto-final-isc.s3.amazonaws.com/pexels-daniel-eliashevsky-7689070.jpg',
};

const Register = () => {
  const [registerError, setRegisterError] = useState<boolean>(false);
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    uid: '',
  });
  const navigation = useNavigation();

  const handleChange = (name: string, text: string) => {
    setUserForm({
      ...userForm,
      [name]: text,
    });
  };
  const register = async (): Promise<void> => {
    let duplicates = await api.users().getByName(userForm.username);
    if (duplicates?.length > 0) {
      setRegisterError(true);
    } else {
      let { uid }: any = await signUp(userForm.email, userForm.password);
      if (uid) {
        navigation.navigate('profileSetup', { ...userForm, uid });
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <LinearGradient colors={['transparent', '#808080']} style={styles.gradient} />
        <KeyboardAvoidingView style={styles.inputItems}>
          <Text style={styles.text1}>Username</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#606060"
            style={styles.input}
            value={userForm.username}
            onChangeText={(text) => {
              handleChange('username', text);
            }}></TextInput>
          <Text style={styles.text1}>Email</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#606060"
            style={styles.input}
            value={userForm.email}
            onChangeText={(text) => {
              handleChange('email', text.toLowerCase());
            }}></TextInput>
          <Text style={styles.text1}>Password</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#606060"
            secureTextEntry
            style={styles.input}
            value={userForm.password}
            onChangeText={(text) => handleChange('password', text)}></TextInput>
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          {registerError && <Text style={styles.errorMessage}>Error Registering User</Text>}
          <Text style={styles.help}>
            Already have an account?{' '}
            <Text style={styles.register} onPress={() => navigation.navigate('logIn')}>
              Sign In
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
    width: '85%',
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
    marginTop: 90,
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
  },
  register: {
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
  },
});

export default Register;
