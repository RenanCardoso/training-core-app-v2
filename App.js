import React, { Component } from 'react'

import RootStackContainer from './src/routes'
import { ThemeProvider } from 'styled-components'
import { globalStyles } from './src/styles'

import './src/config/ReactotronConfig'
import { setTopLevelNavigator } from './src/utils'

import { Images, products, materialTheme } from './src/constants/';
import { NavigationContainer } from '@react-navigation/native';
import Screens from './src/navigation/Screens';

import { Block, GalioProvider } from 'galio-framework';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <GalioProvider theme={materialTheme}>
          <RootStackContainer
            ref={navigatorRef => {
              setTopLevelNavigator(navigatorRef)
            }}
          />
        </GalioProvider>
      </NavigationContainer>

      // <NavigationContainer>
      //   <GalioProvider theme={materialTheme}>
      //     <Block flex>
      //       {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      //       <Screens />
      //     </Block>
      //   </GalioProvider>
      // </NavigationContainer>
    );
  }
}
