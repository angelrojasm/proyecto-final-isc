import React, { useContext, useEffect } from 'react';
import { Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import api from '../api';
import { SessionContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'tailwind-rn';
import { AfflictionCheckbox } from '../components';
import { GroupParamList, RootStackParamList } from '../navigation/types.navigation';
import { StackScreenProps } from '@react-navigation/stack';

const GroupCreate = () => {
  const [name, setName] = useState('');
  const [createError, setCreateError] = useState<boolean>(false);
  const [description, setDescription] = useState('');
  const [passcode, setPassCode] = useState('');
  const [type, setType] = useState('public');
  const [afflictions, setAfflictions] = useState<any>({});
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();
  const handleAfflictions = (name: string) => {
    setAfflictions({
      ...afflictions,
      [name]: !afflictions[name],
    });
  };

  useEffect(() => {
    getPasscode();
  }, []);

  const getPasscode = () => {
    let availableCharacters = '0123456789';
    let passCode = '';
    for (let i = 0; i < 7; i++) {
      let digit = Math.floor(Math.random() * availableCharacters.length);
      passCode += availableCharacters[digit];
    }
    setPassCode(passCode);
    return passCode;
  };
  const handleCreate = async () => {
    const duplicates = await api.groups().getByName(name);
    if (duplicates.length > 0) {
      setCreateError(true);
    } else {
      let afflictionArr = [];
      for (const [key, value] of Object.entries(afflictions)) {
        if (value) afflictionArr.push(key.toLowerCase());
      }

      if (afflictionArr.length > 0) {
        let { id } = await api
          .groups()
          .create(
            userContext?.currentUser?.id,
            name,
            description,
            afflictionArr,
            type === 'private',
            passcode
          );
        await userContext?.joinGroup(id);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Group' }],
        });
      }
    }
  };
  return (
    <ScrollView>
      <View style={tailwind('flex items-center mt-4')}>
        <Text style={tailwind('text-base')}>What is your group's name?</Text>
        <TextInput
          placeholder="Input your group name!"
          value={name}
          onChangeText={setName}
          style={{
            ...tailwind('my-4 border bg-white border-black w-5/6 pl-2 pt-2 text-base rounded-md'),
            textAlignVertical: 'top',
          }}
        />
        <Text style={tailwind('text-base')}>Give a short Description of the group</Text>
        <TextInput
          placeholder="Input your group description!"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={5}
          style={{
            ...tailwind(
              'my-4 border bg-white border-black w-5/6 pl-2 h-24 pt-2 text-base rounded-md'
            ),
            textAlignVertical: 'top',
          }}
        />
        <Text style={tailwind('text-base mt-8 mb-3 text-center')}>
          Which of these topics will your group be discussing?
        </Text>
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
      <View style={tailwind('flex items-center')}>
        {/* Private/Public Section */}
        <Text style={tailwind('text-base mt-8 mb-3 text-center')}>
          Please choose the availability of your group!
        </Text>
        <View style={tailwind('border rounded-md border-gray-400 bg-white')}>
          <Picker
            style={tailwind('py-4 w-64')}
            selectedValue={type}
            onValueChange={(value) => setType(value)}>
            <Picker.Item label="Public" value="public" />
            <Picker.Item label="Private" value="private" />
          </Picker>
        </View>
        {type === 'private' && (
          <View style={tailwind('flex items-center')}>
            <Text style={tailwind('text-base mt-8 mb-3 text-center')}>
              This is your group's unique passcode:
            </Text>
            <Text selectable style={tailwind('rounded-lg bg-white p-6 font-bold text-2xl')}>
              {passcode}
            </Text>
          </View>
        )}
      </View>
      <View style={tailwind('flex items-center ')}>
        {createError && <Text style={tailwind('text-red-500')}>Group Name Already Exists</Text>}
        <TouchableOpacity style={tailwind('my-12 w-1/3')} onPress={handleCreate}>
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

export default GroupCreate;
