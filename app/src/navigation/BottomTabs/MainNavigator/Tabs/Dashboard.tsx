import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { DashboardParamList } from '../../../types.navigation';
import Dashboard from '../../../../screens/Dashboard';
const DashboardStack = createStackNavigator<DashboardParamList>();

export default function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
  );
}
