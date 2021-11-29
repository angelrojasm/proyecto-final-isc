import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { GroupParamList } from '../../../types.navigation';
import GroupSearch from '../../../../screens/GroupSearch';
import GroupCreate from '../../../../screens/GroupCreate';
const GroupStack = createStackNavigator<GroupParamList>();

export default function GroupsNavigator() {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="GroupSearch"
        component={GroupSearch}
        options={{ headerTitle: 'Discover new groups!' }}
      />
      <GroupStack.Screen
        name="GroupCreate"
        component={GroupCreate}
        options={{ headerTitle: 'Create Group' }}
      />
    </GroupStack.Navigator>
  );
}
