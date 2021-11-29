import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { DashboardParamList } from '../../../types.navigation';
import Dashboard from '../../../../screens/Dashboard';
import RecommendedList from '../../../../screens/RecommendedList';
import PrivateMessaging from '../../../../screens/PrivateMessaging';
import MessageChat from '../../../../screens/MessageChat';
const DashboardStack = createStackNavigator<DashboardParamList>();

export default function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerStyle: { backgroundColor: '#0e4da4' } }}
      />
      <DashboardStack.Screen
        name="RecommendedList"
        component={RecommendedList}
        options={{
          title: 'Recommended Groups',
          headerStyle: { backgroundColor: '#0e4da4' },
          headerTintColor: 'white',
        }}
      />
      <DashboardStack.Screen
        name="PrivateMessaging"
        component={PrivateMessaging}
        options={{
          headerTitle: 'Messages',
          headerStyle: { backgroundColor: '#0e4da4' },
          headerTintColor: 'white',
        }}
      />
      <DashboardStack.Screen name="MessageChat" component={MessageChat} />
    </DashboardStack.Navigator>
  );
}
