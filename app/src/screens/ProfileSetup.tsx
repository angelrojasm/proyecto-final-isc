import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
  const { username, uid, email } = route.params;
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
        await api.users().create(uid, email, username, region, afflictionArr);
        await userContext?.logIn(uid);
        await AsyncStorage.setItem('uid', uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Root' }],
        });
      } catch (err) {}
    }
  };
  return (
    <ScrollView contentContainerStyle={tailwind('mt-16')}>
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
          name="Autism"
          desc="Autism Spectrum Disorder"
          onChange={handleAfflictions}
        />
        <AfflictionCheckbox name="Anxiety" desc="Stress and Anxiety" onChange={handleAfflictions} />
        <AfflictionCheckbox
          name="ADHD"
          desc="Attention Deficit Hyperactivity Disorder"
          onChange={handleAfflictions}
        />
        <AfflictionCheckbox
          name="Bipolar"
          desc="Bipolar Disorder and Mood Swings"
          onChange={handleAfflictions}
        />
        <AfflictionCheckbox
          name="Depression"
          desc="Clinic and Chronic Depression"
          onChange={handleAfflictions}
        />
        <AfflictionCheckbox
          name="Eating Disorders"
          desc="Bulimia, Anorexia and Other Eating Disorders"
          onChange={handleAfflictions}
        />
      </View>
      <View style={tailwind('flex items-center ')}>
        <TouchableOpacity style={tailwind('mt-8 mb-20 w-1/3')} onPress={handleCreate}>
          <Text
            style={{
              ...tailwind('p-2 text-center mx-2 text-white font-bold rounded-lg'),
              backgroundColor: '#0e4da4',
            }}>
            Ready !
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSetup;
