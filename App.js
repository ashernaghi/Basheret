import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { fromRight } from 'react-navigation-transitions';
import thunk from 'redux-thunk';
import MainStack from './src/navigation/MainStack.js';
import IntroQuestionsStack from './src/navigation/IntroQuestionsStack';
import LoadingAppScreen from './src/screens/LoadingAppScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import reducers from './src/reducers';

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    LoadingApp: LoadingAppScreen,
    Onboarding: OnboardingScreen,
    App: MainStack,
    IntroQuestions: IntroQuestionsStack,
  },
  {
    initialRouteName: 'App',
    transitionConfig: () => fromRight(1000),
  }
));

export default class App extends React.Component {
  render() {
    const store = createStore(reducers, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}