import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { GroupParamList } from '../navigation/types.navigation';
import { Button } from '../components';
import { Text } from 'react-native';

const Groups = ({ navigation }: StackScreenProps<GroupParamList, 'Groups'>) => {
  return (
    <>
      <Text>Groups</Text>
      <Button
        title="TO GROUP SEARCH"
        onPress={() => navigation.navigate('GroupSearch')}
        style={{ marginBottom: 5, backgroundColor: 'black' }}
      />
      <Button title="TO GROUP FEED" onPress={() => navigation.navigate('Group')} />
    </>
  );
};

export default Groups;
