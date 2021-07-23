import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedNavigator from './Tabs/Feed';
import RoomNavigator from './Tabs/Room';

import { GroupBottomTabParamList } from '../../types.navigation';
const BottomTab = createBottomTabNavigator<GroupBottomTabParamList>();

export default function GroupBottomTabNavigator() {
  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Feed"
        backBehavior="history"
        tabBarOptions={{
          activeTintColor: 'rgba(255,255,255,1)',
          inactiveTintColor: 'rgba(255,255,255,0.6)',
          tabStyle: { backgroundColor: '#0E4DA4' },
        }}>
        <BottomTab.Screen
          name="Feed"
          component={FeedNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="dynamic-feed" style={{ marginTop: 3 }} size={25} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Room"
          component={RoomNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="meeting-room" style={{ marginTop: 3 }} size={25} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}
