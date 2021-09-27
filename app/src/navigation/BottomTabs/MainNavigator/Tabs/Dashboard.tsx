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
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen
        name="RecommendedList"
        component={RecommendedList}
        options={{ title: 'Recommended Groups' }}
      />
      <DashboardStack.Screen
        name="PrivateMessaging"
        component={PrivateMessaging}
        options={{ headerTitle: 'Messages' }}
      />
      <DashboardStack.Screen name="MessageChat" component={MessageChat} />
    </DashboardStack.Navigator>
  );
}
