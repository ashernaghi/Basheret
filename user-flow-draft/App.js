import React from 'react'
import { Drawer } from './src/navigation/Drawer.js'
import { createAppContainer } from 'react-navigation'

const AppContainer = createAppContainer(Drawer);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
