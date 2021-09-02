import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signUp } from '../firebase/Auth';
import { useNavigation } from '@react-navigation/native';
import api from '../api';

const image = {
  uri: 'https://s3-alpha-sig.figma.com/img/7097/0fd2/d966e5b8be303a79ccbbbd7449f4e0c6?Expires=1627257600&Signature=Kx9Ry1bTNyyv8jG~pikaATy~C9WLbfrf0lrC3wF8YvgLij6vMKcHkp7ayznvEbgi3elUGlQ3XPVhS2catIggOQvVgRMTVH7LCeI2VcVjC2r1UGUf-fcQBWJgpfYv~oCKYgiESZqetS4dD5Am8~NsXOE7AdZFn6cHpxiazcdTxsdpriDKlbhGE42M9CC-XBWPVKfhgl0pxuiKkrIY3yLA~yGiqwVuavfuxFn-pAPTsFGCcRh1IT9SM-3-rIUSwTDGKi7abxVEsEvPfLZBuqOe0CQGgo6O~Q-2pXs-T1foaglgrzs7Fkm6-HWhVaouLfl28veN~6qEwbpHJcDRYkcssw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
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
      let { uid } = await signUp(userForm.email, userForm.password);
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
            style={styles.input}
            value={userForm.username}
            onChangeText={(text) => {
              handleChange('username', text);
            }}></TextInput>
          <Text style={styles.text1}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={userForm.email}
            onChangeText={(text) => {
              handleChange('email', text.toLowerCase());
            }}></TextInput>
          <Text style={styles.text1}>Password</Text>
          <TextInput
            placeholder="Password"
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
    borderColor: '#1742eb',
    borderBottomWidth: 2,
  },
  buttonContainer: {
    backgroundColor: '#ff793f',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#1742eb',
    fontWeight: 'bold',
  },
  help: {
    color: 'white',
    marginTop: 25,
  },
  text1: {
    fontWeight: 'bold',
    color: '#1742eb',
  },
  register: {
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
  },
});

export default Register;
