import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/router/StackNavigator';

LogBox.ignoreAllLogs();

const App = () => {
    return(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
};

export default App;
