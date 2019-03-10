import { createStackNavigator } from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import IntroQuestionsScreen from '../screens/IntroQuestionsScreen';
import LoadingAppScreen from '../screens/LoadingAppScreen';
import ChooseProfilePictureScreen from '../screens/ChooseProfilePictureScreen';

export default IntroQuestionsStack = createStackNavigator({
  Questions: { screen: IntroQuestionsScreen },
  ChooseProfilePicture: { screen: ChooseProfilePictureScreen },
  LoadingApp: { screen: LoadingAppScreen }
  },
  {
    initialRouteName: 'ChooseProfilePicture',
    transitionConfig: () => fromRight(1000),
  },
)