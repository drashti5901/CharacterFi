import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import { queryClient } from './src/shared/queryClient';
import { RootNavigator } from './src/navigation/RootNavigator';
import { initDatabase } from './src/api/database';
import { loadFavourites } from './src/store/favouritesSlice';
import useNetworkStatus from './src/shared/hooks/useNetworkStatus';
import NoNetworkScreen from './src/shared/components/NoNetworkScreen';

function AppRoot() {
  const isConnected = useNetworkStatus();

  useEffect(() => {
    initDatabase()
      .then(() => store.dispatch(loadFavourites()))
      .catch((e) => console.warn('[DB] init failed', e));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RootNavigator />
        <NoNetworkScreen visible={isConnected === false} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}

export default App;
