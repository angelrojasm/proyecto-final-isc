import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ProfileParamList } from '../../../types.navigation';
import Profile from '../../../../screens/Profile';
import EditProfile from '../../../../screens/EditProfile';
const ProfileStack = createStackNavigator<ProfileParamList>();

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'My Profile',
          headerStyle: { backgroundColor: '#0e4da4' },
          headerTintColor: 'white',
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerStyle: { backgroundColor: '#0e4da4' },
          headerTintColor: 'white',
        }}
      />
    </ProfileStack.Navigator>
  );
}
