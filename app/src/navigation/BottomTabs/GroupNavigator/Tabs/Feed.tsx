import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FeedParamList } from '../../../types.navigation';
import GroupFeed from '../../../../screens/GroupFeed';
import FeedReplies from '../../../../screens/FeedReplies';
import FeedPostCreate from '../../../../screens/FeedPostCreate';
const DashboardStack = createStackNavigator<FeedParamList>();

export default function FeedNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Feed" component={GroupFeed} />
      <DashboardStack.Screen name="Replies" component={FeedReplies} />
      <DashboardStack.Screen name="PostCreate" component={FeedPostCreate} />
    </DashboardStack.Navigator>
  );
}
