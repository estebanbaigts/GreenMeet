import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MainPageTwo from './MainPageTwo';
import MainPage from './MainPageTwo';
import Settings from './Settings';

const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupPage} />
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainPage} />
        <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
