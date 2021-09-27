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
      <RoomStack.Screen name="Room" component={GroupRoom} />
      <RoomStack.Screen name="UserList" component={UserList} />
      <RoomStack.Screen name="MessageChat" component={MessageChat} />
    </RoomStack.Navigator>
  );
}
