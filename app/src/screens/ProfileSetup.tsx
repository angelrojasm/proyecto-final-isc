import React from 'react';
import {  Text, View, StyleSheet, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {RootStackParamList } from '../navigation/types.navigation';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const ProfileSetup = ({ navigation }: StackScreenProps<RootStackParamList, 'Auth'>) => {
  const [region, setRegion] = useState('');
  return (<View style={styles.container}>
    <Text style={styles.thankYou}>
      Thanks for joining our ever-growing community!
    </Text>
    <Text style={styles.tell}>
      Tell us a little more about yourself...
    </Text>
    <Text style={styles.regionText}>
      What region are you in?
    </Text>
    <RNPickerSelect
            onValueChange={(value) => setRegion(value)}
            items={[
                { label: 'North America', value: 'north america' },
                { label: 'South America & The Caribbean', value: 'south america' },
                { label: 'Asia', value: 'Asia' },
                { label: 'Africa', value: 'Afria' },
                { label: 'Europe', value: 'Europe' },
                { label: 'Australia', value: 'Australia' }
            ]}
        />
    <Text style={styles.interest}>
      Which of these topics interest you?
    </Text>
    <TouchableOpacity style = {styles.button} onPress={() => navigation.replace('Root')}>
          <Text style = {styles.buttonText}>Ready!</Text>
        </TouchableOpacity>
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
    backgroundColor: '#1742eb',
    borderRadius: 50,
    justifyContent: 'center',
    marginTop: 60
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
  },
  interest:{
    marginTop: 20
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
},
regionText:{
  fontWeight: 'bold'
}
});

export default ProfileSetup;
