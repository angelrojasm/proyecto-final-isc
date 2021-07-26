import React from 'react';
import {  Text, View, StyleSheet, Picker, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList} from '../navigation/types.navigation';
import { useState } from 'react';



const ProfileSetup = () => {
  const [selectedValue, setSelectedValue] = useState("asia");
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
    <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Asia" value="asia" />
        <Picker.Item label="Africa" value="africa" />
        <Picker.Item label="North America" value="North America" />
        <Picker.Item label="South America" value="South America" />
        <Picker.Item label="Europe" value="Europe" />
        <Picker.Item label="Australia" value="Australia" />
      </Picker>
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
