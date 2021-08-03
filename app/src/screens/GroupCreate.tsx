import { Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { SessionContext } from '../context';

const GroupCreate = () => {
  const [group, setGroup] = useState({
    name: '',
    description: '',
    tags: [],
  });
  const userContext = useContext(SessionContext);
  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
};
