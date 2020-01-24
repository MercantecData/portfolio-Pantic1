import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import loginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/SignupScreen';
import SignupDetailsScreen from '../screens/SignupDetails';
import ImageuploadScreen from '../screens/ImageuploadScreen';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Login: loginScreen,
    Signup: SignupScreen,
    SignupDetails: SignupDetailsScreen,
    Imageupload:ImageuploadScreen,
    
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  })
);
