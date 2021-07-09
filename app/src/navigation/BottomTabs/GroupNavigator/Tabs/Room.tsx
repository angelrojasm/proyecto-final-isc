import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { RoomParamList } from '../../../../utils/types';
import NotFoundScreen from '../../../../screens/NotFoundScreen';
const DashboardStack = createStackNavigator<RoomParamList>();

export default function RoomNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Room" component={NotFoundScreen} />
    </DashboardStack.Navigator>
  );
}
