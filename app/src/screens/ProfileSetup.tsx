import React from 'react';
import {  Text, View, StyleSheet, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList} from '../navigation/types.navigation';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';



const ProfileSetup = () => {
  return (<View style={styles.container}>
    <Text style={styles.thankYou}>
      Thanks for joining our ever-growing community!
    </Text>
    <Text style={styles.tell}>
      Tell us a little more about yourself...
    </Text>
    <Text>
      What region are you in?
    </Text>

    <Text>
      Which of these topics interest you?
    </Text>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    height: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  thankYou:{
    fontWeight: 'bold',
    color: '#1742eb',
    fontSize: 18,
    marginBottom: 20
  },
  tell:{
    fontSize: 14,
    marginBottom: 20
  },
  register:{
    fontWeight:'bold',
  }
});

export default ProfileSetup;
