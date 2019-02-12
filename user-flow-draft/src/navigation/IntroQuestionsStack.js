import { createStackNavigator } from 'react-navigation';
import IntroQuestionsScreen from '../screens/IntroQuestionsScreen';
import { fromRight } from 'react-navigation-transitions';
import LoadingAppScreen from '../screens/LoadingAppScreen';
import SetupProfileScreen from '../screens/SetupProfileScreen';

export default IntroQuestionsStack = createStackNavigator({
  Questions: { screen: IntroQuestionsScreen },
  SetupProfile: { screen: SetupProfileScreen },
  FinishedQuestions: { screen: LoadingAppScreen }
},
{
  initialRouteName: 'Questions',
  transitionConfig: () => fromRight(1000),
},
)