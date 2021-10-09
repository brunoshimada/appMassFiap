/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import TabNavigatorComponent from './src/navigation/tab/TabNavigatorComponent.js';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigatorComponent />
    </NavigationContainer>
  );
};

export default App;
