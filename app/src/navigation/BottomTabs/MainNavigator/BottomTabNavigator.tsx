/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardNavigator from './Tabs/Dashboard';
import GroupsNavigator from './Tabs/Groups';
import ProfileNavigator from './Tabs/Profile';

import useColorScheme from '../../../hooks/useColorScheme';

import { MainBottomTabParamList } from '../../../utils/types';

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Dashboard"
        backBehavior="history"
        tabBarOptions={{
          activeTintColor: 'rgba(255,255,255,1)',
          inactiveTintColor: 'rgba(255,255,255,0.6)',
          tabStyle: { backgroundColor: '#0E4DA4' },
        }}>
        <BottomTab.Screen
          name="Dashboard"
          component={DashboardNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                size={25}
                style={{ marginTop: 3 }}
                color={color}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Groups"
          component={GroupsNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="groups" style={{ marginTop: 3 }} size={30} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" style={{ marginTop: 3 }} size={20} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}
