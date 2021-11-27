import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import api from '../api';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { SessionContext } from '../context';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function GroupInfoEdit() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [passcode, setPasscode] = useState<string>('');
  const userContext = useContext(SessionContext);
  const [isGroupOwner, setIsGroupOwner] = useState<boolean>(false);

  const getPasscode = () => {
    let availableCharacters = '0123456789';
    let passcode = '';
    for (let i = 0; i < 7; i++) {
      let digit = Math.floor(Math.random() * availableCharacters.length);
      passcode += availableCharacters[digit];
    }
    setPasscode(passcode);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={tailwind('text-base w-4/5 text-center')}>Group Info</Text>,
    });
  }, []);

  useEffect(() => {
    if (userContext) {
      let group = userContext?.currentGroup;
      setName(group?.name);
      setDescription(group?.description);
      setType(group?.isPrivate ? 'private' : 'public');
      if (group?.isPrivate) {
        setPasscode(group?.passcode);
      } else {
        getPasscode();
      }
      if (userContext?.currentGroup?.users[0] == userContext?.currentUser?.id) {
        setIsGroupOwner(true);
      }
    }
  }, [userContext]);

  return (
    <ScrollView contentContainerStyle={isEditing ? null : { height: '100%' }}>
      <TouchableOpacity
        style={tailwind('absolute right-0 p-6')}
        onPress={() => {
          setIsEditing(!isEditing);
        }}>
        <Feather name="edit" size={22.5} color="#FAD02C" />
      </TouchableOpacity>

      {isEditing ? (
        <View style={tailwind('mt-10 flex items-center')}>
          <Text style={tailwind('text-base font-bold')}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              ...tailwind('my-4 border bg-white border-black w-5/6 pl-2 pt-2 text-base rounded-md'),
              textAlignVertical: 'top',
            }}
          />
        </View>
      ) : (
        <Text style={tailwind('text-lg font-bold mt-6 ml-6')}>
          {userContext?.currentGroup?.name}
        </Text>
      )}
      {isEditing ? (
        <View style={tailwind('flex items-center')}>
          <Text style={tailwind('text-base font-bold')}>Description:</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={5}
            style={{
              ...tailwind('border bg-white border-black w-5/6 pl-2 pt-2 text-base rounded-md'),
              textAlignVertical: 'top',
            }}
          />
        </View>
      ) : (
        <Text style={tailwind('text-lg mt-6 ml-6')}>{userContext?.currentGroup.description}</Text>
      )}
      {isEditing ? (
        <View style={tailwind('flex items-center mt-4')}>
          <Text style={tailwind('text-base font-bold')}>Availability:</Text>
          <View style={tailwind('border rounded-md border-gray-400 bg-white')}>
            <Picker style={tailwind('py-4 w-64')} selectedValue={type} onValueChange={setType}>
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
      ) : (
        isGroupOwner &&
        type === 'private' && (
          <View style={tailwind('flex items-center')}>
            <Text style={tailwind('text-base mt-8 mb-3 text-center')}>
              This is your group's unique passcode:
            </Text>
            <Text selectable style={tailwind('rounded-lg bg-white p-6 font-bold text-2xl')}>
              {passcode}
            </Text>
          </View>
        )
      )}
      {isEditing && (
        <TouchableOpacity
          style={tailwind(
            'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-4 px-8 py-2 self-center'
          )}
          onPress={async () => {
            await api
              .groups()
              .updateGroup(userContext?.currentGroup?.id, { name, description, type, passcode });
            navigation.reset({
              index: 0,
              routes: [{ name: 'Group' }],
            });
          }}>
          <Text style={tailwind('text-white font-bold')}>Update</Text>
        </TouchableOpacity>
      )}
      {!isGroupOwner && (
        <TouchableOpacity
          style={
            isEditing
              ? tailwind(
                  'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center px-8 py-2 w-3/4 self-center mt-4 mb-2'
                )
              : tailwind(
                  'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center px-8 py-2 w-3/4 self-center absolute bottom-6'
                )
          }
          onPress={() => {
            Alert.alert('Leave Group', 'Are you sure you want to leave this group?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  await api
                    .groups()
                    .removeUser(userContext?.currentUser?.id, userContext?.currentGroup);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Root' }],
                  });
                },
              },
            ]);
          }}>
          <Text style={tailwind('text-white font-bold')}>Leave Group</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
