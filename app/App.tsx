import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import useCachedResources from './src/hooks/useCachedResources';
import { Provider } from './src/context/index';
import Navigation from './src/navigation';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider>
          <Navigation />
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
