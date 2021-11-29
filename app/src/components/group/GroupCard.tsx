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
import { Entypo } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';

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
    match?: number;
  };
  refKey?: number;
};

const GroupCard = ({ group, refKey }: IGroupCardProps) => {
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
      key={refKey}
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
            style={{
              ...tailwind('bg-transparent rounded-md flex items-center my-3 px-10 py-2'),
              backgroundColor: '#0e4da4',
            }}
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
              style={{
                ...tailwind('bg-transparent rounded-md flex items-center my-3 px-8 py-2'),
                backgroundColor: '#0e4da4',
              }}
              onPress={visitGroup}>
              <Text style={tailwind('text-white font-bold')}>Visit</Text>
            </TouchableOpacity>
          ) : group.isPrivate ? (
            <TouchableOpacity
              style={{
                ...tailwind('bg-transparent rounded-md flex items-center my-3 px-6 py-2 flex-row'),
                backgroundColor: '#0e4da4',
              }}
              onPress={() => {
                setVisible(true);
              }}>
              <Text style={tailwind('text-white font-bold')}>Join</Text>
              <Entypo name="lock" size={20} style={tailwind('ml-2 text-white font-bold')} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                ...tailwind('bg-transparent rounded-md flex items-center my-3 px-8 py-2'),
                backgroundColor: '#0e4da4',
              }}
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
      {group.match && (
        <View style={tailwind('flex flex-row justify-end mr-2')}>
          <CircularProgress
            value={Math.floor(group.match * 100)}
            initialValue={0}
            radius={40}
            duration={1500}
            textColor={'darkgrey'}
            activeStrokeColor={Math.floor(group.match * 100) <= 70 ? 'yellow' : '#2ecc71'}
            inActiveStrokeColor={'#ccc'}
            maxValue={100}
            title={'Match'}
            titleColor={'darkgrey'}
            titleStyle={{ fontWeight: 'bold' }}
            titleFontSize={undefined}
            circleBackgroundColor={undefined}
            valueSuffix={'%'}
            activeStrokeWidth={8}
            inActiveStrokeWidth={8}
          />
        </View>
      )}
      <View style={tailwind('flex flex-row justify-end my-2')}>
        <AfflictionTags afflictions={group.tags} />
      </View>
    </View>
  );
};

export default GroupCard;
