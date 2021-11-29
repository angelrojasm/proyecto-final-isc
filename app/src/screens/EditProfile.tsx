import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import api from '../api';
import tailwind from 'tailwind-rn';
import { AfflictionCheckbox } from '../components';

const EditProfile = ({ route }: { route: any }) => {
  const { info } = route.params;
  const [userInfo, setUserInfo] = useState<any>(info);
  const navigation = useNavigation();

  const handleAfflictions = (name: string) => {
    name = name.toLowerCase();
    let aff = [...userInfo.afflictions];
    if (aff.includes(name)) {
      aff = aff.filter((elem: string) => elem !== name);
    } else {
      aff.push(name);
    }
    setUserInfo({
      ...userInfo,
      afflictions: aff,
    });
  };

  const changeUserInfo = (name: string, value: any) => {
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    let afflictionArr = [];
    for (const [key, value] of Object.entries(userInfo.afflictions)) {
      if (value) afflictionArr.push(key.toLowerCase());
    }

    if (afflictionArr.length > 0) {
      let infoToEdit = Object.assign({}, userInfo);
      delete infoToEdit.groups;
      try {
        await api.users().updateUser(userInfo.id, infoToEdit);
        navigation.goBack();
      } catch (err) {}
    }
  };
  return (
    <ScrollView contentContainerStyle={tailwind('')}>
      <View style={tailwind('ml-8')}>
        <Text style={tailwind('text-base font-bold mt-8')}>Name:</Text>
        <TextInput
          value={userInfo.username}
          onChangeText={(value) => {
            changeUserInfo('username', value);
          }}
          style={{
            ...tailwind('my-4 border bg-white border-black w-5/6 pl-2 pt-2 text-base rounded-md'),
            textAlignVertical: 'top',
          }}
        />
        <Text style={tailwind('text-base')}>What region are you in?</Text>
        <View style={tailwind('my-2 border rounded-md border-gray-100 bg-gray-200 w-11/12')}>
          <Picker
            style={tailwind('p-8')}
            selectedValue={userInfo.country}
            onValueChange={(value) => changeUserInfo('country', value)}>
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
          isChecked={userInfo.afflictions.includes('autism')}
        />
        <AfflictionCheckbox
          name="Anxiety"
          desc="Stress and Anxiety"
          onChange={handleAfflictions}
          isChecked={userInfo.afflictions.includes('anxiety')}
        />
        <AfflictionCheckbox
          name="ADHD"
          desc="Attention Deficit Hyperactivity Disorder"
          onChange={handleAfflictions}
          isChecked={userInfo.afflictions.includes('adhd')}
        />
        <AfflictionCheckbox
          name="Bipolar"
          desc="Bipolar Disorder and Mood Swings"
          onChange={handleAfflictions}
          isChecked={userInfo.afflictions.includes('bipolar')}
        />
        <AfflictionCheckbox
          name="Depression"
          desc="Clinic and Chronic Depression"
          onChange={handleAfflictions}
          isChecked={userInfo.afflictions.includes('depression')}
        />
        <AfflictionCheckbox
          name="Eating Disorders"
          desc="Bulimia, Anorexia and Other Eating Disorders"
          onChange={handleAfflictions}
          isChecked={userInfo.afflictions.includes('eating disorders')}
        />
      </View>
      <View style={tailwind('flex items-center ')}>
        <TouchableOpacity style={tailwind('mt-8 mb-20 w-1/3')} onPress={handleUpdate}>
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

export default EditProfile;
