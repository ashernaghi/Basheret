import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

export default HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen }
},
{
  initialRouteName: 'Home',
});