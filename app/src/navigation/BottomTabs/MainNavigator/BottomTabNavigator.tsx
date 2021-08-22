/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardNavigator from './Tabs/Dashboard';
import GroupsNavigator from './Tabs/Groups';
import ProfileNavigator from './Tabs/Profile';

import { MainBottomTabParamList } from '../../types.navigation';

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

export default function BottomTabNavigator() {
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
              <FontAwesome5 name="user-alt" style={{ marginTop: 5 }} size={18} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}
