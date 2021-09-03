import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Welcome from './pages/Welcome'
import Home from './pages/Home'
import FichaDeTreino from './pages/FichaDeTreino'
import AuthLoadingScreen from './pages/AuthLoadingScreen'

const StackNavigator = createStackNavigator(
  {
    Home,
    FichaDeTreino,
    AuthLoading: AuthLoadingScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const StackNavigatorContainer = createAppContainer(StackNavigator);

const AuthStack = createStackNavigator(
  {
    SignIn: Welcome,
    App: StackNavigatorContainer,
    // SignUp: RegisterUser
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    header: null,
  },
);

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: StackNavigatorContainer,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const RootStackContainer = createAppContainer(RootStack);

export default RootStackContainer;
