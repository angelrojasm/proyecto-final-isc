import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types.navigation';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import api from '../api';
import { SessionContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileSetup = ({
  route,
  nav,
}: {
  route: any;
  nav: StackScreenProps<RootStackParamList, 'Auth'>;
}) => {
  const { userForm } = route.params;
  const [region, setRegion] = useState('');
  const { navigation } = nav;
  const userContext = useContext(SessionContext);

  const handleCreate = async () => {
    if (region) {
      try {
        await api.users().create(userForm.uid, userForm.email, userForm.username, region);
        await userContext?.logIn(userForm.uid);
        await AsyncStorage.setItem('uid', userForm.uid);
        navigation.replace('Root');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.thankYou}>Thanks for joining our ever-growing community!</Text>
      <Text style={styles.tell}>Tell us a little more about yourself...</Text>
      <Text style={styles.regionText}>What region are you in?</Text>
      <RNPickerSelect
        onValueChange={(value: string) => setRegion(value)}
        items={[
          { label: 'North America', value: 'NA' },
          { label: 'South America & The Caribbean', value: 'SA' },
          { label: 'Asia', value: 'AS' },
          { label: 'Africa', value: 'AF' },
          { label: 'Middle East', value: 'ME' },
          { label: 'Europe', value: 'EU' },
          { label: 'Australia', value: 'AU' },
        ]}
      />
      <Text style={styles.interest}>Which of these topics interest you?</Text>
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Ready!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#1742eb',
    borderRadius: 50,
    justifyContent: 'center',
    marginTop: 60,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  thankYou: {
    fontWeight: 'bold',
    color: '#1742eb',
    fontSize: 18,
    marginBottom: 20,
  },
  tell: {
    fontSize: 14,
    marginBottom: 20,
  },
  register: {
    fontWeight: 'bold',
  },
  interest: {
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  regionText: {
    fontWeight: 'bold',
  },
});

export default ProfileSetup;
