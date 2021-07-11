import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { RoomParamList } from '../../../types.navigation';
import GroupRoom from '../../../../screens/GroupRoom';
const DashboardStack = createStackNavigator<RoomParamList>();

export default function RoomNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Room" component={GroupRoom} />
    </DashboardStack.Navigator>
  );
}
