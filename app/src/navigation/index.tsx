/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import ProfileSetup from '../screens/ProfileSetup';
import { RootStackParamList, AuthStackParamList } from './types.navigation';
import GroupBottomTabNavigator from './BottomTabs/GroupNavigator/GroupBottomTabNavigator';
import BottomTabNavigator from './BottomTabs/MainNavigator/BottomTabNavigator';
import { SessionContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinkingConfiguration from './LinkingConfiguration';
const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

export default function Navigation() {
  const userContext = React.useContext(SessionContext);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const getUid = async () => {
      let x: any = '';
      try {
        const uid = await AsyncStorage.getItem('uid');
        if (uid && !userContext?.currentUser) {
          x = await userContext?.logIn(uid);
        }
        setIsLoaded(true);
      } catch (err) {}
    };
    getUid();
  }, []);

  return isLoaded ? (
    <NavigationContainer>
      <RootNavigator isUser={!!userContext?.currentUser} />
    </NavigationContainer>
  ) : null;
}

const RootNavigator = ({ isUser }: any) => {
  return isUser ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*/ Auth Navigator, only render if not logged in*/}
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Group" component={GroupBottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*/ Auth Navigator, only render if not logged in*/}
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Group" component={GroupBottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
};

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="home" component={Home} />
      <AuthStack.Screen name="logIn" component={Login} />
      <AuthStack.Screen name="register" component={Register} />
      <AuthStack.Screen name="profileSetup" component={ProfileSetup} />
    </AuthStack.Navigator>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
