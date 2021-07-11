import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FeedParamList } from '../../../types.navigation';
import GroupFeed from '../../../../screens/GroupFeed';
const DashboardStack = createStackNavigator<FeedParamList>();

export default function FeedNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Feed" component={GroupFeed} />
    </DashboardStack.Navigator>
  );
}
