import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MainPage from './MainPage';
import CreateEvent from './Profile/CreateEvent'
import Profile from './Profile/Profile'
import Settings from './Profile/Settings'

const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupPage} />
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
