import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FeedParamList } from '../../../../utils/types';
import TabOneScreen from '../../../../screens/TabTwoScreen';
const DashboardStack = createStackNavigator<FeedParamList>();

export default function FeedNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Feed" component={TabOneScreen} />
    </DashboardStack.Navigator>
  );
}
