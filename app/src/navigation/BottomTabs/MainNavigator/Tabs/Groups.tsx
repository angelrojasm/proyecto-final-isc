import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { GroupParamList } from '../../../types.navigation';
import Groups from '../../../../screens/Groups';
import GroupSearch from '../../../../screens/GroupSearch';
const GroupStack = createStackNavigator<GroupParamList>();

export default function GroupsNavigator() {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen name="Groups" component={Groups} />
      <GroupStack.Screen
        name="GroupSearch"
        component={GroupSearch}
        options={{ headerTitle: 'Group Search' }}
      />
    </GroupStack.Navigator>
  );
}
