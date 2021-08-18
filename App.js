import React, { Component } from 'react'

import RootStackContainer from './src/routes'
import { ThemeProvider } from 'styled-components'
import { globalStyles } from './src/styles'

import './src/config/ReactotronConfig'
import { setTopLevelNavigator } from './src/utils'

import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
// import Home from './src/pages/Home';
// import Settings from './pages/Settings';
// import Notifications from './pages/Notifications';
// import Profile from './pages/Profile';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={globalStyles}>
        <RootStackContainer  
          ref={navigatorRef => {
            setTopLevelNavigator(navigatorRef)
          }}
        />
      </ThemeProvider>
    );
  }
}
