import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
import likeScreen from '../screens/LikeScreen';
import ChatScreen from '../screens/ChatScreen';
import { NavigationEvents } from 'react-navigation';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    Home: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
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

ProfileStack.path = '';

const LikeStack = createStackNavigator(
  {
    Links: likeScreen,
  },
  config
);

LikeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-flame' : 'md-flame'} />
  ),
  tabBarOptions: {
    showLabel: false
  }
};

LikeStack.path = '';

const ChatStack = createStackNavigator(
  {
    Chat: ChatScreen,
  },
  config
);

ChatStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'} />
  ),
  tabBarOptions: {
    showLabel: false
  }
};

ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
  ProfileStack,
  LikeStack,
  ChatStack,
});

tabNavigator.path = '';

export default tabNavigator;
