import React from 'react';
import * as firebase from 'firebase';
import { View, Text, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import {firebaseConfig} from './config';
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
    initialRouteName: 'LoadingApp',
    transitionConfig: () => fromRight(1000),
  }
));

export default class App extends React.Component {
  state = {
      fontLoaded: false,
    };

  async componentDidMount() {
    await Font.loadAsync({
      'fitamint-script': require('./assets/fonts/FitamintScript.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {

if (this.state.fontLoaded) {
  firebase.initializeApp(firebaseConfig);

  const store = createStore(reducers, applyMiddleware(thunk));
    return (

      <Provider store={store}>
        <AppContainer />
      </Provider>

    );
  } return (
      <View>
        <ActivityIndicator />
      </View>)
  }
}
