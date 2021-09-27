import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FeedParamList } from '../../../types.navigation';
import GroupFeed from '../../../../screens/GroupFeed';
import FeedReplies from '../../../../screens/FeedReplies';
import FeedPostCreate from '../../../../screens/FeedPostCreate';
import UserList from '../../../../screens/UserList';
const FeedStack = createStackNavigator<FeedParamList>();

export default function FeedNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={GroupFeed} />
      <FeedStack.Screen name="Replies" component={FeedReplies} />
      <FeedStack.Screen name="PostCreate" component={FeedPostCreate} />
    </FeedStack.Navigator>
  );
}
