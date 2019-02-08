import React from 'react'
import { Drawer } from './src/navigation/Drawer.js'
import { createAppContainer } from 'react-navigation'
import MainStack from './src/navigation/MainStack.js';

// const AppContainer = createAppContainer(Drawer);
const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
