import React from 'react';
import * as firebase from 'firebase';
import { Image, View, Text, ActivityIndicator } from 'react-native';
import { Font, Asset, AppLoading } from 'expo';
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
import { Root } from "native-base";

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

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/splash.png'),
    ]);

    const fontAssets = cacheFonts([
      {'fitamint-script': require('./assets/fonts/FitamintScript.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),}
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    firebase.initializeApp(firebaseConfig);

    const store = createStore(reducers, applyMiddleware(thunk));

      return (
        <Provider store={store}>
          <Root>
            <AppContainer />
          </Root>
        </Provider>
    );
  }
}
