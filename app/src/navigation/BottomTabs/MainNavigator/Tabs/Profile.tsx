import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ProfileParamList } from '../../../../utils/types';
import Profile from '../../../../screens/Profile';
const ProfileStack = createStackNavigator<ProfileParamList>();

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'My Profile' }}
      />
    </ProfileStack.Navigator>
  );
}
