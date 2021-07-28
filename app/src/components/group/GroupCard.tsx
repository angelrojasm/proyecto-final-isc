import React from 'react';
import tailwind from 'tailwind-rn';
import { Text, View, TouchableOpacity } from 'react-native';

type IGroupCardProps = {
  group: {
    name: string;
    description: string;
    totalUsers: number;
  };
};

const GroupCard = ({ group }: IGroupCardProps) => {
  return (
    <View
      style={{
        ...tailwind('bg-white rounded flex w-11/12 my-4'),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <Text style={tailwind('text-lg font-bold text-black my-1 ml-2')}>{group.name}</Text>
      <Text style={tailwind('text-sm font-light text-gray-400 ml-4')}>{group.description}</Text>
      <Text style={tailwind('text-xs text-black font-bold ml-6')}>
        {group.totalUsers}
        {group.totalUsers === 1 ? ' Member' : ' Members'}
      </Text>
      <View style={{ ...tailwind('flex items-center'), width: '100%' }}>
        <TouchableOpacity
          style={tailwind(
            'bg-transparent border border-blue-500 rounded-md flex items-center w-1/3 my-3 px-4 py-2'
          )}>
          <Text style={tailwind('text-blue-400')}>Join Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupCard;
