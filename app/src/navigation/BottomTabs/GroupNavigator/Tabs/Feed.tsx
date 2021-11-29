import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FeedParamList } from '../../../types.navigation';
import GroupFeed from '../../../../screens/GroupFeed';
import FeedReplies from '../../../../screens/FeedReplies';
import FeedPostCreate from '../../../../screens/FeedPostCreate';
import GroupInfoEdit from '../../../../screens/GroupInfoEdit';
const FeedStack = createStackNavigator<FeedParamList>();

export default function FeedNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={GroupFeed}
        options={{ headerStyle: { backgroundColor: '#0e4da4' }, headerTintColor: 'white' }}
      />
      <FeedStack.Screen
        name="Replies"
        component={FeedReplies}
        options={{ headerStyle: { backgroundColor: '#0e4da4' }, headerTintColor: 'white' }}
      />
      <FeedStack.Screen
        name="PostCreate"
        component={FeedPostCreate}
        options={{ headerStyle: { backgroundColor: '#0e4da4' }, headerTintColor: 'white' }}
      />
      <FeedStack.Screen
        name="GroupInfoEdit"
        component={GroupInfoEdit}
        options={{ headerStyle: { backgroundColor: '#0e4da4' }, headerTintColor: 'white' }}
      />
    </FeedStack.Navigator>
  );
}
