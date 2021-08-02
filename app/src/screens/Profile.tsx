import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { logOut } from '../firebase/Auth';
import api from '../api';
import { SessionContext } from '../context';
import { RootStackParamList } from '../navigation/types.navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { GroupEntry } from '../components';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
const Profile = ({ navigation }: StackScreenProps<RootStackParamList, 'Root'>) => {
  const userContext = useContext(SessionContext);

  const handleLogout = async () => {
    userContext?.logOut();
    await logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };
  return (
    <View style={tailwind('')}>
      {/* Header Section */}
      <View style={tailwind('flex flex-row justify-between')}>
        <View style={tailwind('flex flex-row')}>
          {/* logo img*/}
          <FontAwesome5 name="user-alt" style={tailwind('')} />
          <View style={tailwind('flex items-center')}>
            {/* User Info*/}
            <Text style={tailwind('font-bold text-base')}>
              {userContext?.currentUser?.username}
            </Text>
            <Text style={tailwind('text-sm font-bold')}>{userContext?.currentUser?.country}</Text>
          </View>
        </View>
      </View>
      {/* Group Section */}
      <View style={tailwind('')}>
        <Text style={tailwind('font-bold text-lg')}>Your Groups</Text>
        {userContext?.currentUser?.groups?.map((group: any, idx: number) => {
          <GroupEntry key={idx} groupName={group.name} groupId={group.id} />;
        })}
      </View>
      {/*Log out Button */}
      <TouchableOpacity
        style={tailwind(
          'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-3 px-8 py-2'
        )}
        onPress={() => {
          handleLogout();
        }}>
        <Text style={tailwind('text-white font-bold')}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
