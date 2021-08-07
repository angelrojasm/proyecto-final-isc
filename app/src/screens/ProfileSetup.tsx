import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import api from '../api';
import { SessionContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'tailwind-rn';
import { AfflictionCheckbox } from '../components';

const ProfileSetup = ({ route }: { route: any }) => {
  const { userForm } = route.params;
  const [region, setRegion] = useState<any>('NA');
  const [afflictions, setAfflictions] = useState<any>({});
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();

  const handleAfflictions = (name: string) => {
    setAfflictions({
      ...afflictions,
      [name]: !afflictions[name],
    });
  };

  const handleCreate = async () => {
    let afflictionArr = [];
    for (const [key, value] of Object.entries(afflictions)) {
      if (value) afflictionArr.push(key.toLowerCase());
    }

    if (afflictionArr.length > 0) {
      try {
        await api
          .users()
          .create(userForm.uid, userForm.email, userForm.username, region, afflictionArr);
        await userContext?.logIn(userForm.uid);
        await AsyncStorage.setItem('uid', userForm.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Root' }],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <View style={tailwind('mt-16')}>
      <Text style={tailwind('text-blue-700 text-xl text-center font-bold mb-8')}>
        Thanks for joining our ever-growing community!
      </Text>
      <View style={tailwind('ml-8')}>
        <Text style={tailwind('text-base font-bold mb-6')}>
          Tell us a little more about yourself...
        </Text>
        <Text style={tailwind('text-base')}>What region are you in?</Text>
        <View style={tailwind('my-2 border rounded-md border-gray-100 bg-gray-200 w-11/12')}>
          <Picker
            style={tailwind('p-8')}
            selectedValue={region}
            onValueChange={(value) => setRegion(value)}>
            <Picker.Item label="North America" value="NA" />
            <Picker.Item label="South America & The Caribbean" value="SA" />
            <Picker.Item label="Asia" value="AS" />
            <Picker.Item label="Africa" value="AF" />
            <Picker.Item label="Middle East" value="ME" />
            <Picker.Item label="Europe" value="EU" />
            <Picker.Item label="Australia" value="AU" />
          </Picker>
        </View>
        <Text style={tailwind('text-base mt-8 mb-3')}>Which of these topics interest you?</Text>
      </View>
      {/* Affliction Section */}
      <View style={tailwind('flex items-center')}>
        <AfflictionCheckbox
          name="PTSD"
          desc="Post-Traumattic Stress Disorder"
          onChange={handleAfflictions}
        />
        <AfflictionCheckbox name="Anxiety" desc="Stress and Anxiety" onChange={handleAfflictions} />
        <AfflictionCheckbox
          name="Depression"
          desc="Clinic and Chronic Depression"
          onChange={handleAfflictions}
        />
      </View>
      <View style={tailwind('flex items-center ')}>
        <TouchableOpacity style={tailwind('my-12 w-1/3')} onPress={handleCreate}>
          <Text
            style={tailwind(
              'p-2 bg-blue-600 border border-blue-400 text-center mx-2 text-white font-bold rounded-lg'
            )}>
            Ready !
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileSetup;
