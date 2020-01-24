import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import loginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/SignupScreen';
import ImageuploadScreen from '../screens/ImageuploadScreen';
import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.Imageupload
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: loginScreen,
  Signup: SignupScreen,
  SignupDetails: SignupDetailsScreen,
  Imageupload: ImageuploadScreen,

  Main: MainTabNavigator,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
