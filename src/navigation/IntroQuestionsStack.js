import { createStackNavigator } from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import IntroQuestionsScreen from '../screens/IntroQuestionsScreen';
import LoadingAppScreen from '../screens/LoadingAppScreen';
import ChooseProfilePictureScreen from '../screens/ChooseProfilePictureScreen';
import ChooseNameScreen from '../screens/ChooseNameScreen';
import ChooseEmailScreen from '../screens/ChooseEmailScreen';

export default IntroQuestionsStack = createStackNavigator({
  Questions: { screen: IntroQuestionsScreen },
  ChooseProfilePicture: { screen: ChooseProfilePictureScreen },
  ChooseName: { screen: ChooseNameScreen },
  ChooseEmail: {screen: ChooseEmailScreen },
  LoadingApp: { screen: LoadingAppScreen },
  },
  {
    initialRouteName: 'ChooseName',
    transitionConfig: () => fromRight(1000),
  },
)
