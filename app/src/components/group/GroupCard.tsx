import React from 'react';
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AfflictionTags from './AfflictionTags';
type IGroupCardProps = {
  group: {
    name: string;
    description: string;
    totalUsers: number;
    tags: string[];
  };
};

const GroupCard = ({ group }: IGroupCardProps) => {
  const navigation = useNavigation();
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
      <View style={tailwind('flex flex-row justify-between')}>
        <View style={tailwind('w-2/3')}>
          <Text style={tailwind('text-lg font-bold text-black my-1 ml-2')}>{group.name}</Text>
          <Text style={tailwind('text-xs text-black font-bold ml-6')}>
            {group.totalUsers}
            {group.totalUsers === 1 ? ' Member' : ' Members'}
          </Text>
        </View>
        <View style={tailwind('flex items-center mr-4')}>
          <TouchableOpacity
            style={tailwind(
              'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-3 px-8 py-2'
            )}
            onPress={() => {
              navigation.navigate('Group');
            }}>
            <Text style={tailwind('text-white font-bold')}>Join</Text>
          </TouchableOpacity>
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
