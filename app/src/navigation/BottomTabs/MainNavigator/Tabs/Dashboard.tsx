import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { DashboardParamList } from '../../../../utils/types';
import TabTwoScreen from '../../../../screens/TabTwoScreen';
const DashboardStack = createStackNavigator<DashboardParamList>();

export default function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={TabTwoScreen} />
    </DashboardStack.Navigator>
  );
}
