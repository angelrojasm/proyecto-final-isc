import React, { useContext } from 'react';
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
          .create(userContext?.currentUser?.id, name, description, afflictionArr);
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
      <Text style={tailwind('text-blue-700 text-xl text-center font-bold mb-8')}>
        Create a Group:
      </Text>
      <View style={tailwind('flex items-center')}>
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
        <Text style={tailwind('text-base')}>Give a short Description of the group?</Text>
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
        <Text style={tailwind('text-base mt-8 mb-3')}>
          Which of these topics will your group be discussing?
        </Text>
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
        {createError && <Text style={tailwind('text-red-500')}>Group Name Already Exists</Text>}
        <TouchableOpacity style={tailwind('my-12 w-1/3')} onPress={handleCreate}>
          <Text
            style={tailwind(
              'p-2 bg-blue-600 border border-blue-400 text-center mx-2 text-white font-bold rounded-lg'
            )}>
            Ready !
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GroupCreate;
