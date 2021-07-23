import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect, useContext } from 'react';
import { Text, Button } from 'react-native';
import { GroupBottomTabParamList } from '../navigation/types.navigation';

import socketIOClient from 'socket.io-client';
import { SessionContext } from '../context';
import { useRef } from 'react';

const GroupRoom = ({ navigation }: StackScreenProps<GroupBottomTabParamList, 'Room'>) => {
  const [socket, setSocket] = useState(null || socketIOClient);
  const userContext = useContext(SessionContext);

  const setNavigationHeader = () => {
    navigation.setOptions({
      headerTitle: (props) => <></>,
    });
  };
  useEffect(() => {
    const socket = socketIOClient('https://epr.codes', { jsonp: false });
    socket.emit('test');
    socket.on('test-response', (response: string) => {
      console.log(response);
    });
    // socket.on("username-request", () => {
    //   socket.emit("username-response", location.state.username);
    // });
    // socket.on("user-list", (response: any) => {
    //   let objectArray = Object.entries(response);
    //   setUserList(objectArray);
    // });

    return () => {
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, [socket]);

  return <Text>GroupRoom</Text>;
};

export default GroupRoom;
