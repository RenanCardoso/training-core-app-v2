import React, { Component } from 'react'

import RootStackContainer from './src/routes'
import { ThemeProvider } from 'styled-components'
import { globalStyles } from './src/styles'

import './src/config/ReactotronConfig'
import { setTopLevelNavigator } from './src/utils'

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
