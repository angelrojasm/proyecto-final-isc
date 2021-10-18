import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View } from 'react-native';

import { addData, unsubscribe } from '../firebase/database';
import firebase from '../firebase/config';

export default function TabOneScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [counter, setCounter] = useState(1);

  const x = async () => {
    let x = counter + 1;
    setCounter(x);
  };

  const getUsers = async () => {
    const users = await fetch('https://proyecto-final-isc-u4bkm.ondigitalocean.app/users');
    const data = await users.json();
  };
  const y = () => {
    firebase
      .database()
      .ref('test/')
      .on('value', (snapshot) => {
        const data = snapshot.val();
      });
  };
  return (
    <View>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />

      <TextInput style={styles.text} value={email} onChangeText={setEmail} />
      <TextInput style={styles.text} value={password} onChangeText={setPassword} />
      <TextInput style={styles.text} value={counter.toString()} />
      <Button
        onPress={x}
        title="Change Counter"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={getUsers}
        title="Read Data from Api"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    backgroundColor: 'white',
    borderBottomColor: 'black',
    color: 'black',
  },
});
