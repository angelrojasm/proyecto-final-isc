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
        size={22}
        style={tailwind('border text-gray-500 border-gray-400 rounded-full mr-2 p-1.5')}
        onPress={async () => {
          await userContext?.joinGroup(groupId);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Group' }],
          });
        }}
      />
      <Text style={tailwind('text-base self-center')}>{groupName}</Text>
    </View>
  );
};

export default GroupEntry;
