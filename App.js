import React, { Component } from 'react'
import RootStackContainer from './src/routes'
import './src/config/ReactotronConfig'
import { setTopLevelNavigator } from './src/utils'
import { Images, products, materialTheme } from './src/constants/';
import { NavigationContainer } from '@react-navigation/native';
import { Block, GalioProvider } from 'galio-framework';

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
    );
  }
}
