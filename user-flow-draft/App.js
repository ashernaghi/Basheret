import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainStack from './src/navigation/MainStack.js';
import IntroQuestionsStack from './src/navigation/IntroQuestionsStack';
import LoadingAppScreen from './src/screens/LoadingAppScreen'
import { fromRight } from 'react-navigation-transitions';

// const AppContainer = createAppContainer(Drawer);
// const AppContainer = createAppContainer(MainStack);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    LoadingApp: LoadingAppScreen,
    App: MainStack,
    IntroQuestions: IntroQuestionsStack,
  },
  {
    initialRouteName: 'LoadingApp',
    transitionConfig: () => fromRight(1000),
  }
));

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
