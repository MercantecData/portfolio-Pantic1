import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/ProfileScreen';
import SwipeScreen from '../screens/LikeScreen';
import ChatScreen from '../screens/ChatScreen';
import { NavigationEvents } from 'react-navigation';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person${focused ? '' : ''}`
          : 'md-person'
      }
      
    />
  ),
  tabBarOptions: {
    showLabel: false
  }
};

HomeStack.path = '';

const SwipeStack = createStackNavigator(
  {
    Links: SwipeScreen,
  },
  config
);

SwipeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-flame' : 'md-flame'} />
  ),
  tabBarOptions: {
    showLabel: false
  }
};

SwipeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: ChatScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'} />
  ),
  tabBarOptions: {
    showLabel: false
  }
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SwipeStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
