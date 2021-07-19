import React from 'react';
import {  Text, View, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList} from '../navigation/types.navigation';
import { useState } from 'react';

const image = { uri: "https://s3-alpha-sig.figma.com/img/7097/0fd2/d966e5b8be303a79ccbbbd7449f4e0c6?Expires=1627257600&Signature=Kx9Ry1bTNyyv8jG~pikaATy~C9WLbfrf0lrC3wF8YvgLij6vMKcHkp7ayznvEbgi3elUGlQ3XPVhS2catIggOQvVgRMTVH7LCeI2VcVjC2r1UGUf-fcQBWJgpfYv~oCKYgiESZqetS4dD5Am8~NsXOE7AdZFn6cHpxiazcdTxsdpriDKlbhGE42M9CC-XBWPVKfhgl0pxuiKkrIY3yLA~yGiqwVuavfuxFn-pAPTsFGCcRh1IT9SM-3-rIUSwTDGKi7abxVEsEvPfLZBuqOe0CQGgo6O~Q-2pXs-T1foaglgrzs7Fkm6-HWhVaouLfl28veN~6qEwbpHJcDRYkcssw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" };

const Login = ({ navigation }: StackScreenProps<AuthStackParamList, 'logIn'>) => {
  const [username, onUsernameInput] = useState('');
  const [password, onPasswordInput] = useState('');
  
  return (<View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <LinearGradient colors={['transparent', '#808080']} style={styles.gradient} />
      <KeyboardAvoidingView style={styles.inputItems}>
        <Text style={styles.text1}>Username</Text>
        <TextInput
          value={username}
          placeholder = 'Username'
          style = {styles.input}
          onChangeText={onUsernameInput}
          >
        </TextInput>
        <Text style={styles.text1}>Password</Text>
        <TextInput
          value={password}
          placeholder = 'Password'
          secureTextEntry
          style = {styles.input}
          onChangeText={onPasswordInput}
        >
        </TextInput>
        <TouchableOpacity style = {styles.button}>
          <Text style = {styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.help}>Don't have an account? <Text style={styles.register} onPress={()=>navigation.navigate('register')}>Register</Text>
      </Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputItems:{
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
  button:{
    height: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input:{
    height: 40 ,
    width: 350,
    backgroundColor: 'transparent',
    marginBottom: 30,
    borderColor: '#1742eb',
    borderBottomWidth: 2
  },
  buttonContainer:{
      backgroundColor: '#ff793f',
      paddingVertical: 10,
      borderRadius: 10
  },
  buttonText:{
      textAlign: 'center',
      color: '#1742eb',
      fontWeight: 'bold'
},
help:{
  color: 'white',
  marginTop: 25
},
  text1:{
    fontWeight: 'bold',
    color: '#1742eb'
  },
  register:{
    fontWeight:'bold',
  }
});

export default Login;
