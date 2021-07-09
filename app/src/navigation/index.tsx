/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, AuthStackParamList } from '../utils/types';
import GroupBottomTabNavigator from './BottomTabs/GroupNavigator/GroupBottomTabNavigator';
import BottomTabNavigator from './BottomTabs/MainNavigator/BottomTabNavigator';
// import LinkingConfiguration from './LinkingConfiguration';
const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*/ Auth Navigator, render if is loggedIn, else not */}
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Group" component={GroupBottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="home" component={TabTwoScreen} />
      <AuthStack.Screen name="logIn" component={TabTwoScreen} />
      <AuthStack.Screen name="register" component={NotFoundScreen} />
      <AuthStack.Screen name="profileSetup" component={TabTwoScreen} />
    </AuthStack.Navigator>
  );
}
