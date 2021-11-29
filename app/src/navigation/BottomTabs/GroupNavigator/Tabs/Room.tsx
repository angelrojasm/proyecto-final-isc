import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { RoomParamList } from '../../../types.navigation';
import GroupRoom from '../../../../screens/GroupRoom';
import UserList from '../../../../screens/UserList';
import MessageChat from '../../../../screens/MessageChat';
const RoomStack = createStackNavigator<RoomParamList>();

export default function RoomNavigator() {
  return (
    <RoomStack.Navigator>
      <RoomStack.Screen
        name="Room"
        component={GroupRoom}
        options={{ headerStyle: { backgroundColor: '#0e4da4' }, headerTintColor: 'white' }}
      />
      <RoomStack.Screen
        name="UserList"
        component={UserList}
        options={{ headerStyle: { backgroundColor: '#0e4da4' }, headerTintColor: 'white' }}
      />
      <RoomStack.Screen
        name="MessageChat"
        component={MessageChat}
        options={{ headerStyle: { backgroundColor: '#0e4da4' }, headerTintColor: 'white' }}
      />
    </RoomStack.Navigator>
  );
}
