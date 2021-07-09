import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ProfileParamList } from '../../../../utils/types';
import TabOneScreen from '../../../../screens/TabOneScreen';
const ProfileStack = createStackNavigator<ProfileParamList>();

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={TabOneScreen}
        options={{ headerTitle: 'My Profile' }}
      />
    </ProfileStack.Navigator>
  );
}
