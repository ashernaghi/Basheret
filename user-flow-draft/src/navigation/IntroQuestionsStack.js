import { createStackNavigator } from 'react-navigation';
import IntroQuestionsScreen from '../screens/IntroQuestionsScreen';
import { fromRight } from 'react-navigation-transitions';
import LoadingAppScreen from '../screens/LoadingAppScreen';

export default IntroQuestionsStack = createStackNavigator({
  Questions: { screen: IntroQuestionsScreen },
  FinisedQuestions: { screen: LoadingAppScreen }
},
{
  initialRouteName: 'Questions',
  transitionConfig: () => fromRight(1000),
},
)