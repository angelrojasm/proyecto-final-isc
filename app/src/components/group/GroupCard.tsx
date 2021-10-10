import React, { useContext, useState } from 'react';
import Modal from 'react-native-modal';
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AfflictionTags from './AfflictionTags';
import { SessionContext } from '../../context';
import api from '../../api';
import Toast from 'react-native-toast-message';
import CountryFlag from '../profile/CountryFlag';

type IGroupCardProps = {
  group: {
    id: number;
    name: string;
    description: string;
    totalUsers: number;
    tags: string[];
    isPrivate?: boolean;
    passcode?: string;
    region?: string;
  };
};

const GroupCard = ({ group }: IGroupCardProps) => {
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  const hideModal = () => setVisible(false);

  const visitGroup = async () => {
    await userContext?.joinGroup(group.id);
    navigation.navigate('Group');
  };

  const joinWithPassword = async () => {
    if (password === group.passcode) {
      joinGroup();
    } else {
      setPassword('');
      hideModal();
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'Group Passcode is Incorrect.',
          autoHide: true,
        });
      }, 200);
    }
  };

  const joinGroup = async () => {
    let success = await api.groups().addUser(userContext?.currentUser?.id, group);
    if (success) {
      await userContext?.joinGroup(group.id);
      navigation.navigate('Group');
    }
  };

  const findInGroup = (): boolean => {
    for (let userGroup of userContext?.currentUser?.groups) {
      if (userGroup.id === group.id) {
        return true;
      }
    }
    return false;
  };

  return (
    <View
      style={{
        ...tailwind('bg-white rounded flex w-11/12 my-2'),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <Modal
        isVisible={visible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <View style={tailwind('rounded-lg bg-white border border-gray-400 flex items-center')}>
          <Text style={tailwind('text-base my-4 text-center')}>
            Please Input the Group Passcode:
          </Text>
          <TextInput
            value={password}
            placeholder="Passcode"
            style={tailwind('border-b pl-2 py-2 w-4/5 mb-4')}
            onChangeText={setPassword}></TextInput>
          <TouchableOpacity
            style={tailwind(
              'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-3 px-10 py-2'
            )}
            onPress={joinWithPassword}>
            <Text style={tailwind('text-white font-bold')}>Join</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={tailwind('flex flex-row justify-between')}>
        <View style={tailwind('w-2/3')}>
          <View style={tailwind('flex flex-row')}>
            <Text style={tailwind('text-lg font-bold text-black my-1 ml-2')}>{group.name}</Text>
            <CountryFlag
              style={tailwind('ml-1 self-center w-5 h-4 mt-0.5')}
              region={group.region}
            />
          </View>
          <Text style={tailwind('text-xs text-black font-bold ml-2')}>
            {group.totalUsers}
            {group.totalUsers === 1 ? ' Member' : ' Members'}
          </Text>
        </View>
        <View style={tailwind('flex items-center mr-4')}>
          {findInGroup() ? (
            <TouchableOpacity
              style={tailwind(
                'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-3 px-8 py-2'
              )}
              onPress={visitGroup}>
              <Text style={tailwind('text-white font-bold')}>Visit</Text>
            </TouchableOpacity>
          ) : group.isPrivate ? (
            <TouchableOpacity
              style={tailwind(
                'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-3 px-8 py-2'
              )}
              onPress={() => {
                setVisible(true);
              }}>
              <Text style={tailwind('text-white font-bold')}>Join with Password</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={tailwind(
                'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-3 px-8 py-2'
              )}
              onPress={joinGroup}>
              <Text style={tailwind('text-white font-bold')}>Join</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={tailwind('flex items-center mb-4')}>
        <Text style={tailwind('w-11/12 text-base flex items-center font-light text-gray-500')}>
          {group.description}
        </Text>
      </View>
      <View style={tailwind('flex flex-row justify-end my-2')}>
        <AfflictionTags afflictions={group.tags} />
      </View>
    </View>
  );
};

export default GroupCard;
