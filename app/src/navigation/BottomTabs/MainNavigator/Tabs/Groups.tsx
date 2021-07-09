import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { GroupParamList } from '../../../../utils/types';
import TabOneScreen from '../../../../screens/TabOneScreen';
const GroupStack = createStackNavigator<GroupParamList>();

export default function GroupsNavigator() {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="Groups"
        component={TabOneScreen}
        options={{ headerTitle: 'Groups' }}
      />
    </GroupStack.Navigator>
  );
}
