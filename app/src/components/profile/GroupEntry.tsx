import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SessionContext } from '../../context';
import api from '../../api';
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
const GroupEntry = ({ groupName, groupId }: { groupName: string; groupId: number }) => {
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();
  return (
    <View style={tailwind('flex flex-row my-2')}>
      <MaterialIcons
        name="group"
        style={tailwind('border border-gray-400 rounded-full')}
        onPress={() => {
          userContext?.joinGroup(groupId);
          navigation.navigate('Group');
        }}
      />
      <Text style={tailwind('text-base')}>{groupName}</Text>
    </View>
  );
};

export default GroupEntry;
