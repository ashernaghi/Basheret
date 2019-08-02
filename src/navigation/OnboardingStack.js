import { createStackNavigator } from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import OnboardingScreen from '../screens/OnboardingScreen';
import LandingScreen from '../screens/LandingScreen';
import InitialLoadingScreen from '../screens/InitialLoadingScreen';


export default OnboardingStack = createStackNavigator({
  Landing: { screen: LandingScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  InitialLoading: { screen: InitialLoadingScreen }
  },
  {
    initialRouteName: 'Landing',
    transitionConfig: () => fromRight(1000),
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)
