import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Welcome from './pages/Welcome'
import Home from './pages/Home'
import FichaDeTreino from './pages/FichaDeTreino'
import AuthLoading from './pages/AuthLoadingScreen'
import RealizarExercicios from './pages/RealizarExercicios'

const StackNavigator = createStackNavigator(
  {
    Home,
    FichaDeTreino,
    AuthLoading,
    RealizarExercicios,
    SignIn: Welcome,
  },
  {
    initialRouteName: 'Home',
    headerTransparent: true,
    headerMode: 'none',
    defaultNavigationOptions: {
      headerTitle: '',
      headerTintColor: '#000000',
      headerTitleStyle: {
        // fontWeight: 'bold',
      },
    },
  },
);

const StackNavigatorContainer = createAppContainer(StackNavigator);

const AuthStack = createStackNavigator(
  {
    SignIn: Welcome,
    App: StackNavigatorContainer,
    RealizarExercicios: RealizarExercicios,
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
    AuthLoading,
    Auth: AuthStack,
    App: StackNavigatorContainer,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const RootStackContainer = createAppContainer(RootStack);

export default RootStackContainer;
